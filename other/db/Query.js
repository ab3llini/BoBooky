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