#!/usr/bin/env node
// Post a new task to the work queue
// in our case an order for a sandwich

'use strict';

let amqp = require('amqplib');
let Order = require('../service/OrderService');

module.exports.addTask = function(rabbitHost, queueName, order){
    amqp.connect('amqp://' + rabbitHost)
        .then(function(c) {
            c.createConfirmChannel()
                .then(function(ch) {
                    //creating a queue if doesn't exists
                    ch.assertQueue(queueName, {durable: true});
                    //send message to the receive order queue
                    ch.sendToQueue(queueName, new Buffer.from(JSON.stringify(order)), {},
                        function(err, ok) {
                            console.log("found order from JSON to RabbitMQ");
                            let order_id = order._id;
                            let status;
                            if (err !== null){
                                console.warn(new Date(), 'Message nacked!');
                                status = "failed";
                            }
                            else {
                                console.log(new Date(), 'Message acked');
                                status = "inQueue";
                            }

                            Order.updateOrder(order_id, {status: status})
                                .then(function (response) {
                                    console.log("Order updated", response);
                                }).catch(function (error) {
                                    console.log("Order update failed", error);
                                });
                        });
                });
        }).catch((error) => {
            console.log(error,'Promise error');
        });
};
