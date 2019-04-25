const {Client} = require('pg');
let query = require('./Query.js');

const client = new Client({
    user: 'kaxtczmqrauqfc',
    host: 'ec2-79-125-2-142.eu-west-1.compute.amazonaws.com',
    database: 'd3k4sooera9fsh',
    password: 'a46181c55c68f90d53b029a88daa5800f4b13f203287f0df528a993ef18e5b14',
    port: 5432,
    ssl: true
});

client.connect();

let process_book = (book) => {
    return new Promise(resolve => {
        client.query(query.authorId(book.author))
            .then(author => {
                book.author = author.rows[0]
                client.query(query.bookGenres(book.id))
                    .then(genres => {
                        book.genres = genres.rows.map( object => object.name );
                        resolve(book)
                    })
            })
    })
}

module.exports.bookGET = (offset, limit) => {
    return new Promise((resolve, reject) => {
        client.query(query.bookView(offset, limit))
            .then(books => {
                books.rows.forEach((book, i) => {
                    process_book(book)
                        .then(processed => {
                            book = processed;
                            if (i === books.rows.length - 1) {
                                resolve(books.rows)
                            }
                        })
                })
            })
    })
};


