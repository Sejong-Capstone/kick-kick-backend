const { CustomError } = require('./CustomErrors');
const { Response } = require('./Adapter');
const PrettyConsole = require('./PrettyConsole');

const CustomErrorHandler = (err, req, res, next) => {
  
  if (err instanceof CustomError) {
    const { status_code } = err;

    PrettyConsole.print('CustomError', err);

    Response.send(res, status_code, err);
  } else {
    PrettyConsole.print('Not-CustomError', err);
    
    next(err);
  }
}

module.exports = CustomErrorHandler;