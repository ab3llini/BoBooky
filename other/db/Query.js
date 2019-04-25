module.exports.bookGET = (offset, limit) => {
    return {
        text: 'SELECT * FROM book LIMIT $2 OFFSET $1',
        values: [offset, limit]
    }
};


