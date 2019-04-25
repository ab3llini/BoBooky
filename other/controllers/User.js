'use strict';

var utils = require('../utils/writer.js');
var User = require('../service/UserService');

module.exports.userAddressDELETE = function userAddressDELETE (req, res, next) {
  var id = req.swagger.params['id'].value;
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
  var id = req.swagger.params['id'].value;
  User.userAddressGET(id)
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
  User.userAddressPOST(id,body)
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
  User.userAddressPUT(id,addressID,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userChartDELETE = function userChartDELETE (req, res, next) {
  var id = req.swagger.params['id'].value;
  User.userChartDELETE(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userChartGET = function userChartGET (req, res, next) {
  var id = req.swagger.params['id'].value;
  User.userChartGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userChartPUT = function userChartPUT (req, res, next) {
  var id = req.swagger.params['id'].value;
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
  var id = req.swagger.params['id'].value;
  User.userOrderGET(id)
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
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userWhishlistDELETE = function userWhishlistDELETE (req, res, next) {
  var id = req.swagger.params['id'].value;
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
  var id = req.swagger.params['id'].value;
  User.userWhishlistGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
