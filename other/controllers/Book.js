'use strict';

var utils = require('../utils/writer.js');
var Book = require('../service/BookService');

module.exports.bookGET = function bookGET (req, res, next) {
  var offset = req.swagger.params['offset'].value;
  var limit = req.swagger.params['limit'].value;
  Book.bookGET(offset,limit)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.bookGenreGET = function bookGenreGET (req, res, next) {
  Book.bookGenreGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.bookIdDELETE = function bookIdDELETE (req, res, next) {
  var id = req.swagger.params['id'].value;
  Book.bookIdDELETE(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.bookIdGET = function bookIdGET (req, res, next) {
  var id = req.swagger.params['id'].value;
  Book.bookIdGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.bookIdPUT = function bookIdPUT (req, res, next) {
  var id = req.swagger.params['id'].value;
  var body = req.swagger.params['body'].value;
  Book.bookIdPUT(id,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.bookPOST = function bookPOST (req, res, next) {
  var body = req.swagger.params['body'].value;
  Book.bookPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.bookRelatedGET = function bookRelatedGET (req, res, next) {
  var id = req.swagger.params['id'].value;
  Book.bookRelatedGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.bookReviewDELETE = function bookReviewDELETE (req, res, next) {
  var id = req.swagger.params['id'].value;
  var reviewID = req.swagger.params['reviewID'].value;
  Book.bookReviewDELETE(id,reviewID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.bookReviewGET = function bookReviewGET (req, res, next) {
  var id = req.swagger.params['id'].value;
  Book.bookReviewGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.bookReviewPOST = function bookReviewPOST (req, res, next) {
  var id = req.swagger.params['id'].value;
  var userID = req.swagger.params['userID'].value;
  var body = req.swagger.params['body'].value;
  Book.bookReviewPOST(id,userID,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.bookSearchGET = function bookSearchGET (req, res, next) {
  var query = req.swagger.params['query'].value;
  var isbn = req.swagger.params['isbn'].value;
  var genre = req.swagger.params['genre'].value;
  var year = req.swagger.params['year'].value;
  var author = req.swagger.params['author'].value;
  var author_id = req.swagger.params['author_id'].value;
  var publisher = req.swagger.params['publisher'].value;
  var publisher_id = req.swagger.params['publisher_id'].value;
  var theme = req.swagger.params['theme'].value;
  Book.bookSearchGET(query,isbn,genre,year,author,author_id,publisher,publisher_id,theme)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
