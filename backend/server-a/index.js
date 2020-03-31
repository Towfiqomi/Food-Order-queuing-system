'use strict';

let fs = require('fs'),
    path = require('path'),
    http = require('http');

let app = require('connect')();
let swaggerTools = require('swagger-tools');
let jsyaml = require('js-yaml');
let cors = require('cors');

let serverPort = 8080;
let utils = require('./utils/writer.js');
require('./db/db')();


// RabbitMQ
var receiveTask = require('./rabbit-utils/receiveTask');
var rabbitMQHost = "rapid-runner-rabbit:5672";
var completeQueueName = "order-complete-queue";

// MongoDB & Mongoose configuration in separate file
var Order = require('./service/OrderService');


let whitelist = ['http://localhost:3000', 'http://127.0.0.1:8080']
let corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
};

// swaggerRouter configuration
let options = {
  swaggerUi: path.join(__dirname, '/swagger.json'),
  controllers: path.join(__dirname, './controllers'),
  useStubs: process.env.NODE_ENV === 'development' // Conditionally turn on stubs (mock mode)
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
let spec = fs.readFileSync(path.join(__dirname,'api/swagger.yaml'), 'utf8');
let swaggerDoc = jsyaml.safeLoad(spec);

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {
  app.use(cors());
  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

  // Validate Swagger requests
  app.use(middleware.swaggerValidator());

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(options));

  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi());

  // Start the server
  http.createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
  });
});

const updateStatus = function(msgBody) {
  console.log(" [x] Get with '%s'", msgBody);
  var orderId = JSON.parse(msgBody)._id;
  console.log(orderId);
};
receiveTask.getTask(rabbitMQHost, completeQueueName, updateStatus);
