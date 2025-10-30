'use strict';
const { Router } = require('express');
const exampleController = require('../controllers/ExampleController');
const router = Router();

router.post('/', exampleController.test);
module.exports = router;
