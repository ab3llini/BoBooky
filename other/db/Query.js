module.exports.bookView = (offset, limit) => {
    return {
        text: 'SELECT bw.*, a.id as a_id, a.name as a_name, a.description as a_desc, i.href as a_img from book_view bw join author a on bw.author = a.id join image i on a.image = i.id offset $1 limit $2',
        values: [offset, limit]
    }
};

module.exports.bookGenres = (book_id) => {
    return {
        text: 'select g.name from book join book_to_genre btg on book.id = btg.book_id join genre g on btg.genre_id = g.id where book.id = $1',
        values: [book_id],
    }
};

module.exports.bookID = (id) => {
    return {
        text: 'SELECT bw.*, a.id as a_id, a.name as a_name, a.description as a_desc, i.href as a_img from book_view bw join author a on bw.author = a.id join image i on a.image = i.id where bw.id = $1',
        values: [id]
    }
};

module.exports.bookReviews = (bookID) => {
    return {
        text: 'select br.id, br.timestamp, br.title, br.content as body, br.rating, u.id author_id, u.name as author_name, u.surname as author_surname from book_review br join "user" u on br.author = u.id where br.book = $1',
        values: [bookID]
    }
};

module.exports.bookSearch = (query, isbn, genre, year, author, publisher, offset = 0, limit = 20) => {
    let q = `select distinct bw.*, a.id as a_id, a.name as a_name, a.description as a_desc, i.href as a_img
             from book_view bw
                      join author a on bw.author = a.id
                      join image i on a.image = i.id
                      join book_to_genre btg on bw.id = btg.book_id
                      join genre g on btg.genre_id = g.id` + ' ';

    let clause = 'where';
    let placeholder = 1;
    let values = [];

    if (query !== undefined) {
        q += clause + ' ((bw.title LIKE \'%\' || $'+placeholder+' || \'%\') ' +
            'or (a.name LIKE \'%\' || $'+placeholder+' || \'%\') or (bw.publisher LIKE \'%\' || $'+placeholder+' || \'%\') ' +
            'or (bw.isbn LIKE \'%\' || $'+placeholder+' || \'%\') or (bw.isbn13  LIKE \'%\' || $'+placeholder+' || \'%\') ' +
            'or (g.name  LIKE \'%\' || $'+placeholder+' || \'%\'))' + ' ';
        clause = 'and';
        placeholder += 1;
        values.push(query)
    }
    if (isbn !== undefined) {
        q += clause + ' (bw.isbn = $'+placeholder+' or bw.isbn13 = $'+placeholder+')' + ' ';
        clause = 'and';
        placeholder += 1;
        values.push(isbn)
    }
    if (genre !== undefined) {
        q += clause + ' (g.name = $'+placeholder+')' + ' ';
        clause = 'and';
        placeholder += 1;
        values.push(genre)
    }
    if (year !== undefined) {
        q += clause + ' (bw.publication_year = cast($'+placeholder+' as int))' + ' ';
        clause = 'and';
        placeholder += 1;
        values.push(year)
    }
    if (author !== undefined) {
        q += clause + ' (a.name = $'+placeholder+')' + ' ';
        clause = 'and';
        placeholder += 1;
        values.push(author)
    }
    if (publisher !== undefined) {
        q += clause + ' (bw.publisher = $'+placeholder+')' + ' ';
        placeholder += 1;
        values.push(publisher)
    }
    q += 'offset $'+placeholder+' limit $'+(placeholder+1);
    values.push(offset, limit);
    console.log(q)
    return {
        text: q,
        values: values
    }
};

module.exports.relatedBooks = (bookID, offset, limit) => {
    return {
        text: 'SELECT bw.*, a.id as a_id, a.name as a_name, a.description as a_desc, i.href as a_img from book_view bw join author a on bw.author = a.id join image i on a.image = i.id where a.id = (select author from book where id = $1) offset $2 limit $3',
        values: [bookID, offset, limit]
    }
};

module.exports.author = (offset, limit) => {
    return {
        text: "select a.id, name, i.href as image_url, description from author a join image i on a.image = i.id limit $2 offset $1",
        values: [offset, limit]
    }
};

module.exports.authorId = (id) => {
    return {
        text: 'select a.id, name, i.href as image_url, description from author a join image i on a.image = i.id where a.id = $1',
        values: [id]
    }
};


module.exports.authorReviews = (authorID) => {
    return {
        text: `select u.name, author, timestamp, title, content as body, rating, book_author as author_id
               from author_review
                        join "user" u on author_review.author = u.id
               where book_author = $1`,
        values: [authorID]
    }
};


module.exports.event = () => {
    return {
        text: `select e.id, name, description, location as address, timestamp
               from event e
                        join event_to_image eti on e.id = eti.event_id
                        join image i on eti.image_id = i.id`
    }
};

module.exports.eventAddress = (id) => {
    return {
        text: `select a.*
               from address a
                        join event e on a.id = e.location
               where e.id = $1`,
        values: [id]
    }
};