const {Client} = require('pg');
let make = require('./Query.js');
const sha256 = require('sha256');

function mapEvent(e) {
    return {
        id: e.id,
        name: e.name,
        description: e.description,
        timestamp: e.timestamp,
        related_author: e.related_author,
        relater_book: e.related_book,
        image_urls: [e.href, e.href_small],
        location: {
            id: e.address_id,
            name: e.address_name,
            address_line_1: e.address_line_1,
            address_line_2: e.address_line_2,
            cap: e.cap,
            city: e.city,
            country: e.country
        }
    }
}

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
                console.log(error);
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
                            if (i === books.rowCount - 1) {
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
                if (book.rowCount === 0) {
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
                if (reviews.rowCount === 0) {
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
                            if (i === related.rowCount - 1) {
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

module.exports.bookSearchGET = (query,isbn,genre,year,author,author_id,publisher,publisher_id,theme) => {
    return new Promise((resolve, reject) => {
        pipe.query(make.bookSearch(query,isbn,genre,year,author,author_id,publisher,publisher_id,theme))
            .then(result => {
                let ans = [];
                result.rows.forEach((book, i) => {
                    pipe.query(make.bookGenres(book.id))
                        .then(genres => {
                            book.genres = genres.rows;
                            ans.push(book);
                            if (i === result.rowCount - 1)
                                resolve(ans)
                        })
                        .catch(error => {
                            console.log(error);
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

module.exports.bookGenreGET = () => {
    return new Promise((resolve, reject) => {
        pipe.query(make.genres())
            .then(genres => {
                resolve(genres.rows)
            })
            .catch(error => {
                console.log(error);
                reject()
            })
    })
};

module.exports.bookReviewPOST = (id,userID,body) => {
    return new Promise((resolve, reject) => {
        pipe.query(make.addBookReview(userID, id, body))
            .then(() => resolve())
            .catch(error => {
                console.log(error);
                reject()
            })
    })
};

module.exports.bookReviewDELETE = (id,reviewID,userID) => {
    //TODO: need also the user
    return new Promise((resolve, reject) => {
        pipe.query(make.deleteReview(id,reviewID,userID))
            .then(() => resolve())
            .catch(error => {
                console.log(error);
                reject()
            })
    })
};

/***************************
 ******** AUTHORS **********
 ***************************/

module.exports.authorGET = (offset, limit) => {
    return new Promise((resolve, reject) => {
        pipe.query(make.author(offset, limit))
            .then(authors => resolve(authors.rows))
            .catch(error => {
                console.log(error);
                reject()
            })
    })
};

module.exports.authorIdGET = (id) => {
    return new Promise((resolve, reject) => {
        pipe.query(make.author(id))
            .then(authors => {
                if(authors.rowCount === 0)
                    resolve(authors.rows[0]);
                else
                    reject()
            })
            .catch(error => {
                console.log(error);
                reject()
            })
    })
};

module.exports.authorIdReviewGET = (id) => {
    return new Promise((resolve, reject) => {
        pipe.query(make.authorReviews(id))
            .then(results => {
                let ans = [];
                results.rows.forEach((res, idx) => {
                    let review = {
                        id: res.id,
                        timestamp: res.timestamp,
                        title: res.title,
                        body: res.body,
                        rating: res.rating
                    };
                    review.Author = {
                        name: res.name,
                        surname: res.surname,
                        email: res.email,
                        birthdate: res.birthdate
                    };
                    ans.push(res);
                    if (idx === results.rowCount - 1)
                        resolve(ans)
                })
            })
            .catch(error => {
                console.log(error);
                reject(error)
            })
    })
};

module.exports.authorIdReviewPOST = (id,userID,body) => {
    return new Promise((resolve, reject) => {
        pipe.query(make.addAuthorReview(id, userID, body))
            .then(() => resolve())
            .catch(error => {
                console.log(error);
                reject()
            })
    })
};

module.exports.authorIdReviewDELETE = (id,reviewID,userID) => {
    return new Promise((resolve, reject) => {
        pipe.query(make.deleteAuthorReview(id,reviewID,userID))
            .then(() => resolve())
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
            .then(() => resolve())
            .catch(error => {
                console.log(error);
                reject()
            })
    })
};

module.exports.userLoginPOST = (body) => {
    return new Promise((resolve, reject) => {
        pipe.query(make.getUserSalt(body.username))
            .then(result => {
                if (result.rowCount === 0) {
                    reject()
                } else {
                    pipe.query(make.loginUser(body.username, sha256(body.password + result.rows[0].salt16)))
                        .then(res => res.rowCount > 0 ? resolve(res.rows[0]) : reject('Wrong password'))
                        .catch(error => {
                            console.log(error);
                            reject()
                        })
                }
            })
            .catch(error => {
                console.log(error);
                reject()
            })
    })
};

module.exports.userOrderGET = (id, offset, limit) => {
    return new Promise((resolve, reject) => {
        pipe.query(make.getUserOrder(id, offset, limit))
            .then((results) => {
                if (results.rowCount === 0)
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
                                    if (j === books.rowCount - 1)
                                        if (i === results.rowCount - 1)
                                            resolve(results.rows)
                                })
                            })
                            .catch(error => {
                                console.log(error);
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

module.exports.userAddressPOST = (userID, address) => {
    return new Promise((resolve, reject) => {
        pipe.query(make.addAddressForUser(address))
            .then((id) => {
                pipe.query(make.bindUserAddress(userID, id.rows[0].id))
                    .then(() => resolve())
                    .catch(error => {
                        console.log(error);
                        reject()
                    })
            })
            .catch(error => {
                console.log(error);
                reject()
            })
    })
};

module.exports.userAddressDELETE = (userID, address) => {
    return new Promise((resolve, reject) => {
        pipe.query(make.deleteAddress(userID, address))
            .then(deleted => {
                if (deleted.rowCount !== 0)
                    resolve();
                else
                    reject()
            })
            .catch(error => {
                console.log(error);
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
                console.log(error);
                reject()
            })
    })
};

module.exports.userAddressPUT = (userID, address) => {
    return new Promise((resolve, reject) => {
        pipe.query(make.updateAddressForUser(userID, address))
            .then(() => resolve())
            .catch(error => {
                console.log(error);
                reject()
            })
    })
};

module.exports.userChartPUT = (userID, book_info) => {
    return new Promise((resolve, reject) => {
        pipe.query(make.getBooksForUserChart(userID, book_info.bookID))
            .then(books => {
                if (books.rowCount === 0)
                   pipe.query(make.addBookToUserChart(userID, book_info))
                       .then(() => resolve())
                       .catch(error => {
                           console.log(error);
                           reject()
                       });
                else
                    pipe.query(make.updateUserChart(userID, book_info))
                        .then(() => resolve())
                        .catch(error => {
                            console.log(error);
                            reject()
                        })
            })
            .catch(error => {
                console.log(error);
                reject()
            })
    })
};

module.exports.userChartDELETE = (userID) => {
    return new Promise((resolve, reject) => {
        pipe.query(make.deleteChart(userID))
            .then(() => resolve())
            .catch(error => {
                console.log(error);
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
                console.log(error);
                reject()
            })
    })
};

module.exports.userWhishlistPOST = (userID, bookID) => {
    return new Promise((resolve, reject) => {
        pipe.query(make.addBookToUserWishList(userID, bookID))
            .then(() => resolve())
            .catch(error => {
                console.log(error);
                reject()
            })
    })
};

module.exports.userWhishlistGET = (userID) => {
    return new Promise((resolve, reject) => {
        pipe.query(make.getWishList(userID))
            .then(wl => resolve(wl.rows))
            .catch(error => {
                console.log(error);
                reject()
            })
    })
};

module.exports.userWhishlistDELETE = (userID, bookID) => {
    return new Promise((resolve, reject) => {
        pipe.query(make.deleteBookFromUserWishList(userID, bookID))
            .then(() => resolve())
            .catch(error => {
                console.log(error);
                reject()
            })
    })
};


/***************************
 ******** EVENTS ***********
 ***************************/

module.exports.eventGET = () => {
    return new Promise((resolve, reject) => {
        let ans = [];
        pipe.query(make.event())
            .then(events => {
                events.rows.forEach((e, idx) => {
                    ans.push(mapEvent(e));
                    if(idx === events.rowCount - 1)
                        resolve(ans);
                })
            })
            .catch(error => {
                console.log(error);
                reject()
            })
    })
};

module.exports.eventIdGET = (id) => {
    return new Promise((resolve, reject) =>  {
        pipe.query(make.event())
            .then(event => {
                if(event.rowCount > 0)
                    resolve(mapEvent(event.rows[0]));
                else
                    reject()
            })
            .catch(error => {
                console.log(error);
                reject()
            })
    })
};

module.exports.eventSearchGET = (query_string,name,author_name,author_id,book_name,book_id,date,date_from,date_to,location) => {
    return new Promise((resolve, reject) =>  {
        pipe.query(make.eventSearch(query_string,name,author_name,author_id,book_name,book_id,date,date_from,date_to,location))
            .then(events => {
                if(events.rowCount > 0) {
                    let ans = [];
                    events.rows.forEach((event, idx) => {
                        ans.push(mapEvent(event));
                        if(idx === events.rowCount - 1)
                            resolve(ans)
                    })
                } else
                    resolve()
            })
            .catch(error => {
                console.log(error);
                reject()
            })
    })
};