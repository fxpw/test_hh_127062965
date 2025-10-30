'use strict';
const Sequelize = require('sequelize');
const process = require('process');

const config = require('config/config.js');

const sequelize = new Sequelize(config.database, config.username, config.password,{
	host: config.host,
	dialect: config.dialect,
	port: config.port,
	logging: false,
});

module.exports = sequelize;
// module.exports = {}
