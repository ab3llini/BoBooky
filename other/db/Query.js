module.exports.book_view = (offset, limit) => {
    return {
        text: 'SELECT * from book_view offset $1 limit $2',
        values: [offset, limit]
    }
};

module.exports.book_genres = (book_id) => {
    return {
        text: 'select g.name as genres from book join book_to_genre btg on book.id = btg.book_id join genre g on btg.genre_id = g.id where book.id = $1',
        values: [book_id]
    }
}
module.exports.author = (offset, limit) => {
    return {
        text: 'select id, name, image as image_url, description from author limit $2 offset $1',
        values: [offset, limit]
    }
};

module.exports.authorId = (id) => {
    return {
        text: 'select id, name, image as image_url, description from author where id = $1',
        values: [id]
    }
};


module.exports.authorIdReview = (id) => {
    return {
        text: 'select u.name, author, timestamp, title, content as body, rating, book_author as author_id' +
            'from author_review join "user" u on author_review.author = u.id' +
            'where book_author = $1',
        values: [id]
    }
};


