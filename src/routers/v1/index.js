const router = require('express').Router();
const controler = require('./controler');

router.use('/status', controler.status);
router.use('/user', controler.user);

module.exports = router;
