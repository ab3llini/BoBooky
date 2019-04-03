'use strict';

var utils = require('../utils/writer.js');
var Store = require('../service/StoreService');

module.exports.orderByIdDELETE = function orderByIdDELETE (req, res, next) {
  var id = req.swagger.params['id'].value;
  var userId = req.swagger.params['userId'].value;
  Store.orderByIdDELETE(id,userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.orderByIdGET = function orderByIdGET (req, res, next) {
  var id = req.swagger.params['id'].value;
  Store.orderByIdGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.orderPOST = function orderPOST (req, res, next) {
  var body = req.swagger.params['body'].value;
  Store.orderPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
