'use strict';
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const sequelize = require('db/connect');
const app = express();
const BACKEND_PORT = process.env.BACKEND_PORT || 5000;
const bookingService = require('./modules/bookings/services/BookingService');

app.use(cors({ origin: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3000'] }));
app.use(express.json());
if (process.env.NODE_ENV !== 'production') {
	const logger = (req, res, next) => {
		// console.log(`${req.method} ${req.url}`);
		next();
	};
	app.use(logger);
}

const loadRoutesFromModules = async () => {
	let modulesDir = path.join(__dirname, 'modules');
	try {
		const modules = fs.readdirSync(modulesDir);
		for (const module of modules) {
			let routesDir = path.join(modulesDir, module, "routes");
			if (fs.existsSync(routesDir)) {
				let routes = fs.readdirSync(routesDir);
				let config;
				const configPath = path.join(modulesDir, module, 'config.json');
				try {
					config = fs.readFileSync(configPath);
					// @ts-ignore
					config = JSON.parse(config);
				} catch (error) {
					console.warn(`Config file not found for ${module}, skipping.`, error);
					continue;
				}
				if (config.enabled) {
					for (const routeFile of routes) {
						if (routeFile.endsWith('Route.js')) {
							let routePath = path.join(routesDir, routeFile)
							const route = require(routePath);
							app.use(`/api/${module}`, route);
							console.log(`inited route ${routeFile} in /api/${module}`);
						}
					}
				}
			}
		}
	} catch (error) {
		console.error('Error loading routes:', error);
	}
};
app.get('/api', (req, res) => {
	if (process.env.NODE_ENV === 'production') {
		res.send({ message: 'Hello world from the production-server!' });
	} else {
		res.send({ message: 'Hello world from the test-server!' });
	}
});
const initApp = async () => {
	try {
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
	await loadRoutesFromModules();
	await bookingService.startConsumer();
	if (process.env.NODE_ENV === 'production') {
		app.listen(BACKEND_PORT, () => console.log('Server running in production mode.'));
	} else {
		app.listen(BACKEND_PORT, () => console.log('Server running in development mode.'));
	}
};
initApp().catch((error) => {
	console.error('Failed to initialize app:', error);
});

