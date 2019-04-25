'use strict';

var utils = require('../utils/writer.js');
var Chart = require('../service/ChartService');

module.exports.userChartDELETE = function userChartDELETE (req, res, next) {
  var id = req.swagger.params['id'].value;
  Chart.userChartDELETE(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.userChartGET = function userChartGET (req, res, next) {
  var id = req.swagger.params['id'].value;
  Chart.userChartGET(id)
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
  Chart.userChartPUT(id,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
