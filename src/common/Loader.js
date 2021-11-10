
/*
  Loader to run express app.
*/

class Loader {
  static setParser(app, pName) {
    const parserModule = require(pName);

    app.use(parserModule.json({limit: '50mb'}));
    app.use(parserModule.urlencoded({limit: '50mb', extended: true }));
  }

  static setLogger(app, mName) {
    const logModule = require(mName);

    logModule(app);
  }

  static setRouter(app, routerDir) {
    app.use('/', require(routerDir));
  }

  static setErrorHandler(app, handlerDir) {
    const errorHandler = require(handlerDir);

    app.use(errorHandler)
  }

  static setSwagger(app, handleDir) {
    const { swaggerUi, specs } = require(handleDir);

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  static load(app) {
    
    Loader.setParser(app, 'body-parser');
    Loader.setLogger(app, 'morgan-body');
    Loader.setRouter(app, '../routers');
    
    Loader.setSwagger(app, '../docs/swagger.js');

    Loader.setErrorHandler(app, '../common/CustomErrorHandler');
  }
}

module.exports = Loader;