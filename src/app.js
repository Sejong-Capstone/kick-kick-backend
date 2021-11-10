'use strict'

// Get Express Module
const express = require('express')
const app = express()

const dotenv = require('dotenv');

dotenv.config({ path: '.env.development'});

const { Loader } = require('./common');

Loader.load(app);

module.exports = app;