let sendTask = require('../rabbit-utils/sendTask');
let rabbitMQHost = "rapid-runner-rabbit:5672";
let queueOfOrder = "order-queue";

let Order = require('../service/OrderService');

exports.getReceivedOrdersFromJSON = function() {

    // Get orders with "received" status
    Order.getOrderByStatus("received").then((received_orders) => {
        console.log(received_orders);
        for(let i = 0; i < received_orders.length; i++) {
            let obj = received_orders[i];
            sendTask.addTask(rabbitMQHost, queueOfOrder, obj);
        }
    });

    // Get orders with "inQueue" status
    // let queue_orders = Order.getOrderByStatus("inQueue");
    // if(queue_orders.length > 0){
    //     for(let i = 0; i < queue_orders.length; i++) {
    //         let obj = queue_orders[i];
    //         sendTask.addTask(rabbitMQHost, queueOfOrder, obj);
    //     }
    // }
};
