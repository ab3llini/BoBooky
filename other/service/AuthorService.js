'use strict';

let db = require('../db/Database');

/**
 * List all the authors in the database
 *
 * @param offset Integer Page offset. Defaults to 0 (optional)
 * @param limit Integer Result limit. Defaults to 20, max 500. (optional)
 * @returns List
 **/
exports.authorGET = function(offset,limit) {
    return db.execute(db.authorGET, [offset, limit])
};


/**
 * Delete an existing author
 * Deletes the author specified in the id
 *
 * @param id String
 * no response value expected for this operation
 **/
exports.authorIdDELETE = function(id) {
    return new Promise(function(resolve, reject) {
        resolve();
    });
};


/**
 * Fetch a specific author
 *
 * @param id String
 * @returns Author
 **/
exports.authorIdGET = function(id) {
    return db.execute(db.authorIdGET, [id])
};


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
};


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
};


/**
 * Delete a review from a given user
 *
 * id String
 * reviewID Integer The id of the review to be removed
 * userID Integer
 * no response value expected for this operation
 **/
exports.authorReviewDELETE = function(id,reviewID,userID) {
    return db.execute(db.authorIdReviewDELETE(id,reviewID,userID))
}


/**
 * Get reviews for a given author
 *
 * id String
 * returns List
 **/
exports.authorReviewGET = function(id) {
    return db.execute(db.authorIdReviewGET, [id])
};


/**
 * Add new review for the given author
 *
 * id String
 * userID Integer The user that wrote the review
 * body Review
 * no response value expected for this operation
 **/
exports.authorReviewPOST = function(id,userID,body) {
    return db.execute(db.authorIdReviewPOST, [id, userID, body])
};

