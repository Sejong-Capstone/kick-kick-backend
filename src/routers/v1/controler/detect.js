const router = require("express").Router();
const { Response, StatusCode, Request } = require('../../../common');
const services = require("../services");

/*
  내 detected list 조회
*/
router.get('/:fk_camera_id', async (req, res, next) => {
  const { token } = req.headers;
  const { fk_camera_id } = Request.params(req);

  try {  
    const fk_user_id = await services.user.getPkFromToken({ token });
    
    const result = await services.detect.findAll({ fk_user_id, fk_camera_id });
    
    return Response.send(res, StatusCode.OK, result);
  } catch (err) {
    return Response.send(res, StatusCode.CONFLICT, err.toString());
  }
})

/*
  detect 요청
*/
router.post('/:cameraId', async (req, res, next) => {
  const { token } = req.headers;
  const { image } = Request.body(req);
  fk_user_id, fk_camera_id, isDetected, image
  try {
    const fk_user_id = await services.user.getPkFromToken({ token });

    const result = await services.camera.create({ cameraName, location, fk_user_id: id });
    
    return Response.send(res, StatusCode.OK, result);
  } catch (err) {
    return Response.send(res, StatusCode.CONFLICT, err.toString());
  }
})

/*
  내 camera 삭제
*/
router.delete('/:detected_image_id', async (req, res, next) => {
  const { token } = req.headers;
  const { detected_image_id } = Request.params(req);

  try {
    const fk_user_id = await services.user.getPkFromToken({ token });

    const result = await services.camera.delete({ detected_image_id, fk_user_id });
    
    return Response.send(res, StatusCode.OK, result);
  } catch (err) {
    return Response.send(res, StatusCode.CONFLICT, err.toString());
  }
})
module.exports = router;