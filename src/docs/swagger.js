const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "kick-kick-Server api docs",
      version: "2.0.0",
      description: "kick-kick-Server with Swagger",
      contact: {
        name: "HyeonbaeLee",
        email: "hyeon5727@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:65535/v1",
        description: 'local server'
      },
    ],
  },
  apis: ["./src/routers/v1/controler/*.js", "./src/docs/*"],
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs
};