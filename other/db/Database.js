const {Client} = require('pg');
let make = require('./Query.js');
const sha256 = require('sha256');

const pipe = new Client({
    user: 'kaxtczmqrauqfc',
    host: 'ec2-79-125-2-142.eu-west-1.compute.amazonaws.com',
    database: 'd3k4sooera9fsh',
    password: 'a46181c55c68f90d53b029a88daa5800f4b13f203287f0df528a993ef18e5b14',
    port: 5432,
    ssl: true
});

pipe.connect();

module.exports.execute = (func, args) => {
    return new Promise((resolve, reject) => {
        func.apply(null, args)
            .then(result => {
                resolve(result)
            })
            .catch(error => {
                console.error(error);
                reject()
            })
    });
};

/***************************
 ******** BOOKS ************
 ***************************/

let process_book = (book) => {
    return new Promise((resolve, reject) => {
        pipe.query(make.bookGenres(book.id))
            .then(genres => {
                book.genres = genres.rows.map(object => object.name);
                book.author = {
                    id: book.a_id,
                    name: book.a_name,
                    description: book.a_desc,
                    image_url: book.a_img
                };
                delete book.a_id;
                delete book.a_name;
                delete book.a_desc;
                delete book.a_img;

                resolve(book)
            })
            .catch(error => {
                reject()
            })
    })
};

module.exports.bookGET = (offset, limit) => {
    return new Promise((resolve, reject) => {
        pipe.query(make.bookView(offset, limit))
            .then(books => {
                books.rows.forEach((book, i) => {
                    process_book(book)
                        .then(processed => {
                            book = processed;
                            if (i === books.rows.length - 1) {
                                resolve(books.rows)
                            }
                        })
                        .catch(error => {
                            reject()
                        })
                })
            })
            .catch(error => {
                reject()
            })
    })
};

module.exports.bookIdGET = (id) => {
    return new Promise((resolve, reject) => {
        pipe.query(make.bookID(id))
            .then(book => {
                if (book.rows.length === 0) {
                    reject();
                } else {
                    process_book(book.rows[0])
                        .then(processed => {
                            resolve(processed)
                        })
                        .catch(error => {
                            reject()
                        })
                }
            })
            .catch(error => {
                reject()
            })
    })
};

module.exports.bookReviewGET = (id) => {
    return new Promise((resolve, reject) => {
        pipe.query(make.bookReviews(id))
            .then(reviews => {
                if (reviews.rows.length === 0) {
                    reject()
                } else {
                    reviews.rows.forEach((review) => {
                        review.author = {
                            id: review.author_id,
                            name: review.author_name,
                            surname: review.author_surname
                        };
                        delete review.author_id;
                        delete review.author_name;
                        delete review.author_surname;
                    });
                    resolve(reviews.rows)
                }
            })
    })
};

module.exports.bookRelatedGET = (bookID, offset = 0, limit = 20) => {
    return new Promise((resolve, reject) => {
        pipe.query(make.relatedBooks(bookID, offset, limit))
            .then(related => {
                related.rows.forEach((book, i) => {
                    process_book(book)
                        .then(processed => {
                            book = processed;
                            if (i === related.rows.length - 1) {
                                resolve(related.rows)
                            }
                        })
                        .catch(error => {
                            reject()
                        })
                })
            })
            .catch(error => {
                reject()
            })
    })
};

module.exports.bookSearchGET = (query, isbn, genre, year, author, publisher) => {
    return new Promise((resolve, reject) => {

        pipe.query(make.bookSearch(query, isbn, genre, year, author, publisher))
            .then(result => {
                result.rows.forEach((book, i) => {
                    process_book(book)
                        .then(processed => {
                            book = processed;
                            if (i === result.rows.length - 1) {
                                resolve(result.rows)
                            }
                        })
                        .catch(error => {
                            reject()
                        })
                })
            })
            .catch(error => {
                console.log(error);
                reject()
            })

    })
};

/***************************
 ********* USER ************
 ***************************/

module.exports.userRegisterPOST = (body) => {
    return new Promise((resolve, reject) => {
        pipe.query(make.registerUser(body))
            .then(() => {
                resolve()
            })
            .catch(error => {
                console.error(error);
                reject()
            })
    })
};

module.exports.userLoginPOST = (body) => {
    return new Promise((resolve, reject) => {
        pipe.query(make.getUserSalt(body.username))
            .then(result => {
                if (result.rows.length === 0) {
                    reject()
                } else {
                    pipe.query(make.loginUser(body.username, sha256(body.password + result.rows[0].salt)))
                        .then(res => resolve(res))
                        .catch(error => {
                            console.error(error);
                            reject()
                        })
                }
            })
            .catch(error => {
                console.error(error);
                reject()
            })
    })
};

module.exports.userOrderGET = (id, offset, limit) => {
    return new Promise((resolve, reject) => {
        pipe.query(make.getUserOrder(id, offset, limit))
            .then((results) => {
                if (results.rows.length === 0)
                    resolve([]);
                else
                    results.rows.forEach((order, i) => {
                        order.User = {
                            id: order.user_id,
                            name: order.name,
                            surname: order.surname,
                            email: order.email,
                            birthdate: order.birthdate,
                        };
                        delete order.user_id;
                        delete order.name;
                        delete order.surname;
                        delete order.email;
                        delete order.birthdate;

                        pipe.query(make.getBooksForOrder(id))
                            .then(books => {
                                order.Books = [];
                                books.rows.forEach((book, j) => {
                                    order.Books.push({
                                        qty: book.qty,
                                        book: {
                                            id: book.book_id,
                                            title: book.title,
                                            author: book.name,
                                            description: book.description,
                                            publisher: book.publisher,
                                            price: book.price,
                                            isbn: book.isbn,
                                            isbn13: book.isbn13,
                                            publication_year: book.publication_year,
                                            image_href: book.image_href
                                        }
                                    });
                                    if (j === books.rows.length - 1)
                                        if (i === results.rows.length - 1)
                                            resolve(results.rows)
                                })
                            })
                            .catch(error => {
                                console.error(error);
                                reject()
                            })
                    })
            })
            .catch(error => {
                console.error(error);
                reject()
            })
    })
};

module.exports.userAddressPOST = (userID, address) => {
    return new Promise((resolve, reject) => {
        pipe.query(make.addAddressForUser(address))
            .then((id) => {
                pipe.query(make.bindUserAddress(userID, id.rows[0].id))
                    .then(() => resolve())
                    .catch(error => {
                        console.error(error);
                        reject()
                    })
            })
            .catch(error => {
                console.error(error);
                reject()
            })
    })
};

module.exports.userAddressDELETE = (userID, address) => {
    return new Promise((resolve, reject) => {
        pipe.query(make.deleteAddress(userID, address))
            .then(deleted => {
                if (deleted.rows.length !== 0)
                    resolve();
                else
                    reject()
            })
            .catch(error => {
                console.error(error);
                reject()
            })
    })
};

module.exports.userAddressGET = (userID) => {
    return new Promise((resolve, reject) => {
        pipe.query(make.getUserAddress(userID))
            .then(response => {
                resolve(response.rows)
            })
            .catch(error => {
                console.error(error);
                reject()
            })
    })
};

module.exports.userAddressPUT = (userID, address) => {
    return new Promise((resolve, reject) => {
        pipe.query(make.updateAddressForUser(userID, address))
            .then(() => resolve())
            .catch(error => {
                console.error(error);
                reject()
            })
    })
};

module.exports.userChartPUT = (userID, book_info) => {
    return new Promise((resolve, reject) => {
        pipe.query(make.getBooksForUserChart(userID, book_info.bookID))
            .then(books => {
                if (books.rows.length === 0)
                   pipe.query(make.addBookToUserChart(userID, book_info))
                       .then(() => resolve())
                       .catch(error => {
                           console.error(error);
                           reject()
                       });
                else
                    pipe.query(make.updateUserChart(userID, book_info))
                        .then(() => resolve())
                        .catch(error => {
                            console.error(error);
                            reject()
                        })
            })
            .catch(error => {
                console.error(error);
                reject()
            })
    })
};

module.exports.userChartDELETE = (userID) => {
    return new Promise((resolve, reject) => {
        pipe.query(make.deleteChart(userID))
            .then(() => resolve())
            .catch(error => {
                console.error(error);
                reject()
            })
    })
};

module.exports.userChartGET = (userID) => {
    return new Promise((resolve, reject) => {
        pipe.query(make.getChart(userID))
            .then(chart => {
                let ans = { Books: [] };
                chart.rows.forEach(ch => {
                    ans.Books.push({
                        qty: ch.qty,
                        book: {
                            id: ch.id,
                            title: ch.title,
                            author: ch.author,
                            description: ch.description,
                            publisher: ch.publisher,
                            price: ch.price,
                            isbn: ch.isbn,
                            publication_year: ch.publication_year,
                            image_href: ch.image_href
                        }
                    })
                });
                ans.User = {
                    id: chart.rows[0].user_id,
                    name: chart.rows[0].user_name,
                    surname: chart.rows[0].surname,
                    email: chart.rows[0].email,
                    birthdate: chart.rows[0].birthdate
                };
                ans.total_amount = ans.Books.map(b => b.book.price)
                    .reduce((acc, curr) => acc + curr, 0.0);
                resolve(ans)
            })
            .catch(error => {
                console.error(error);
                reject()
            })
    })
};