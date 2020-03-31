'use strict';

var utils = require('../utils/writer.js');
var Sandwich = require('../service/SandwichService');

module.exports.addSandwich = function addSandwich (req, res, next) {
  var body = req.swagger.params['body'].value;
  Sandwich.addSandwich(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteSandwich = function deleteSandwich (req, res, next) {
  var sandwichId = req.swagger.params['sandwichId'].value;
  var api_key = req.swagger.params['api_key'].value;
  Sandwich.deleteSandwich(sandwichId,api_key)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getSandwichById = function getSandwichById (req, res, next) {
  var sandwichId = req.swagger.params['sandwichId'].value;
  Sandwich.getSandwichById(sandwichId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getSandwiches = function getSandwiches (req, res, next) {
  Sandwich.getSandwiches()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateSandwich = function updateSandwich (req, res, next) {
  var sandwichId = req.swagger.params['sandwichId'].value;
  var body = req.swagger.params['body'].value;
  Sandwich.updateSandwich(sandwichId,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
