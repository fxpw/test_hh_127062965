'use strict';
const bookingService = require('modules/bookings/services/BookingService');

class BookingController {
	async start(req, res) {
		try {
			await bookingService.startConsumer();
			res.json({ message: 'Booking consumer started successfully' });
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: error.message });
		}
	}
}

module.exports = new BookingController();
