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
router.post('/:fk_camera_id', async (req, res, next) => {
  const { token } = req.headers;
  const { fk_camera_id } = Request.params(req);
  const { image } = Request.body(req);
  
  try {
    const fk_user_id = await services.user.getPkFromToken({ token });
    const result = await services.detect.detectAndCreate({ fk_user_id, fk_camera_id, image });
    
    return Response.send(res, StatusCode.OK, result);
  } catch (err) {
    return Response.send(res, StatusCode.CONFLICT, err.toString());
  }
})

/*
  detect 삭제
*/
router.delete('/:detected_image_id', async (req, res, next) => {
  const { token } = req.headers;
  const { detected_image_id } = Request.params(req);

  try {
    const fk_user_id = await services.user.getPkFromToken({ token });

    const result = await services.detect.delete({ detected_image_id, fk_user_id });
    
    return Response.send(res, StatusCode.OK, result);
  } catch (err) {
    return Response.send(res, StatusCode.CONFLICT, err.toString());
  }
})

module.exports = router;