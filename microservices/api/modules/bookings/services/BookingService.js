'use strict';
const bookingRepository = require('modules/bookings/repositories/BookingRepository');
const { Kafka } = require('kafkajs');
const config = require('config/config');

const kafka = new Kafka({
	clientId: config.kafka.clientId,
	brokers: [config.kafka.broker],
	ssl: config.kafka.ssl,
});
const producer = kafka.producer();


class BookingService {
	async createBooking(data) {
		const booking = await bookingRepository.create({
			stage: 'CREATED',
			restaurant: data.restaurant,
			number_of_guests: data.number_of_guests,
			time: data.time,
		});

		await producer.connect();
		await producer.send({
			topic: 'booking.created',
			messages: [{ value: JSON.stringify(booking) }],
		});

		return booking;
	}

	async getBooking(id) {
		return await bookingRepository.findById(id);
	}
}

module.exports = new BookingService();
