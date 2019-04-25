'use strict';

let db = require('../db/Database.js');

/**
 * Wrapper for all request of type GET
 * @param func is the function to call from the package Database.js
 *        this function will return a promise
 * @param args is a list of arguments to pass to the function func
 * @returns {Promise<any>}
 */
function functionGET(func, args) {
    return new Promise(function(resolve, reject) {
        func.apply(null, args)
            .then(books => {
                resolve(books)
            })
            .catch(() => {
                reject()
            })
    });
}

/**
 * Books available in the inventory
 * List of books available in the inventory
 *
 * @param offset Integer Pagination offset. Default is 0. (optional)
 * @param limit Integer Maximum number of items per page. Default is 20 and cannot exceed 500. (optional)
 * @returns {Promise<any>}
 **/
exports.bookGET = function(offset = 0,limit = 20) {
    return functionGET(db.bookGET, [offset, limit])
};


/**
 * Delete an existing book
 * Deletes the book specified in the id
 *
 * id Long ID of book to return
 * no response value expected for this operation
 **/
exports.bookIdDELETE = function(id) {
    return new Promise(function(resolve, reject) {
        resolve();
    });
}


/**
 * Find book by ID
 * Returns a book
 *
 * @param id Long ID of book to return
 * @returns {Promise<any>}
 **/
exports.bookIdGET = function(id) {
    return functionGET(db.bookIdGET, [id])
};


/**
 * Update an existing book
 * Updates an existing book with the informations provided
 *
 * id Long ID of book to return
 * body Book
 * no response value expected for this operation
 **/
exports.bookIdPUT = function(id,body) {
    return new Promise(function(resolve, reject) {
        resolve();
    });
}


/**
 * Add new book
 * Add a new book to the library
 *
 * body Book
 * no response value expected for this operation
 **/
exports.bookPOST = function(body) {
    return new Promise(function(resolve, reject) {
        resolve();
    });
}


/**
 * Get the related books for the given book id
 *
 * id String
 * returns List
 **/
exports.bookRelatedGET = function(id) {
    return new Promise(function(resolve, reject) {
        var examples = {};
        examples['application/json'] = [ "{\n  id: 0,\n  title: \"Il deserto dei tartari\",\n  author: \"Dino Buzzati\",\n  price: {\n    value: 10,\n    currency: \"eur\"\n  },\n  image_url: \"https://test.com\"\n}", "{\n  id: 0,\n  title: \"Il deserto dei tartari\",\n  author: \"Dino Buzzati\",\n  price: {\n    value: 10,\n    currency: \"eur\"\n  },\n  image_url: \"https://test.com\"\n}" ];
        if (Object.keys(examples).length > 0) {
            resolve(examples[Object.keys(examples)[0]]);
        } else {
            resolve();
        }
    });
}


/**
 * Delete a review from a given user
 *
 * id String
 * reviewID Integer The id of the review to be removed
 * no response value expected for this operation
 **/
exports.bookReviewDELETE = function(id,reviewID) {
    return new Promise(function(resolve, reject) {
        resolve();
    });
}


/**
 * Get reviews for a given book
 *
 * id String
 * returns List
 **/
exports.bookReviewGET = function(id) {
    return new Promise(function(resolve, reject) {
        var examples = {};
        examples['application/json'] = [ {
            "author" : 6,
            "rating" : 1.46581298050294517310021547018550336360931396484375,
            "book_author" : 5,
            "id" : 0,
            "title" : "title",
            "body" : "body",
            "timestamp" : "2000-01-23T04:56:07.000+00:00"
        }, {
            "author" : 6,
            "rating" : 1.46581298050294517310021547018550336360931396484375,
            "book_author" : 5,
            "id" : 0,
            "title" : "title",
            "body" : "body",
            "timestamp" : "2000-01-23T04:56:07.000+00:00"
        } ];
        if (Object.keys(examples).length > 0) {
            resolve(examples[Object.keys(examples)[0]]);
        } else {
            resolve();
        }
    });
}


/**
 * Add new review for the given book
 *
 * id String
 * userID Integer The user that wrote the review
 * body Review
 * no response value expected for this operation
 **/
exports.bookReviewPOST = function(id,userID,body) {
    return new Promise(function(resolve, reject) {
        resolve();
    });
}


/**
 * Find books by name
 * Return a list of books
 *
 * query String generic search query for the book (optional)
 * isbn String  (optional)
 * genre String  (optional)
 * year Integer  (optional)
 * author String  (optional)
 * publisher String  (optional)
 * returns List
 **/
exports.bookSearchGET = function(query,isbn,genre,year,author,publisher) {
    return new Promise(function(resolve, reject) {
        var examples = {};
        examples['application/json'] = [ "{\n  id: 0,\n  title: \"Il deserto dei tartari\",\n  author: \"Dino Buzzati\",\n  price: {\n    value: 10,\n    currency: \"eur\"\n  },\n  image_url: \"https://test.com\"\n}", "{\n  id: 0,\n  title: \"Il deserto dei tartari\",\n  author: \"Dino Buzzati\",\n  price: {\n    value: 10,\n    currency: \"eur\"\n  },\n  image_url: \"https://test.com\"\n}" ];
        if (Object.keys(examples).length > 0) {
            resolve(examples[Object.keys(examples)[0]]);
        } else {
            resolve();
        }
    });
}

