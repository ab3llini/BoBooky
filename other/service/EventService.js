'use strict';

let db = require('../db/Database');


/**
 * Get the complete list of events
 *
 * returns List
 **/
exports.eventGET = function() {
  return db.execute(db.eventGET, [])
}


/**
 * Get event for a given id
 *
 * id String 
 * returns Event
 **/
exports.eventIdGET = function(id) {
  return db.execute(db.eventIdGET, [id])
}


/**
 * Search for an event
 *
 * query_string String The search query (optional)
 * name String The name of the event (optional)
 * author_name String The name of the author for the event (optional)
 * authorID Integer The id of the author for the event (optional)
 * book_name String  (optional)
 * bookID Integer  (optional)
 * date date  (optional)
 * date_from date  (optional)
 * date_to date  (optional)
 * location String  (optional)
 * returns List
 **/
exports.eventSearchGET = function(query_string,name,author_name,authorID,book_name,bookID,date,date_from,date_to,location,offset,limit, orderby, extra) {
  return db.execute(db.eventSearchGET,
      [query_string,name,author_name,authorID,book_name,bookID,date,date_from,date_to,location, offset,limit, orderby, extra])
}

