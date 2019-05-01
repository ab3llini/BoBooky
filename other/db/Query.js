const sha256 = require('sha256');


function getRandomString(length) {
    let result = '';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}



/***************************
 ******** BOOKS ************
 ***************************/
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
    console.log(q);
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

/***************************
 ******** AUTHORS **********
 ***************************/

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

/***************************
 ******** EVENTS ***********
 ***************************/

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


/***************************
 ********* USER ************
 ***************************/

module.exports.registerUser = (user) => {
    const salt_ = getRandomString(4);
    const sha256_ = sha256(user.password + salt_);
    return {
        text: `insert into "user"(name, surname, email, birthdate, sha256, salt16)
            values ($1, $2, $3, $4, $5, $6)`,
        values: [user.name, user.surname, user.email, user.birthdate, sha256_, salt_]
    }
};

module.exports.loginUser = (email, pswSHA256) => {
    return {
        text: `select * from "user" where email = $1 and sha256 = $2`,
        values: [email, pswSHA256]
    }
};

module.exports.getUserSalt = (email) => {
    return {
        text: `select salt16 from "user" where email = $1`,
        values: [email]
    }
};

module.exports.getUserOrder = (id, offset, limit) => {
    return {
        text: `select distinct o.id as OrderID, u.id as user_id, u.name, u.surname, u.email, u.birthdate, o.total_amount as amount, o.timestamp
            from "order" o join "user" u on o.user_id = u.id join order_to_book otb on o.id = otb.order_id
            where u.id = $1
            offset $2 limit $3`,
        values: [id, offset, limit]
    }
};

module.exports.getBooksForOrder = (id) => {
    return {
        text: `select b.id as book_id, b.title, a.name, b.description, p.name as publisher, b.price, b.isbn, b.isbn13, b.publication_year,
                i.href as image_href, otb.qty
            from "order" o join order_to_book otb on o.id = otb.order_id join book b on otb.book_id = b.id
                join author a on b.author = a.id join image i on b.image_id = i.id join publisher p on b.publisher = p.id
            where o.id = $1`,
        values: [id]
    }
};

module.exports.addAddressForUser = (address) => {
    return {
        text: `insert into address(address_line_1, address_line_2, cap, city, country, name)
            values ($1, $2, $3, $4, $5, $6)
            returning id`,
        values: [address.address_line_1, address.address_line_2, address.cap, address.city, address.country, address.name]
    }
};

module.exports.updateAddressForUser = (userID, address) => {
    return {
        text: `update address a
            set name = $1,
                address_line_1 = $2,
                address_line_2 = $3,
                cap = $4,
                city = $5,
                country = $6
            from user_to_address uta
            where a.id = $7 and uta.user_id = $8 and uta.address_id = $7`,
        values: [address.name, address.address_line_1, address.address_line_2, address.cap, address.city,
            address.country, address.id, userID]
    }
};



module.exports.bindUserAddress = (userID, addressID) => {
    return {
        text: `insert into user_to_address(user_id, address_id)
            values ($1, $2)`,
        values: [userID, addressID]
    }
};

module.exports.deleteAddress = (userID, addressID) => {
    return {
        text: `delete from address a
            using user_to_address uta
            where uta.user_id = $2 and uta.address_id = $1 and a.id = $1
            returning a.id`,
        values: [addressID, userID]
    }
};

module.exports.getUserAddress = (userID) => {
    return {
        text: `select a.id, a.name, a.address_line_1, a.address_line_2, a.cap, a.city, a.country
            from address a join user_to_address uta on a.id = uta.address_id
            where uta.user_id = $1`,
        values: [userID]
    }
};

module.exports.addBookToUserChart = (userID, book_info) => {
    return {
        text: `insert into chart_to_book(user_id, book_id, qty)
            values($1, $2, $3)`,
        values: [userID, book_info.bookID, book_info.qty]
    }
};

module.exports.updateUserChart = (userID, book_info) => {
    if (book_info.qty === 0)
        return {
            text: `delete
                   from chart_to_book
                   where book_id = $1
                     and user_id = $2`,
            values: [book_info.bookID, userID]
        };
    return {
        text: `update chart_to_book
               set qty = $1
               where book_id = $2
                 and user_id = $3`,
        values: [book_info.qty, book_info.bookID, userID]
    };
};

module.exports.getBooksForUserChart = (userID, bookID) => {
    return {
        text: `select *
            from chart_to_book
            where user_id = $1 and book_id = $2`,
        values: [userID, bookID]
    };
};

module.exports.deleteChart = (userID) => {
    return {
        text: `delete
            from chart_to_book
            where user_id = $1`,
        values: [userID]
    };
};

module.exports.getChart = (userID) => {
    return {
        text: `select b.id, b.title, a.name as author, b.description, p.name as publisher,
                b.price, b.isbn, b.publication_year, i.href as image_href, ctb.qty,
                u.id as user_id, u.name as user_name, u.surname, u.email, u.birthdate
            from chart_to_book ctb
                join book b on ctb.book_id = b.id
                join author a on b.author = a.id
                join publisher p on b.publisher = p.id
                join image i on b.image_id = i.id
                join "user" u on ctb.user_id = u.id
            where user_id = $1`,
        values: [userID]
    };
};