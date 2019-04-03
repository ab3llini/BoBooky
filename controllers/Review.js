'use strict';

var utils = require('../utils/writer.js');
var Review = require('../service/ReviewService');

module.exports.addReviewPOST = function addReviewPOST (req, res, next) {
  var id = req.swagger.params['id'].value;
  var body = req.swagger.params['body'].value;
  Review.addReviewPOST(id,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
