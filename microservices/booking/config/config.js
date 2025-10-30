require('dotenv').config();
let config = {
	dialect: process.env.DB_DIALECT,
	host: process.env.DB_HOST,
	port: process.env.IN_DB_PORT,
	database: process.env.DB_DATABASE,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	// logging: console.log,
	dialectOptions: {
		bigNumberStrings: true,
	},
}
// console.log(config);
module.exports = config;
