'use strict';

var utils = require('../utils/writer.js');
var User = require('../service/UserService');

module.exports.bookReviewsGET = function bookReviewsGET (req, res, next) {
  var id = req.swagger.params['id'].value;
  User.bookReviewsGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userLoginPOST = function userLoginPOST (req, res, next) {
  var username = req.swagger.params['username'].value;
  var password = req.swagger.params['password'].value;
  User.userLoginPOST(username,password)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userLogoutGET = function userLogoutGET (req, res, next) {
  User.userLogoutGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userRegisterPOST = function userRegisterPOST (req, res, next) {
  var id = req.swagger.params['id'].value;
  var name = req.swagger.params['name'].value;
  var address = req.swagger.params['address'].value;
  var creditcard = req.swagger.params['creditcard'].value;
  User.userRegisterPOST(id,name,address,creditcard)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
