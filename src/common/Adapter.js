class StatusCode {
  static OK = 200;
  static CREATED = 201;
  static ACCEPTED = 202;
  static NO_CONTENT = 204;
  static BAD_REQUEST = 400;
  static UNAUTHORIZED = 401;
  static FORBIDDEN = 403;
  static NOT_FOUND = 404;
  static NOT_ALLOWED = 405;
  static CONFLICT = 409;
  static TOO_MANY_REQUESTS = 429;
  static SERVICE_ERROR = 500;
}

class Response {
  static send(res, status, body, ...params) {
    res.status(status).send(body);
  }
}

class Request {
  

  static params(req) {
    const params = req.params;

    return params;
  }

  static query(req) {
    const query = req.query;

    return query;
  }

  static body(req) {
    const body = req.body;
    
    return body;
  }
}

module.exports = {
  Request, Response, StatusCode
}