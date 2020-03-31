'use strict';

var utils = require('../utils/writer.js');
var Order = require('../service/OrderService');

module.exports.addOrder = function addOrder (req, res, next) {
  var order = req.swagger.params['order'].value;
  Order.addOrder(order)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getOrderById = function getOrderById (req, res, next) {
  var orderId = req.swagger.params['orderId'].value;
  Order.getOrderById(orderId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getOrders = function getOrders (req, res, next) {
  Order.getOrders()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (error) {
      utils.writeJson(res, {
        error: error
      }, 400);
    });
};
