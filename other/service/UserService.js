'use strict';
let db = require('../db/Database');


/**
 * Delete an existing address for the user
 *
 * addressID Integer The id of the address to be removed
 * no response value expected for this operation
 **/
exports.userAddressDELETE = function(id, addressID) {
  return db.execute(db.userAddressDELETE, [id, addressID])

};


/**
 * Get the list of addresses for the user
 *
 * returns List
 **/
exports.userAddressGET = function(id) {
  return db.execute(db.userAddressGET, [id])

};


/**
 * Add new address for the user
 *
 * body Address 
 * no response value expected for this operation
 **/
exports.userAddressPOST = function(id, body) {
  return db.execute(db.userAddressPOST, [id, body])

};


/**
 * Update an exsisting address
 *
 * addressID Integer The identifier for the address to update
 * body Address 
 * no response value expected for this operation
 **/
exports.userAddressPUT = function(id, addressID, body) {
  return db.execute(db.userAddressPUT, [id, body])

};


/**
 * Delete the current cart
 *
 * no response value expected for this operation
 **/
exports.userChartDELETE = function(id) {
  return db.execute(db.userChartDELETE, [id])

};


/**
 * Get the user's current cart
 *
 * returns Cart
 **/
exports.userChartGET = function(id) {
  return db.execute(db.userChartGET, [id])
};


/**
 * Updates the current cart
 *
 * body Update_cart_request 
 * no response value expected for this operation
 **/
exports.userChartPUT = function(id, body) {
  return db.execute(db.userChartPUT, [id, body])

};


/**
 * Login
 * Login with a form
 *
 * body Login_request 
 * no response value expected for this operation
 **/
exports.userLoginPOST = function(body) {
  db.execute(db.userLoginPOST, [body])

};


/**
 * Logs out the current user session
 * Logout
 *
 * no response value expected for this operation
 **/
exports.userLogoutGET = function() {
  return new Promise(function(resolve, reject) {
    resolve();
  });
};


/**
 * Get the orders for a given user
 *
 * offset Integer  (optional)
 * limit Integer  (optional)
 * returns List
 **/
exports.userOrderGET = function(id, offset,limit) {
  return db.execute(db.userOrderGET, [id, offset, limit])
};

/**
 * Add new order fot the user
 *
 * body Order
 * no response value expected for this operation
 **/
exports.userOrderPOST = function(body, id) {
  return db.execute(db.userOrderPOST, [body, id])
}


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
 * bookID Integer The id of the book to be removed from the whishlist
 * no response value expected for this operation
 **/
exports.userWhishlistDELETE = function(id, bookID) {
  return db.execute(db.userWishlistDELETE, [id, bookID])

};


/**
 * Get the list of books in the whishlist
 *
 * returns List
 **/
exports.userWhishlistGET = function(id) {
  return db.execute(db.userWishlistGET, [id])

};


/**
 * Add a book to the whish list
 *
 * bookID Integer 
 * no response value expected for this operation
 **/
exports.userWhishlistPOST = function(id, bookID) {
  return db.execute(db.userWishlistPOST, [id, bookID])
};

