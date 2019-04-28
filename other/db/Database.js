const {Client} = require('pg');
let make = require('./Query.js');

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
            .catch((error) => {
                reject()
            })
    });
};

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

module.exports.bookSearchGET = (query,isbn,genre,year,author,publisher) => {
    return new Promise((resolve, reject) => {
        let q = make.bookSearch(query,isbn,genre,year,author,publisher);
        if (q === undefined)
            reject();
        else {
            pipe.query(q)
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
                    reject()
                })
        }
    })
}


