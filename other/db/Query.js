const sha256 = require('sha256');


function getRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


/***************************
 ******** BOOKS ************
 ***************************/
module.exports.bookView = (offset, limit) => {
    return {
        text: `SELECT bw.*, a.id as a_id, a.name as a_name, a.description as a_desc, i.href as a_img, b.avg_rating
            from book_view bw join author a on bw.author = a.id join image i on a.image = i.id
            join book b on b.id = bw.id
            offset $1 limit $2`,
        values: [offset, limit]
    }
};

module.exports.bookGenres = (book_id) => {
    return {
        text: `select g.name
            from book join book_to_genre btg on book.id = btg.book_id join genre g on btg.genre_id = g.id
            where book.id = $1`,
        values: [book_id],
    }
};

module.exports.bookID = (id) => {
    return {
        text: `SELECT bw.*, a.id as a_id, a.name as a_name, a.description as a_desc, i.href as a_img, b.avg_rating, b.theme
            from book_view bw join author a on bw.author = a.id join image i on a.image = i.id join book b on b.id = bw.id
            where bw.id = $1`,
        values: [id]
    }
};

module.exports.bookReviews = (bookID) => {
    return {
        text: `select br.id, br.timestamp, br.title, br.content as body, br.rating,
                    u.id author_id, u.name as author_name, u.surname as author_surname
                from book_review br join "user" u on br.author = u.id
                where br.book = $1`,
        values: [bookID]
    }
};

module.exports.authorSearch = (query, theme, genre, offset = 0, limit = 20) => {
    let q = `
        select a.id, a.name, i.href
        from author a
        join book b on a.id = b.author
        join image i on a.image = i.id
        join book_to_genre btg on b.id = btg.book_id
        join genre g on btg.genre_id = g.id `

    let clause = 'where';
    let placeholder = 1;
    let values = [];

    if (query !== undefined) {
        q += clause + ' (lower(a.name)  LIKE \'%\' || lower($' + placeholder + ') || \'%\')' + ' ';
        clause = 'and';
        placeholder += 1;
        values.push(query)
    }
    if (genre !== undefined) {
        q += clause + ' (lower(g.name)  LIKE \'%\' || lower($' + placeholder + ') || \'%\')' + ' ';
        clause = 'and';
        placeholder += 1;
        values.push(genre)
    }
    if (theme !== undefined) {
        q += clause + ' (lower(b.theme)  LIKE \'%\' || lower($' + placeholder + ') || \'%\')' + ' ';
        placeholder += 1;
        values.push(theme)
    }

    q += ' group by a.id, a.name, i.href offset $' + placeholder + ' limit $' + (placeholder + 1);
    values.push(offset * limit, limit);
    return {
        text: q,
        values: values
    }
}

module.exports.bookSearch = (query, isbn, genre, year, author, author_id, publisher, publisher_id, theme,
                             offset = 0, limit = 20, orderby, extra) => {
    let q = `select distinct b.id, b.title, a.id as author, a.name as author_name, b.description, p.name as publisher, b.price, b.isbn,
                b.isbn13, b.publication_year, b.publication_month, b.avg_rating, i.href as image_href,
                i.href_small as image_href_small, b.theme
             from book b
                join author a on b.author = a.id
                join publisher p on b.publisher = p.id
                join image i on b.image_id = i.id
                join book_to_genre btg on b.id = btg.book_id
                join genre g on btg.genre_id = g.id` + ' ';

    let clause = 'where';
    let placeholder = 1;
    let values = [];

    if (query !== undefined) {
        q += clause + ' ((lower(b.title) LIKE \'%\' || lower($' + placeholder + ') || \'%\') ' +
            'or (lower(a.name) LIKE \'%\' || lower($' + placeholder + ') || \'%\') or (lower(p.name) LIKE \'%\' || lower($' + placeholder + ') || \'%\') ' +
            'or (b.isbn LIKE \'%\' || $' + placeholder + ' || \'%\') or (b.isbn13  LIKE \'%\' || $' + placeholder + ' || \'%\') ' +
            'or (lower(g.name)  LIKE \'%\' || lower($' + placeholder + ') || \'%\') or (lower(b.theme)  LIKE \'%\' || lower($' + placeholder + ') || \'%\'))' + ' ';
        clause = 'and';
        placeholder += 1;
        values.push(query)
    }
    if (isbn !== undefined) {
        q += clause + ' (b.isbn = $' + placeholder + ' or b.isbn13 = $' + placeholder + ')' + ' ';
        clause = 'and';
        placeholder += 1;
        values.push(isbn)
    }
    if (genre !== undefined) {
        q += clause + ' (lower(g.name)  LIKE \'%\' || lower($' + placeholder + ') || \'%\')' + ' ';
        clause = 'and';
        placeholder += 1;
        values.push(genre)
    }
    if (year !== undefined) {
        q += clause + ' (b.publication_year  LIKE \'%\' || $' + placeholder + ' || \'%\')' + ' ';
        clause = 'and';
        placeholder += 1;
        values.push(year)
    }
    if (author !== undefined) {
        q += clause + ' (lower(a.name)  LIKE \'%\' || lower($' + placeholder + ') || \'%\')' + ' ';
        clause = 'and';
        placeholder += 1;
        values.push(author)
    }
    if (publisher !== undefined) {
        q += clause + ' (lower(p.name)  LIKE \'%\' || lower($' + placeholder + ') || \'%\')' + ' ';
        placeholder += 1;
        values.push(publisher)
    }
    if (author_id !== undefined) {
        // If matching exact values (i.e. IDs) there is no point in using LIKE% syntax
        q += clause + ' (a.id = $' + placeholder + ')' + ' ';
        clause = 'and';
        placeholder += 1;
        values.push(parseInt(author_id))
    }
    if (publisher_id !== undefined) {
        q += clause + ' (p.id = \'%\' || $' + placeholder + ' || \'%\')' + ' ';
        clause = 'and';
        placeholder += 1;
        values.push(publisher_id)
    }
    if (theme !== undefined) {
        q += clause + ' (lower(b.theme)  LIKE \'%\' || lower($' + placeholder + ') || \'%\')' + ' ';
        placeholder += 1;
        values.push(theme)
    }

    clause = ' ' + 'order by' + ' ';

    if (orderby !== undefined) {
        if (orderby === 'author') {
            if (extra !== undefined && extra === 'latest')
                q += clause + 'b.publication_year desc, a.name asc ';
            else
                q += clause + 'a.name asc ';
        } else if (orderby === 'price') {
            if (extra !== undefined && extra === 'latest')
                q += clause + 'b.publication_year desc, b.price asc ';
            else
                q += clause + 'b.price asc ';
        } else if (orderby === 'name') {
            if (extra !== undefined && extra === 'latest')
                q += clause + 'b.publication_year desc, b.title asc ';

            else
                q += clause + 'b.title asc ';
        } else if (orderby === 'year') {
            q += clause + 'b.publication_year desc ';
        }
        clause = ','
    }

    if (extra !== undefined) {
        switch (extra) {
            case 'favourites':
                q += clause + 'publisher asc';
                break;
            case 'bestsellers':
                q += clause + 'publisher desc, b.publication_month asc';
                break;
        }
    }

    q += ' offset $' + placeholder + ' limit $' + (placeholder + 1);
    values.push(offset * limit, limit);
    return {
        text: q,
        values: values
    }
};

module.exports.relatedBooks = (bookID, offset, limit) => {
    return {
        text: `select distinct b.id, b.title, b.description, p.name as publisher, b.price, b.isbn,
                    b.isbn13, b.publication_year, b.publication_month, b.avg_rating, i.href as image_href,
                    i.href_small as image_href_small, b.theme, a.id as a_id, a.name as a_name, a.description as a_desc,
                    im.href as a_img
                from book b
                    join author a on b.author = a.id
                    join publisher p on b.publisher = p.id
                    join image i on b.image_id = i.id
                    join image im on a.image = im.id
                    where b.theme = (select theme from book where id = $1)
                        and b.author != (select author from book where id = $1)
                offset $2 limit $3`,
        values: [bookID, offset, limit]
    }
};

module.exports.genres = () => {
    return {
        text: `select id, name as name from genre`,
        values: []
    }
};

module.exports.themes = () => {
    return {
        text: `select distinct(theme) as name from book`,
        values: []
    }
};


module.exports.addBookReview = (userID, bookID, body) => {
    return {
        text: `insert into book_review(title, content, book, rating, author)
            values ($1, $2, $3, $4, $5)`,
        values: [body.title, body.content, bookID, body.rating, userID]
    }
};

module.exports.deleteReview = (id, reviewID, userID) => {
    return {
        text: `delete from book_review
            where author = $1 and id = $2 and book = $3`,
        values: [userID, reviewID, id]
    }
};

/***************************
 ******** AUTHORS **********
 ***************************/

module.exports.author = (offset, limit) => {
    return {
        text: `select a.id, name, i.href as image_url, description 
            from author a join image i on a.image = i.id limit $2 offset $1`,
        values: [offset, limit]
    }
};

module.exports.authorId = (id) => {
    return {
        text: `select a.id, name, i.href as image_url, description
            from author a join image i on a.image = i.id
            where a.id = $1`,
        values: [id]
    }
};

module.exports.authorReviews = (authorID) => {
    return {
        text: `select u.name, u.surname, u.email, u.birthdate, timestamp, title, content as body,
                    rating, book_author as author_id
               from author_review
                        join "user" u on author_review.author = u.id
               where book_author = $1`,
        values: [authorID]
    }
};

module.exports.addAuthorReview = (id, userID, body) => {
    return {
        text: `insert into author_review(title, content, book_author, author, rating) 
            values($1, $2, $3, $4, $5)`,
        values: [body.title, body.content, id, userID, body.rating]
    }
};

module.exports.deleteAuthorReview = (id, reviewID, userID) => {
    return {
        text: `delete from author_review 
            where book_author = $1 and author = $2 and id = $3`,
        values: [id, userID, reviewID]
    }
};

/***************************
 ******** EVENTS ***********
 ***************************/

module.exports.event = () => {
    return {
        text: `select e.id, e.name, e.description, e.timestamp, e.related_author, e.related_book,
                a.id as address_id, a.name as address_name, a.address_line_1, a.address_line_2, a.cap, a.city, a.country,
                b.title, a2.name as author_name
            from event e
                join address a on e.location = a.id
                join author a2 on e.related_author = a2.id
                join book b on e.related_book = b.id
            order by e.timestamp asc limit 30`
    }
};

module.exports.eventByID = (id) => {
    return {
        text: `select e.id, e.name, e.description, e.timestamp, e.related_author, e.related_book,
                a.id as address_id, a.name as address_name, a.address_line_1, a.address_line_2, a.cap, a.city, a.country,
                b.title, a2.name as author_name
            from event e
                join address a on e.location = a.id
                join author a2 on e.related_author = a2.id
                join book b on e.related_book = b.id
            where e.id = $1`,
        values: [id]
    }
};

module.exports.eventSearch = (query_string, name, author_name, author_id, book_name, book_id, date, date_from, date_to, location, offset, limit, oderby, extra) => {
    let q = `select e.id, e.name, e.description, e.timestamp, e.related_author, e.related_book,
                    a.id as address_id, a.name as address_name, a.address_line_1, a.address_line_2, a.cap, a.city, a.country,
                    a2.name as author_name, b.title
             from event e
                      join address a on e.location = a.id
                      left join author a2 on e.related_author = a2.id
                      left join book b on e.related_book = b.id` + ' ';

    let clause = 'where';
    let placeholder = 1;
    let values = [];

    if (query_string !== undefined) {
        q += clause + ' ((lower(e.name) LIKE \'%\' || lower($' + placeholder + ') || \'%\') or (lower(a.city) LIKE \'%\' || lower($' + placeholder + ') || \'%\')' +
            'or (lower(a2.name) LIKE \'%\' || lower($' + placeholder + ') || \'%\') or (lower(b.title) LIKE \'%\' || lower($' + placeholder + ') || \'%\')) ' +
            'or  (lower(a.name) LIKE \'%\' || lower($' + placeholder + ') || \'%\')';
        clause = 'and';
        placeholder += 1;
        values.push(query_string)
    }
    if (name !== undefined) {
        q += clause + ' (lower(e.name) = lower($' + placeholder + '))' + ' ';
        clause = 'and';
        placeholder += 1;
        values.push(name)
    }
    if (author_name !== undefined) {
        q += clause + ' (lower(a2.name) LIKE \'%\' || lower($' + placeholder + ') || \'%\') ' + ' ';
        clause = 'and';
        placeholder += 1;
        values.push(author_name)
    }
    if (author_id !== undefined) {
        q += clause + ' (a2.id = $' + placeholder + ')' + ' ';
        clause = 'and';
        placeholder += 1;
        values.push(author_id)
    }
    if (book_name !== undefined) {
        q += clause + ' (lower(b.title) LIKE \'%\' || lower($' + placeholder + ') || \'%\') ' + ' ';
        clause = 'and';
        placeholder += 1;
        values.push(book_name)
    }
    if (book_id !== undefined) {
        q += clause + ' (b.id = $' + placeholder + ')' + ' ';
        clause = 'and';
        placeholder += 1;
        values.push(book_id)
    }
    if (date !== undefined) {
        q += clause + ' (CAST(e.timestamp AS DATE) = $' + placeholder + ')' + ' ';
        clause = 'and';
        placeholder += 1;
        values.push(date)
    }
    if (date_from !== undefined) {
        q += clause + ' (e.timestamp >= $' + placeholder + ')' + ' ';
        clause = 'and';
        placeholder += 1;
        values.push(date_from)
    }
    if (date_to !== undefined) {
        q += clause + ' (e.timestamp <= $' + placeholder + ')' + ' ';
        clause = 'and';
        placeholder += 1;
        values.push(date_to)
    }
    if (location !== undefined) {
        q += clause + ' (lower(a.city) = lower($' + placeholder + '))' + ' ';
        placeholder += 1;
        values.push(location)
    }

    if (extra !== undefined) {
        // Filter by bookid
        q += clause + ' e.related_book = $' + placeholder + ' ';
        placeholder += 1;
        values.push(extra)
    }

    q += ' order by e.timestamp asc offset $' + placeholder + ' limit $' + (placeholder + 1);
    values.push(offset * limit, limit);
    return {
        text: q,
        values: values
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
        text: `select id, name, surname, email, birthdate from "user" where email = $1 and sha256 = $2`,
        values: [email, pswSHA256]
    }
};

module.exports.getUserSalt = (email) => {
    return {
        text: `select salt16 from "user" where email = $1`,
        values: [email]
    }
};

module.exports.getUserOrder = (id, offset = 0, limit = 20) => {
    return {
        text: `select distinct o.id as OrderID, address_id, u.id as user_id, u.name, u.surname, u.email, u.birthdate, o.total_amount as amount, o.timestamp
            from "order" o join "user" u on o.user_id = u.id join order_to_book otb on o.id = otb.order_id
            where u.id = $1
            order by timestamp desc 
            offset $2 limit $3`,
        values: [id, offset, limit]
    }
};

module.exports.addUserOrder = (total_amount, user_id, address_id=1) => {
    return {
        text: `insert into "order"(total_amount, user_id, address_id) VALUES ($1, $2, $3) returning id`,
        values: [total_amount, user_id, address_id]
    }
};

module.exports.addBookToOrder = (bookID, orderID, qty) => {
    return {
        text: `insert into order_to_book(order_id, book_id, qty) values ($1, $2, $3)`,
        values: [orderID, bookID, qty]
    }
};

module.exports.getBooksForOrder = (id) => {
    return {
        text: `select b.id as book_id, b.title, a.name, b.description, p.name as publisher, b.price, b.isbn, b.isbn13, b.publication_year,
                b.avg_rating, i.href as image_href, otb.qty
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

module.exports.updateAddressForUser = (userID, addressID, address) => {
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
            address.country, addressID, userID]
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
                b.price, b.isbn, b.publication_year, b.avg_rating, i.href as image_href, ctb.qty,
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

module.exports.addBookToUserWishList = (userID, bookID) => {
    return {
        text: `insert into user_to_book_wl(user_id, book_id)
            values ($1, $2)`,
        values: [userID, bookID]
    }
};

module.exports.deleteBookFromUserWishList = (userID, bookID) => {
    return {
        text: `delete from user_to_book_wl
            where book_id = $2 and user_id = $1`,
        values: [userID, bookID]
    }
};

module.exports.getWishList = (userID) => {
    return {
        text: `SELECT bw.*, a.id as a_id, a.name as a_name, a.description as a_desc, i.href as a_img, b.avg_rating, b.theme 
            from user_to_book_wl utbw
            join book_view bw on utbw.book_id = bw.id join author a on bw.author = a.id join image i on a.image = i.id join book b on b.id = bw.id
            where user_id = $1`,
        values: [userID]
    };
};