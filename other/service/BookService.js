'use strict';

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
 * Books available in the inventory
 * List of books available in the inventory
 *
 * offset Integer Pagination offset. Default is 0. (optional)
 * limit Integer Maximum number of items per page. Default is 20 and cannot exceed 500. (optional)
 * returns List
 **/
exports.bookGET = function(offset,limit) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ "{\n  id: 0,\n  title: \"Il deserto dei tartari\",\n  author: \"Dino Buzzati\",\n  price: {\n    value: 10,\n    currency: \"eur\"\n  },\n  image_url: \"https://test.com\"\n}", "{\n  id: 0,\n  title: \"Il deserto dei tartari\",\n  author: \"Dino Buzzati\",\n  price: {\n    value: 10,\n    currency: \"eur\"\n  },\n  image_url: \"https://test.com\"\n}" ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


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
}


/**
 * Find book by ID
 * Returns a book
 *
 * id Long ID of book to return
 * returns Book
 **/
exports.bookIdGET = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = "{\n  id: 0,\n  title: \"Il deserto dei tartari\",\n  author: \"Dino Buzzati\",\n  price: {\n    value: 10,\n    currency: \"eur\"\n  },\n  image_url: \"https://test.com\"\n}";
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


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
}


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
}


/**
 * Get the related books for the given book id
 *
 * id String 
 * returns List
 **/
exports.bookRelatedGET = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ "{\n  id: 0,\n  title: \"Il deserto dei tartari\",\n  author: \"Dino Buzzati\",\n  price: {\n    value: 10,\n    currency: \"eur\"\n  },\n  image_url: \"https://test.com\"\n}", "{\n  id: 0,\n  title: \"Il deserto dei tartari\",\n  author: \"Dino Buzzati\",\n  price: {\n    value: 10,\n    currency: \"eur\"\n  },\n  image_url: \"https://test.com\"\n}" ];
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
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ "{\n  id: 0,\n  title: \"Il deserto dei tartari\",\n  author: \"Dino Buzzati\",\n  price: {\n    value: 10,\n    currency: \"eur\"\n  },\n  image_url: \"https://test.com\"\n}", "{\n  id: 0,\n  title: \"Il deserto dei tartari\",\n  author: \"Dino Buzzati\",\n  price: {\n    value: 10,\n    currency: \"eur\"\n  },\n  image_url: \"https://test.com\"\n}" ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

