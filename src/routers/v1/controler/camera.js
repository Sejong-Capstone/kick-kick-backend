const router = require("express").Router();
const { Response, StatusCode, Request } = require('../../../common');
const services = require("../services");

router.get('/', async (req, res, next) => {
  const { token } = req.headers;

  try {  
    const id = await services.user.getPkFromToken({ token });
    
    const result = await services.camera.findAll();
    
    return Response.send(res, StatusCode.OK, result);
  } catch (err) {
    return Response.send(res, StatusCode.CONFLICT, err.toString());
  }
})

router.post('/login', async (req, res, next) => {
  const { userId, password } = Request.body(req);
  try {
    const result = await services.user.login({ userId, password });
    
    return Response.send(res, StatusCode.OK, result);
  } catch (err) {
    return Response.send(res, StatusCode.CONFLICT, err.toString());
  }
})

router.get('/me', async (req, res, next) => {
  const { token } = req.headers;
  
  try {
    const id = await services.user.getPkFromToken({ token });
    const result = await services.user.me({ id });

    return Response.send(res, StatusCode.OK, result);
  } catch (err) {
    return Response.send(res, StatusCode.CONFLICT, err.toString());
  }
})

router.get('/logout', async (req, res, next) => {
  const { token } = req.headers;
  
  try {
    const id = await services.user.getPkFromToken({ token });
    const result = await services.user.logout({ id });

    return Response.send(res, StatusCode.OK, result);
  } catch (err) {
    return Response.send(res, StatusCode.CONFLICT, err.toString());
  }
})

 router.post('/signup', async (req, res, next) => {
  try {
    const { userId, name, password, email } = Request.body(req);
    console.log(Request.body(req));
    const result = await services.user.signup({ userId, name, password, email });
    
    return Response.send(res, StatusCode.CREATED, result);
  } catch (err) {
    return Response.send(res, StatusCode.CONFLICT, err.toString());
  }
})

module.exports = router;