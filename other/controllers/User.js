'use strict';

var utils = require('../utils/writer.js');
var User = require('../service/UserService');

module.exports.userAddressDELETE = function userAddressDELETE (req, res, next) {
  var id = req.user.id;
  var addressID = req.swagger.params['addressID'].value;
  User.userAddressDELETE(id,addressID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userAddressGET = function userAddressGET (req, res, next) {
  var id = req.user.id;
  User.userAddressGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userAddressPOST = function userAddressPOST (req, res, next) {
  var id = req.user.id;
  var body = req.swagger.params['body'].value;
  User.userAddressPOST(id,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userAddressPUT = function userAddressPUT (req, res, next) {
  var id = req.user.id;
  var addressID = req.swagger.params['addressID'].value;
  var body = req.swagger.params['body'].value;
  User.userAddressPUT(id,addressID,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userChartDELETE = function userChartDELETE (req, res, next) {
  var id = req.user.id;
  User.userChartDELETE(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userChartGET = function userChartGET (req, res, next) {
  var id = req.user.id;
  User.userChartGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userChartPUT = function userChartPUT (req, res, next) {
  var id = req.user.id;
  var body = req.swagger.params['body'].value;
  User.userChartPUT(id,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userLoginPOST = function userLoginPOST (req, res, next) {
  var body = req.swagger.params['body'].value;
  User.userLoginPOST(body)
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

module.exports.userOrderGET = function userOrderGET (req, res, next) {
  var id = req.user.id;
  var offset = req.swagger.params['offset'].value;
  var limit = req.swagger.params['limit'].value;
  User.userOrderGET(id,offset,limit)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userRegisterPOST = function userRegisterPOST (req, res, next) {
  var body = req.swagger.params['body'].value;
  User.userRegisterPOST(body)
    .then(function (response) {
      utils.writeJson(res, utils.respondWithCode(200, 'registration successful'));
    })
    .catch(function (response) {
      utils.writeJson(res, utils.respondWithCode(401, 'unable to register user'));
    });
};

module.exports.userWhishlistDELETE = function userWhishlistDELETE (req, res, next) {
  var id = req.user.id;
  var bookID = req.swagger.params['bookID'].value;
  User.userWhishlistDELETE(id,bookID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userWhishlistGET = function userWhishlistGET (req, res, next) {
  var id = req.user.id;
  User.userWhishlistGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userWhishlistPOST = function userWhishlistPOST (req, res, next) {
  var id = req.user.id;
  var book_id = req.swagger.params['book_id'].value;
  User.userWhishlistPOST(id,book_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
