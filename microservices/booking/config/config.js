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
	kafka: {
		clientId: process.env.KAFKA_CLIENT_ID || 'booking-service',
		broker: process.env.KAFKA_BROKER || 'kafka:9092',
		ssl: process.env.KAFKA_SSL === 'true',
		sasl: null,
	},
}
// console.log(config);
module.exports = config;
