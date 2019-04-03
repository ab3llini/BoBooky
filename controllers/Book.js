'use strict';

var utils = require('../utils/writer.js');
var Book = require('../service/BookService');

module.exports.bookDELETE = function bookDELETE (req, res, next) {
  var bookID = req.swagger.params['bookID'].value;
  Book.bookDELETE(bookID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.bookPUT = function bookPUT (req, res, next) {
  var body = req.swagger.params['body'].value;
  Book.bookPUT(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.bookReviewsGET = function bookReviewsGET (req, res, next) {
  var id = req.swagger.params['id'].value;
  Book.bookReviewsGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.booksGET = function booksGET (req, res, next) {
  var offset = req.swagger.params['offset'].value;
  var limit = req.swagger.params['limit'].value;
  Book.booksGET(offset,limit)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.booksPOST = function booksPOST (req, res, next) {
  var body = req.swagger.params['body'].value;
  Book.booksPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getBookById = function getBookById (req, res, next) {
  var id = req.swagger.params['id'].value;
  Book.getBookById(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getBooksByName = function getBooksByName (req, res, next) {
  var name = req.swagger.params['name'].value;
  Book.getBooksByName(name)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
