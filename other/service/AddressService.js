'use strict';


/**
 * Delete an existing address for the user
 *
 * id String 
 * addressID Integer The id of the address to be removed
 * no response value expected for this operation
 **/
exports.userAddressDELETE = function(id,addressID) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Get the list of addresses for the user
 *
 * id String 
 * returns List
 **/
exports.userAddressGET = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "country" : "country",
  "cap" : 6,
  "city" : "city",
  "name" : "name",
  "address_line_1" : "address_line_1",
  "id" : 0,
  "address_line_2" : "address_line_2"
}, {
  "country" : "country",
  "cap" : 6,
  "city" : "city",
  "name" : "name",
  "address_line_1" : "address_line_1",
  "id" : 0,
  "address_line_2" : "address_line_2"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Add new address for the user
 *
 * id String 
 * body Address 
 * no response value expected for this operation
 **/
exports.userAddressPOST = function(id,body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Update an exsisting address
 *
 * id String 
 * addressID Integer The identifier for the address to update
 * body Address 
 * no response value expected for this operation
 **/
exports.userAddressPUT = function(id,addressID,body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

