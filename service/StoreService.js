'use strict';


/**
 * Delete an existing order
 *
 * id String 
 * userId Integer The ID of the user
 * no response value expected for this operation
 **/
exports.orderByIdDELETE = function(id,userId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Get a single order by id
 *
 * id String 
 * returns Review
 **/
exports.orderByIdGET = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "author" : 6,
  "book" : 5,
  "rating" : 1.46581298050294517310021547018550336360931396484375,
  "id" : 0,
  "title" : "title",
  "body" : "body",
  "timestamp" : "2000-01-23T04:56:07.000+00:00"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Place an order for some books
 *
 * body Body 
 * no response value expected for this operation
 **/
exports.orderPOST = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

