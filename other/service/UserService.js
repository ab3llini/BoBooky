'use strict';

let db = require('../db/Database');


/**
 * Delete an existing address for the user
 *
 * @param id The id of the user
 * @param addressID Integer The id of the address to be removed
 * no response value expected for this operation
 **/
exports.userAddressDELETE = function(id,addressID) {
    return db.execute(db.userAddressDELETE, [id, addressID])
};


/**
 * Get the list of addresses for the user
 *
 * @param id is the id of the user
 * @returns List of addresses
 **/
exports.userAddressGET = function(id) {
    return db.execute(db.userAddressGET, [id])
};


/**
 * Add new address for the user
 *
 * @param id Is the id of the user
 * @param body object that contains all the information about the Address
 * no response value expected for this operation
 **/
exports.userAddressPOST = function(id, body) {
    return db.execute(db.userAddressPOST(id, body))
};


/**
 * Update an existing address
 *
 * @param id is the id of the user
 * @param addressID Integer The identifier for the address to update
 * @param body contains all the information about the Address updated
 * no response value expected for this operation
 **/
exports.userAddressPUT = function(id,addressID,body) {
    return db.execute(db.userAddressPUT, [id, body])
};


/**
 * Delete the current chart
 *
 * @param id the if of the user
 * no response value expected for this operation
 **/
exports.userChartDELETE = function(id) {
    return db.execute(db.userChartDELETE, [id])
};


/**
 * Get the user's current chart
 *
 * @param id id of the user
 * @returns Chart
 **/
exports.userChartGET = function(id) {
    return db.execute(db.userChartGET, [id])
};


/**
 * Updates the current chart
 *
 * @param id is the id of the user
 * @param body is an object with bookID and qty
 * no response value expected for this operation
 **/
exports.userChartPUT = function(id,body) {
    return db.execute(db.userChartPUT, [id, body])
};


/**
 * Login
 * Login with a form
 *
 * body Body
 * no response value expected for this operation
 **/
exports.userLoginPOST = function(body) {
    //TODO: Manage event for login successful / rejected
    db.execute(db.userLoginPOST, [body])
};


/**
 * Logs out the current user session
 * Logout
 *
 * no response value expected for this operation
 **/
exports.userLogoutGET = function() {
    //TODO
    return new Promise(function(resolve, reject) {
        resolve();
    });
};


/**
 * Get the orders for a given user
 *
 * id String
 * no response value expected for this operation
 **/
exports.userOrderGET = function(id, offset=0, limit=10) {
    return db.execute(db.userOrderGET, [id, offset, limit])
};


/**
 * Registration
 * Register into the bookstore
 *
 * body User
 * no response value expected for this operation
 **/
exports.userRegisterPOST = function(body) {
    return db.execute(db.userRegisterPOST, [body])
};


/**
 * Removes one book from the whishlist
 *
 * id String
 * bookID Integer The id of the book to be removed from the whishlist
 * no response value expected for this operation
 **/
exports.userWhishlistDELETE = function(id,bookID) {
    //TODO
    return new Promise(function(resolve, reject) {
        resolve();
    });
};


/**
 * Get the list of books in the whishlist
 *
 * id String
 * returns List
 **/
exports.userWhishlistGET = function(id) {
    //TODO
    return new Promise(function(resolve, reject) {
        var examples = {};
        examples['application/json'] = [ "{\n  id: 0,\n  title: \"Il deserto dei tartari\",\n  author: \"Dino Buzzati\",\n  price: {\n    value: 10,\n    currency: \"eur\"\n  },\n  image_url: \"https://test.com\"\n}", "{\n  id: 0,\n  title: \"Il deserto dei tartari\",\n  author: \"Dino Buzzati\",\n  price: {\n    value: 10,\n    currency: \"eur\"\n  },\n  image_url: \"https://test.com\"\n}" ];
        if (Object.keys(examples).length > 0) {
            resolve(examples[Object.keys(examples)[0]]);
        } else {
            resolve();
        }
    });
};

