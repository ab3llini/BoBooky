'use strict';
let db = require('../db/Database');


/**
 * Books available in the inventory
 * List of books available in the inventory
 *
 * offset Integer Pagination offset. Default is 0. (optional)
 * limit Integer Maximum number of items per page. Default is 20 and cannot exceed 500. (optional)
 * returns List
 **/
exports.bookGET = function(offset,limit) {
  return db.execute(db.bookGET, [offset, limit])

}


/**
 * Gets all the genres
 *
 * returns List
 **/
exports.bookGenreGET = function() {
  return db.execute(db.bookGenreGET, [])
}


/**
 * Find book by ID
 * Returns a book
 *
 * id Long ID of book to return
 * returns Book
 **/
exports.bookIdGET = function(id) {
  return db.execute(db.bookIdGET, [id])
}


/**
 * Get the related books for the given book id
 *
 * id String 
 * returns List
 **/
exports.bookRelatedGET = function(id) {
  return db.execute(db.bookRelatedGET, [id])
}


/**
 * Deletes a review written by the authenticated user.
 *
 * id String 
 * reviewID Integer The id of the review to be removed (optional)
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
  return db.execute(db.bookReviewGET, [id])
}


/**
 * Adds a review to the specified book
 *
 * id String 
 * body Review 
 * no response value expected for this operation
 **/
exports.bookReviewPOST = function(id, userID, body) {
  return db.execute(db.bookReviewPOST, [id, userID, body])
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
 * authorID Integer  (optional)
 * publisher String  (optional)
 * publisherID Integer  (optional)
 * theme String  (optional)
 * offset Integer Defaults to 0 (optional)
 * limit Integer Defaults to 20 (optional)
 * returns List
 **/
exports.bookSearchGET = function(query,isbn,genre,year,author,authorID,publisher,publisherID,theme,offset,limit, orderby, extra) {
  return db.execute(db.bookSearchGET, [query,isbn,genre,year,author,authorID,publisher,publisherID,theme, offset, limit, orderby, extra])

}


/**
 * Returns all the themes in the db.
 *
 * returns List
 **/
exports.bookThemeGET = function() {
  return db.execute(db.bookThemeGET, [])
}

