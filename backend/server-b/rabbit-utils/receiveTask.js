#!/usr/bin/env node
// Process tasks from the work queue
// in our case an order for a sandwich

'use strict';
var amqp = require('amqplib');

module.exports.getTask = function(rabbitHost, queueName, sendReply){
  amqp.connect('amqp://' + rabbitHost).then(function(conn) {
    process.once('SIGINT', function() { conn.close(); });
    return conn.createChannel().then(function(ch) {
      var ok = ch.assertQueue(queueName, {durable: true});
      ok = ok.then(function() { ch.prefetch(1); });
      ok = ok.then(function() {
        ch.consume(queueName, doWork, {noAck: false});
        console.log(new Date(), " [*] Waiting for messages. To exit press CTRL+C");
      });
      return ok;

      function doWork(msg) {
        var body = msg.content.toString();
        console.log(" [x] Received '%s'", body);
        let order_info = JSON.parse(msg.content);
        order_info.status = "ready";
        console.log(order_info);
        //console.log(" [x] Task takes %d seconds", secs);
        setTimeout(function() {
          console.log(new Date(), " [x] Done");
          ch.ack(msg);
          // Reply to the message
          sendReply(order_info);
        }, 1000);
      }
    });
  }).catch(console.warn);
}
