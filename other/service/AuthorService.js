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
 * no response value expected for this operation
 **/
exports.authorReviewDELETE = function(id,reviewID) {
    //TODO:
    return new Promise(function(resolve, reject) {
        resolve();
    });
};


/**
 * Get reviews for a given author
 *
 * id String
 * returns List
 **/
exports.authorReviewGET = function(id) {
    //TODO:
    return new Promise(function(resolve, reject) {
        var examples = {};
        examples['application/json'] = [ {
            "author" : "{\n  id: 1,\n  name: \"Alan\",\n  surname: \"Turing\",\n  email: \"alan.turing@example.com\"\n  birthdate: \"1989-01-01\"\n}",
            "rating" : 6.02745618307040320615897144307382404804229736328125,
            "id" : 0,
            "title" : "title",
            "body" : "body",
            "timestamp" : "2000-01-23T04:56:07.000+00:00"
        }, {
            "author" : "{\n  id: 1,\n  name: \"Alan\",\n  surname: \"Turing\",\n  email: \"alan.turing@example.com\"\n  birthdate: \"1989-01-01\"\n}",
            "rating" : 6.02745618307040320615897144307382404804229736328125,
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
    //TODO:
    return new Promise(function(resolve, reject) {
        resolve();
    });
};

