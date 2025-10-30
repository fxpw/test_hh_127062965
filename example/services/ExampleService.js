'use strict';
const exampleRepository = require('../repositories/ExampleRepository');
class ExampleService {
	async test() {
		await exampleRepository.test();
	}
}

module.exports = new ExampleService();
