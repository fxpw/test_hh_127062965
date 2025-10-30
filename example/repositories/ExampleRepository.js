'use strict';
const exampleModel = require('../../db/models/example');

class exapmleRepository {
	async test(){
		exampleModel.create();
	}

}

module.exports = new exapmleRepository();
