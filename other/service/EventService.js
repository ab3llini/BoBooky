'use strict';


/**
 * Get the complete list of events
 *
 * returns List
 **/
exports.eventGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "name" : "name",
  "description" : "description",
  "image_urls" : [ "image_urls", "image_urls" ],
  "location" : {
    "country" : "country",
    "cap" : 6,
    "city" : "city",
    "name" : "name",
    "address_line_1" : "address_line_1",
    "id" : 0,
    "address_line_2" : "address_line_2"
  },
  "id" : 0,
  "timestamp" : "2000-01-23T04:56:07.000+00:00"
}, {
  "name" : "name",
  "description" : "description",
  "image_urls" : [ "image_urls", "image_urls" ],
  "location" : {
    "country" : "country",
    "cap" : 6,
    "city" : "city",
    "name" : "name",
    "address_line_1" : "address_line_1",
    "id" : 0,
    "address_line_2" : "address_line_2"
  },
  "id" : 0,
  "timestamp" : "2000-01-23T04:56:07.000+00:00"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get event for a given id
 *
 * id String 
 * returns Event
 **/
exports.eventIdGET = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "name" : "name",
  "description" : "description",
  "image_urls" : [ "image_urls", "image_urls" ],
  "location" : {
    "country" : "country",
    "cap" : 6,
    "city" : "city",
    "name" : "name",
    "address_line_1" : "address_line_1",
    "id" : 0,
    "address_line_2" : "address_line_2"
  },
  "id" : 0,
  "timestamp" : "2000-01-23T04:56:07.000+00:00"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Update an event
 *
 * id String 
 * body Event 
 * no response value expected for this operation
 **/
exports.eventIdPUT = function(id,body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Add new event
 *
 * body Event 
 * no response value expected for this operation
 **/
exports.eventPOST = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Search for an event
 *
 * query_string String The search query (optional)
 * name String The name of the event (optional)
 * author_name String The name of the author for the event (optional)
 * author_id Integer The id of the author for the event (optional)
 * book_name String  (optional)
 * book_id Integer  (optional)
 * date date  (optional)
 * date_from date  (optional)
 * date_to date  (optional)
 * location String  (optional)
 * returns List
 **/
exports.eventSearchGET = function(query_string,name,author_name,author_id,book_name,book_id,date,date_from,date_to,location) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "name" : "name",
  "description" : "description",
  "image_urls" : [ "image_urls", "image_urls" ],
  "location" : {
    "country" : "country",
    "cap" : 6,
    "city" : "city",
    "name" : "name",
    "address_line_1" : "address_line_1",
    "id" : 0,
    "address_line_2" : "address_line_2"
  },
  "id" : 0,
  "timestamp" : "2000-01-23T04:56:07.000+00:00"
}, {
  "name" : "name",
  "description" : "description",
  "image_urls" : [ "image_urls", "image_urls" ],
  "location" : {
    "country" : "country",
    "cap" : 6,
    "city" : "city",
    "name" : "name",
    "address_line_1" : "address_line_1",
    "id" : 0,
    "address_line_2" : "address_line_2"
  },
  "id" : 0,
  "timestamp" : "2000-01-23T04:56:07.000+00:00"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

