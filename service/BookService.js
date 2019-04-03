'use strict';


/**
 * Delete an existing book
 * Deletes the book specified in the id
 *
 * bookID Integer The id of the book to delete
 * no response value expected for this operation
 **/
exports.bookDELETE = function(bookID) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Update an existing book
 * Updates an existing book with the informations provided
 *
 * body Book 
 * no response value expected for this operation
 **/
exports.bookPUT = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


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
 * Books available in the inventory
 * List of books available in the inventory
 *
 * offset Integer Pagination offset. Default is 0. (optional)
 * limit Integer Maximum number of items per page. Default is 20 and cannot exceed 500. (optional)
 * returns List
 **/
exports.booksGET = function(offset,limit) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "id" : 0,
  "title" : "Il deserto dei tartari",
  "author" : "Dino Buzzati",
  "price" : {
    "value" : 10,
    "currency" : "eur"
  },
  "status" : "available"
}, {
  "id" : 0,
  "title" : "Il deserto dei tartari",
  "author" : "Dino Buzzati",
  "price" : {
    "value" : 10,
    "currency" : "eur"
  },
  "status" : "available"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Add new book
 * Add a new book to the library
 *
 * body Book 
 * no response value expected for this operation
 **/
exports.booksPOST = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Find book by ID
 * Returns a book
 *
 * id Long ID of book to return
 * returns Book
 **/
exports.getBookById = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "id" : 0,
  "title" : "Il deserto dei tartari",
  "author" : "Dino Buzzati",
  "price" : {
    "value" : 10,
    "currency" : "eur"
  },
  "status" : "available"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Find books by name
 * Return a list of books
 *
 * name String Name of the book
 * returns List
 **/
exports.getBooksByName = function(name) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "id" : 0,
  "title" : "Il deserto dei tartari",
  "author" : "Dino Buzzati",
  "price" : {
    "value" : 10,
    "currency" : "eur"
  },
  "status" : "available"
}, {
  "id" : 0,
  "title" : "Il deserto dei tartari",
  "author" : "Dino Buzzati",
  "price" : {
    "value" : 10,
    "currency" : "eur"
  },
  "status" : "available"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

