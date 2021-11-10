const router = require('express').Router();
const controler = require('./controler');

router.use('/status', controler.status);

module.exports = router;
