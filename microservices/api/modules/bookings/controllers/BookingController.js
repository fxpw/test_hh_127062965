'use strict';
const bookingService = require('modules/bookings//services/BookingService');

class BookingController {
	async create(req, res) {
		try {
			const booking = await bookingService.createBooking(req.body);
			res.status(201).json({ status: 'CREATED', booking });
		} catch (err) {
			console.error(err);
			res.status(500).json({ error: err.message });
		}
	}

	async get(req, res) {
		try {
			const booking = await bookingService.getBooking(req.params.id);
			if (!booking) {
				return res.status(404).json({ message: 'Booking not found' });
			}
			res.json(booking);
		} catch (err) {
			console.error(err);
			res.status(500).json({ error: err.message });
		}
	}
}

module.exports = new BookingController();
