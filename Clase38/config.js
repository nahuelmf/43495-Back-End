const { config } = require('dotenv');

require('dotenv').config();
config.MONGO = process.env.MONGO;

module.exports = config;
