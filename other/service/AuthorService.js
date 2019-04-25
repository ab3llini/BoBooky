'use strict';

let db = require('../db/Database.js');

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
 * List all the authors in the database
 *
 * offset Integer Page offset. Defaults to 0 (optional)
 * limit Integer Result limit. Defaults to 20, max 500. (optional)
 * returns List
 **/
exports.authorGET = function(offset,limit) {
    return new Promise(function(resolve, reject) {
        var examples = {};
        examples['application/json'] = [ {
            "image_url" : "image_url",
            "name" : "name",
            "description" : "description",
            "id" : 0
        }, {
            "image_url" : "image_url",
            "name" : "name",
            "description" : "description",
            "id" : 0
        } ];
        if (Object.keys(examples).length > 0) {
            resolve(examples[Object.keys(examples)[0]]);
        } else {
            resolve();
        }
    });
}


/**
 * Delete an existing author
 * Deletes the author specified in the id
 *
 * id String
 * no response value expected for this operation
 **/
exports.authorIdDELETE = function(id) {
    return new Promise(function(resolve, reject) {
        resolve();
    });
}


/**
 * Fetch a specific author
 *
 * id String
 * returns Author
 **/
exports.authorIdGET = function(id) {
    return new Promise(function(resolve, reject) {
        var examples = {};
        examples['application/json'] = {
            "image_url" : "image_url",
            "name" : "name",
            "description" : "description",
            "id" : 0
        };
        if (Object.keys(examples).length > 0) {
            resolve(examples[Object.keys(examples)[0]]);
        } else {
            resolve();
        }
    });
}


/**
 * Update an existing author
 * Updates an existing author with the informations provided
 *
 * id String
 * body Author
 * no response value expected for this operation
 **/
exports.authorIdPUT = function(id,body) {
    return new Promise(function(resolve, reject) {
        resolve();
    });
}


/**
 * Add new author
 * Add a new book to the library
 *
 * body Author
 * no response value expected for this operation
 **/
exports.authorPOST = function(body) {
    return new Promise(function(resolve, reject) {
        resolve();
    });
}


/**
 * Delete a review from a given user
 *
 * id String
 * reviewID Integer The id of the review to be removed
 * no response value expected for this operation
 **/
exports.authorReviewDELETE = function(id,reviewID) {
    return new Promise(function(resolve, reject) {
        resolve();
    });
}


/**
 * Get reviews for a given author
 *
 * id String
 * returns List
 **/
exports.authorReviewGET = function(id) {
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
 * Add new review for the given author
 *
 * id String
 * userID Integer The user that wrote the review
 * body Review
 * no response value expected for this operation
 **/
exports.authorReviewPOST = function(id,userID,body) {
    return new Promise(function(resolve, reject) {
        resolve();
    });
}

