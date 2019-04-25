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

module.exports.authorIdDELETE = function authorIdDELETE (req, res, next) {
  var id = req.swagger.params['id'].value;
  Author.authorIdDELETE(id)
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

module.exports.authorIdPUT = function authorIdPUT (req, res, next) {
  var id = req.swagger.params['id'].value;
  var body = req.swagger.params['body'].value;
  Author.authorIdPUT(id,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.authorPOST = function authorPOST (req, res, next) {
  var body = req.swagger.params['body'].value;
  Author.authorPOST(body)
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
  Author.authorReviewDELETE(id,reviewID)
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
  var userID = req.swagger.params['userID'].value;
  var body = req.swagger.params['body'].value;
  Author.authorReviewPOST(id,userID,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
