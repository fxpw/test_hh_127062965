'use strict';
const exampleService = require('../services/ExampleService');
class ExampleController {
	async test(){
		await exampleService.test();
	}
}

module.exports = new ExampleController();
