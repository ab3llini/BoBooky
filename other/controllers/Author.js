'use strict';

var utils = require('../utils/writer.js');
var Author = require('../service/AuthorService');

module.exports.authorGET = function authorGET (req, res, next) {
  var offset = req.swagger.params['offset'].value;
  var limit = req.swagger.params['limit'].value;
  Author.authorGET(offset,limit)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.authorIdGET = function authorIdGET (req, res, next) {
  var id = req.swagger.params['id'].value;
  Author.authorIdGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.authorReviewDELETE = function authorReviewDELETE (req, res, next) {
  var id = req.swagger.params['id'].value;
  var reviewID = req.swagger.params['reviewID'].value;
  var userID = req.user.id;
  Author.authorReviewDELETE(id,reviewID,userID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.authorReviewGET = function authorReviewGET (req, res, next) {
  var id = req.swagger.params['id'].value;
  Author.authorReviewGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.authorReviewPOST = function authorReviewPOST (req, res, next) {
  var id = req.swagger.params['id'].value;
  var userID = req.user.id;
  var body = req.swagger.params['body'].value;
  Author.authorReviewPOST(id,userID,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
