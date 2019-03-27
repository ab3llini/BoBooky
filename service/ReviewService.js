'use strict';


/**
 * Add a review
 *
 * id String 
 * body Review 
 * no response value expected for this operation
 **/
exports.addReviewPOST = function(id,body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Delete and existing review
 *
 * id String 
 * userID Integer The id of the user that wrote the review
 * no response value expected for this operation
 **/
exports.updateReviewDELETE = function(id,userID) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Update an existing review for the selected book
 *
 * id String 
 * body Review 
 * no response value expected for this operation
 **/
exports.updateReviewPUT = function(id,body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

