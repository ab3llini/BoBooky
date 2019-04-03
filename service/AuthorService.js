'use strict';


/**
 * List all the authors in the database
 *
 * offset Integer Page offset. Defaults to 0 (optional)
 * limit Integer Result limit. Defaults to 20, max 500. (optional)
 * returns List
 **/
exports.authorGET = function(offset,limit) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "period" : "period",
  "image_url" : "image_url",
  "name" : "name",
  "type" : [ "type", "type" ]
}, {
  "period" : "period",
  "image_url" : "image_url",
  "name" : "name",
  "type" : [ "type", "type" ]
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Fetch a specific author
 *
 * id String 
 * returns Author
 **/
exports.authorIdGET = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "period" : "period",
  "image_url" : "image_url",
  "name" : "name",
  "type" : [ "type", "type" ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

