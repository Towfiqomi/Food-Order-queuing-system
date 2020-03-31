#!/usr/bin/env node
// Post a new task to the work queue
// in our case an order for a sandwich

'use strict';

var amqp = require('amqplib');

module.exports.addTask = function(rabbitHost, queueName, order){
  amqp.connect('amqp://' + rabbitHost)
  .then(function(c) {
    c.createConfirmChannel()
    .then(function(ch) {
      ch.assertQueue(queueName, {durable: true});
      ch.sendToQueue(queueName, new Buffer.from(JSON.stringify(order)), {},
      function(err, ok) {
        if (err !== null)
        console.warn(new Date(), 'Message nacked!');
        else
        console.log(new Date(), 'Message acked');
      });
    });
  });
}
