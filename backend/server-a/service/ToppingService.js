'use strict';
let Topping = require('../db/Topping');

/**
 * Add a new sandwich to the store. Needs an API key.
 *
 * body Sandwich Sandwich object that needs to be added to the store
 * no response value expected for this operation
 **/
exports.addTopping = function(body) {
    return new Promise(function(resolve, reject) {
        const new_topping = new Topping.Topping({name: body.name});
        new_topping.save().then((body) => {
            resolve(body);
        }).catch((err) => {
            reject(err);
        });
    });
};


/**
 * Get a topping. Empty if no topping is found.
 *
 * returns object
 **/
exports.getToppingByName = function(name) {
    return new Promise(function(resolve, reject) {
        Topping.Topping.find({name: name}, function (err, topping) {
            if (err) {
                reject(err);
                return;
            }
            resolve(topping);
        });
    });
};


/**
 * Get all toppings. Empty array if no topping is found.
 *
 * returns an array
 **/
exports.getToppings = function() {
    return new Promise(function(resolve, reject) {
        Topping.Topping.find(function (err, toppings) {
            if (err) {
                reject(err);
                return;
            }
            resolve(toppings);
        });
    });
};