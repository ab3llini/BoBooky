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
exports.bookGET = function(offset=0,limit=20) {
  return db.execute(db.bookGET, [offset, limit])
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
};


/**
 * Find book by ID
 * Returns a book
 *
 * id Long ID of book to return
 * returns Book
 **/
exports.bookIdGET = function(id) {
    return db.execute(db.bookIdGET, [id])
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
};


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
};


/**
 * Get the related books for the given book id
 *
 * id String 
 * returns List
 **/
exports.bookRelatedGET = function(id) {
  return db.execute(db.bookRelatedGET, [id])
};


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
};


/**
 * Get reviews for a given book
 *
 * id String 
 * returns List
 **/
exports.bookReviewGET = function(id) {
    return db.execute(db.bookReviewGET, [id])
};


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
};


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
  return db.execute(db.bookSearchGET, [query,isbn,genre,year,author,publisher])
};

