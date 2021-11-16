const status = require('./status.js');
const user = require('./user.js');
const camera = require('./camera.js');
const detect = require('./detect.js');

const controler = {
  status, user, camera, detect
}

module.exports = controler;