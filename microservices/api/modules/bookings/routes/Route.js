'use strict';
const { Router } = require('express');
const controller = require('../controllers/BookingController');

const router = Router();

router.post('/', controller.create.bind(controller));
router.get('/:id', controller.get.bind(controller));

module.exports = router;
