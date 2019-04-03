'use strict';


/**
 * Fetches all the reviews for this book
 *
 * id String 
 * returns List
 **/
exports.bookReviewsGET = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "author" : 6,
  "book" : 5,
  "rating" : 1.46581298050294517310021547018550336360931396484375,
  "id" : 0,
  "title" : "title",
  "body" : "body",
  "timestamp" : "2000-01-23T04:56:07.000+00:00"
}, {
  "author" : 6,
  "book" : 5,
  "rating" : 1.46581298050294517310021547018550336360931396484375,
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
 * Login
 * Login with a form
 *
 * username String 
 * password String 
 * no response value expected for this operation
 **/
exports.userLoginPOST = function(username,password) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Logs out the current user session
 * Logout
 *
 * no response value expected for this operation
 **/
exports.userLogoutGET = function() {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Registration
 * Register into the bookstore
 *
 * id Integer  (optional)
 * name String  (optional)
 * address String  (optional)
 * creditcard String  (optional)
 * no response value expected for this operation
 **/
exports.userRegisterPOST = function(id,name,address,creditcard) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

