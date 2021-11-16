const router = require('express').Router();
const controler = require('./controler');

router.use('/status', controler.status);
router.use('/user', controler.user);
router.use('/camera', controler.camera);
router.use('/detect', controler.detect);

module.exports = router;
