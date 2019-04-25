'use strict';

var utils = require('../utils/writer.js');
var Review = require('../service/ReviewService');

module.exports.authorReviewDELETE = function authorReviewDELETE (req, res, next) {
  var id = req.swagger.params['id'].value;
  var reviewID = req.swagger.params['reviewID'].value;
  Review.authorReviewDELETE(id,reviewID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.authorReviewGET = function authorReviewGET (req, res, next) {
  var id = req.swagger.params['id'].value;
  Review.authorReviewGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.authorReviewPOST = function authorReviewPOST (req, res, next) {
  var id = req.swagger.params['id'].value;
  var userID = req.swagger.params['userID'].value;
  var body = req.swagger.params['body'].value;
  Review.authorReviewPOST(id,userID,body)
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
  Review.bookReviewDELETE(id,reviewID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.bookReviewGET = function bookReviewGET (req, res, next) {
  var id = req.swagger.params['id'].value;
  Review.bookReviewGET(id)
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
  Review.bookReviewPOST(id,userID,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
