'use strict';

let db = require('../db/Database');



/**
 * Get the complete list of events
 *
 * @returns List
 **/
exports.eventGET = function() {
  return db.execute(db.eventGET, [])
};


/**
 * Delete an event
 *
 * @param id is the identifier of the event
 * no response value expected for this operation
 **/
exports.eventIdDELETE = function(id) {
  //TODO:
  return new Promise(function(resolve, reject) {
    resolve();
  });
};


/**
 * Get event for a given id
 *
 * @param id is the identifier of the event
 * @returns Event
 **/
exports.eventIdGET = function(id) {
  return db.execute(db.eventIdGET, [id])
};


/**
 * Update an event
 *
 * id String 
 * body Event 
 * no response value expected for this operation
 **/
exports.eventIdPUT = function(id,body) {
  //TODO:
  return new Promise(function(resolve, reject) {
    resolve();
  });
};


/**
 * Add new event
 *
 * body Event 
 * no response value expected for this operation
 **/
exports.eventPOST = function(body) {
  //TODO:
  return new Promise(function(resolve, reject) {
    resolve();
  });
};


/**
 * Search for an event
 *
 * @param query_string String The search query (optional)
 * @param name String The name of the event (optional)
 * @param author_name String The name of the author for the event (optional)
 * @param author_id Integer The id of the author for the event (optional)
 * @param book_name String  (optional)
 * @param book_id Integer  (optional)
 * @param date date  (optional)
 * @param date_from date  (optional)
 * @param date_to date  (optional)
 * @param location String  (optional)
 * @returns List
 **/
exports.eventSearchGET = function(query_string,name,author_name,author_id,book_name,book_id,date,date_from,date_to,location) {
  return db.execute(db.eventSearchGET,
      [query_string,name,author_name,author_id,book_name,book_id,date,date_from,date_to,location])
};

