'use strict';

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const common = require('../common');
const { PrettyConsole } = common;

PrettyConsole.print('Current Env', env);

const db = {};
const sequelize = new Sequelize(
    config.database, 
    config.username, 
    config.password, 
    config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// model 정의
db.user = require('./user')(sequelize, Sequelize); // user
db.camera = require('./camera')(sequelize, Sequelize); // camera
db.detected_image = require('./detected_image')(sequelize, Sequelize); //detected_image

sequelize.sync()
.then(() => {
  PrettyConsole.print('Sequelize Sync', '-Sync Finished-');
})
.catch((error) => {
  PrettyConsole.print('Sequelize Sync', `Sync Failed: ${error}`);
});

module.exports = db;