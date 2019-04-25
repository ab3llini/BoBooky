'use strict';

var utils = require('../utils/writer.js');
var Address = require('../service/AddressService');

module.exports.userAddressDELETE = function userAddressDELETE (req, res, next) {
  var id = req.swagger.params['id'].value;
  var addressID = req.swagger.params['addressID'].value;
  Address.userAddressDELETE(id,addressID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userAddressGET = function userAddressGET (req, res, next) {
  var id = req.swagger.params['id'].value;
  Address.userAddressGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userAddressPOST = function userAddressPOST (req, res, next) {
  var id = req.swagger.params['id'].value;
  var body = req.swagger.params['body'].value;
  Address.userAddressPOST(id,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userAddressPUT = function userAddressPUT (req, res, next) {
  var id = req.swagger.params['id'].value;
  var addressID = req.swagger.params['addressID'].value;
  var body = req.swagger.params['body'].value;
  Address.userAddressPUT(id,addressID,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
