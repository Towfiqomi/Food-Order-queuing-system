#!/usr/bin/env node
// Process tasks from the work queue

'use strict';

var amqp = require('amqplib');
var Order = require('../service/OrderService');

module.exports.getTask = function(rabbitHost, queueName){
    amqp.connect('amqp://' + rabbitHost).then(function(conn) {
        process.once('SIGINT', function() { conn.close(); });
        return conn.createChannel().then(function(ch) {
            var ok = ch.assertQueue(queueName, {durable: true});
            ok = ok.then(function() { ch.prefetch(1); });
            ok = ok.then(function() {
                ch.consume(queueName, doWork, {noAck: false});
                console.log(" [*] Waiting for messages. To exit press CTRL+C");
            });
            return ok;

            function doWork(msg) {
                var body = msg.content.toString();
                console.log(" [x] Received in Server A: '%s'", body);

                let old_order = JSON.parse(body);
                Order.updateOrder(old_order._id, {status: 'ready'})
                    .then(function (response) {
                        console.log("Order updated in Server A", response);
                    }).catch(function (error) {
                    console.log("Order update failed in Server A", error);
                });

                var secs = body.split('.').length - 1;
                //console.log(" [x] Task takes %d seconds", secs);
                setTimeout(function() {
                    console.log(" [x] Done");
                    ch.ack(msg);
                }, secs * 3000);
            }
        });
    }).catch(console.warn);
}
