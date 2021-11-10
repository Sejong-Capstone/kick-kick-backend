const router = require("express").Router();
const { Response, StatusCode } = require('../../../common');

/**
 * @swagger
 *  /status:
 *    get:
 *      tags:
 *        - status
 *      description: 
 *        server status
 *      produces:
 *        application/json
 *      responses:
 *        200:
 *          description: status 확인
 *          content: 
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/serverStatus'
 */

router.get('/', async (req, res, next) => {
  const result = { status: "Ok" }
  
  return Response.send(res, StatusCode.OK, result);
})

module.exports = router;