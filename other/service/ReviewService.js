'use strict';


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

