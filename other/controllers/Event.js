'use strict';

var utils = require('../utils/writer.js');
var Event = require('../service/EventService');

module.exports.eventGET = function eventGET (req, res, next) {
  Event.eventGET()
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
};

module.exports.eventIdGET = function eventIdGET (req, res, next) {
  var id = req.swagger.params['id'].value;
  Event.eventIdGET(id)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
};

module.exports.eventSearchGET = function eventSearchGET (req, res, next) {
  var query_string = req.swagger.params['query_string'].value;
  var name = req.swagger.params['name'].value;
  var author_name = req.swagger.params['author_name'].value;
  var author_id = req.swagger.params['author_id'].value;
  var book_name = req.swagger.params['book_name'].value;
  var book_id = req.swagger.params['book_id'].value;
  var date = req.swagger.params['date'].value;
  var date_from = req.swagger.params['date_from'].value;
  var date_to = req.swagger.params['date_to'].value;
  var location = req.swagger.params['Location'].value;
  Event.eventSearchGET(query_string,name,author_name,author_id,book_name,book_id,date,date_from,date_to,location)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
};
