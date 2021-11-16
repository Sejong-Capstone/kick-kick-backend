const router = require("express").Router();
const { Response, StatusCode, Request } = require('../../../common');
const services = require("../services");

/*
  내 camera list 조회
*/
router.get('/', async (req, res, next) => {
  const { token } = req.headers;

  try {  
    const id = await services.user.getPkFromToken({ token });
    
    const result = await services.camera.filterByUserId({ fk_user_id: id });
    
    return Response.send(res, StatusCode.OK, result);
  } catch (err) {
    return Response.send(res, StatusCode.CONFLICT, err.toString());
  }
})

/*
  내 camera 추가
*/
router.post('/', async (req, res, next) => {
  const { token } = req.headers;
  const { cameraName, location } = Request.body(req);

  try {
    const id = await services.user.getPkFromToken({ token });

    const result = await services.camera.create({ cameraName, location, fk_user_id: id });
    
    return Response.send(res, StatusCode.OK, result);
  } catch (err) {
    return Response.send(res, StatusCode.CONFLICT, err.toString());
  }
})

/*
  내 camera 수정
*/
router.put('/:cameraId', async (req, res, next) => {
  const { token } = req.headers;
  const { cameraId } = Request.params(req);
  const { cameraName, location } = Request.body(req);

  try {
    const id = await services.user.getPkFromToken({ token });

    const result = await services.camera.update({ cameraId, cameraName, location, fk_user_id: id });
    
    return Response.send(res, StatusCode.OK, result);
  } catch (err) {
    return Response.send(res, StatusCode.CONFLICT, err.toString());
  }
})


/*
  내 camera 삭제
*/
router.delete('/:cameraId', async (req, res, next) => {
  const { token } = req.headers;
  const { cameraId } = Request.params(req);

  try {
    const id = await services.user.getPkFromToken({ token });

    const result = await services.camera.delete({ id: cameraId, fk_user_id: id });
    
    return Response.send(res, StatusCode.OK, result);
  } catch (err) {
    return Response.send(res, StatusCode.CONFLICT, err.toString());
  }
})
module.exports = router;