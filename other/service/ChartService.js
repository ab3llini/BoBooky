'use strict';


/**
 * Delete the current chart
 *
 * id String 
 * no response value expected for this operation
 **/
exports.userChartDELETE = function(id) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Get the user's current chart
 *
 * id String 
 * returns Chart
 **/
exports.userChartGET = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = "{\n  OrderID: 123456789,\n  User: \n  {\n   id: 1,\n   name: \"Alan\",\n   surname: \"Turing\",\n   email: \"alan.turing@example.com\"\n   birthdate: \"1989-01-01\"\n}\n  Books: [\n  {\n  id: 0,\n  title: \"Il deserto dei tartari\",\n  author: \"Dino Buzzati\",\n  price: {\n    value: 10,\n    currency: \"eur\"\n  }\n\n},\n{\n  id: 1,\n  title: \"Il deserto dei tartari\",\n  author: \"Dino Buzzati\",\n  price: {\n    value: 10,\n    currency: \"eur\"\n  }\n}\n  ]\n}";
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Updates the current chart
 *
 * id String 
 * body Body_1 
 * no response value expected for this operation
 **/
exports.userChartPUT = function(id,body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

