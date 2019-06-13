'use strict';

let db = require('../db/Database');

/**
 * List all the authors in the database
 *
 * offset Integer Page offset. Defaults to 0 (optional)
 * limit Integer Result limit. Defaults to 20, max 500. (optional)
 * returns List
 **/
exports.authorGET = function(offset,limit) {
  return db.execute(db.authorGET, [offset, limit])

};


/**
 * Fetch a specific author
 *
 * id String 
 * returns Author
 **/
exports.authorIdGET = function(id) {
  return db.execute(db.authorIdGET, [id])

};


/**
 * Deletes a review written by the authenticated user.
 *
 * id String 
 * reviewID Integer The id of the review to be removed
 * no response value expected for this operation
 **/
exports.authorReviewDELETE = function(id,reviewID) {
  return db.execute(db.authorIdReviewDELETE(id,reviewID,userID))
};


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
 * Adds a review to the specified author
 *
 * id String 
 * body Review 
 * no response value expected for this operation
 **/
exports.authorReviewPOST = function(id,body) {
  return db.execute(db.authorIdReviewPOST, [id, userID, body])

};

