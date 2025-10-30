'use strict';
const { Router } = require('express');
const controller = require('modules/bookings/controllers/BookingController');
const router = Router();

router.get('/start', controller.start.bind(controller));

module.exports = router;
