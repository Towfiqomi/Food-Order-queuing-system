var sendTask = require('./rabbit-utils/sendTask');
var receiveTask = require('./rabbit-utils/receiveTask');

var rabbitMQHost = "rapid-runner-rabbit:5672";
var orderQueueName = "order-queue";
var completeQueueName = "order-complete-queue";

console.log("Server B starting...");

const sendReply = function(msgBody) {
  console.log(" [x] Replying with '%s'", msgBody);

  // Just send the message back to another queue
  sendTask.addTask(rabbitMQHost, completeQueueName, msgBody);
};

// Start listening to the order queue
console.log("Accessing order queue and pushing message to new queue");
receiveTask.getTask(rabbitMQHost, orderQueueName, sendReply);
