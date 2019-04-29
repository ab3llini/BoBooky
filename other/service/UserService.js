'use strict';


/**
 * Delete an existing address for the user
 *
 * id String
 * addressID Integer The id of the address to be removed
 * no response value expected for this operation
 **/
exports.userAddressDELETE = function(id,addressID) {
    //TODO
    return new Promise(function(resolve, reject) {
        resolve();
    });
};


/**
 * Get the list of addresses for the user
 *
 * id String
 * returns List
 **/
exports.userAddressGET = function(id) {
    //TODO
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
};


/**
 * Add new address for the user
 *
 * id String
 * body Address
 * no response value expected for this operation
 **/
exports.userAddressPOST = function(id,body) {
    //TODO
    return new Promise(function(resolve, reject) {
        resolve();
    });
};


/**
 * Update an exsisting address
 *
 * id String
 * addressID Integer The identifier for the address to update
 * body Address
 * no response value expected for this operation
 **/
exports.userAddressPUT = function(id,addressID,body) {
    //TODO
    return new Promise(function(resolve, reject) {
        resolve();
    });
};


/**
 * Delete the current chart
 *
 * id String
 * no response value expected for this operation
 **/
exports.userChartDELETE = function(id) {
    //TODO
    return new Promise(function(resolve, reject) {
        resolve();
    });
};


/**
 * Get the user's current chart
 *
 * id String
 * returns Chart
 **/
exports.userChartGET = function(id) {
    //TODO
    return new Promise(function(resolve, reject) {
        var examples = {};
        examples['application/json'] = "{\n  OrderID: 123456789,\n  User: \n  {\n   id: 1,\n   name: \"Alan\",\n   surname: \"Turing\",\n   email: \"alan.turing@example.com\"\n   birthdate: \"1989-01-01\"\n}\n  Books: [\n  {\n  id: 0,\n  title: \"Il deserto dei tartari\",\n  author: \"Dino Buzzati\",\n  price: {\n    value: 10,\n    currency: \"eur\"\n  }\n\n},\n{\n  id: 1,\n  title: \"Il deserto dei tartari\",\n  author: \"Dino Buzzati\",\n  price: {\n    value: 10,\n    currency: \"eur\"\n  }\n}\n  ]\n}";
        if (Object.keys(examples).length > 0) {
            resolve(examples[Object.keys(examples)[0]]);
        } else {
            resolve();
        }
    });
};


/**
 * Updates the current chart
 *
 * id String
 * body Body_1
 * no response value expected for this operation
 **/
exports.userChartPUT = function(id,body) {
    //TODO
    return new Promise(function(resolve, reject) {
        resolve();
    });
};


/**
 * Login
 * Login with a form
 *
 * body Body
 * no response value expected for this operation
 **/
exports.userLoginPOST = function(body) {
    //TODO
    return new Promise(function(resolve, reject) {
        resolve();
    });
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
exports.userOrderGET = function(id,offset,limit) {
    //TODO
    return new Promise(function(resolve, reject) {
        var examples = {};
        examples['application/json'] = [ "{\n  OrderID: 123456789,\n  User: \n  {\n   id: 1,\n   name: \"Alan\",\n   surname: \"Turing\",\n   email: \"alan.turing@example.com\"\n   birthdate: \"1989-01-01\"\n}\n  Books: [\n  {\n  id: 0,\n  title: \"Il deserto dei tartari\",\n  author: \"Dino Buzzati\",\n  price: {\n    value: 10,\n    currency: \"eur\"\n  }\n\n},\n{\n  id: 1,\n  title: \"Il deserto dei tartari\",\n  author: \"Dino Buzzati\",\n  price: {\n    value: 10,\n    currency: \"eur\"\n  }\n}\n  ]\n}", "{\n  OrderID: 123456789,\n  User: \n  {\n   id: 1,\n   name: \"Alan\",\n   surname: \"Turing\",\n   email: \"alan.turing@example.com\"\n   birthdate: \"1989-01-01\"\n}\n  Books: [\n  {\n  id: 0,\n  title: \"Il deserto dei tartari\",\n  author: \"Dino Buzzati\",\n  price: {\n    value: 10,\n    currency: \"eur\"\n  }\n\n},\n{\n  id: 1,\n  title: \"Il deserto dei tartari\",\n  author: \"Dino Buzzati\",\n  price: {\n    value: 10,\n    currency: \"eur\"\n  }\n}\n  ]\n}" ];
        if (Object.keys(examples).length > 0) {
            resolve(examples[Object.keys(examples)[0]]);
        } else {
            resolve();
        }
    });
}


/**
 * Registration
 * Register into the bookstore
 *
 * body User
 * no response value expected for this operation
 **/
exports.userRegisterPOST = function(body) {
    //TODO
    return new Promise(function(resolve, reject) {
        resolve();
    });
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

