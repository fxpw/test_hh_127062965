'use strict';
const bookingRepository = require('modules/bookings/repositories/BookingRepository');
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
	clientId: 'api-service',
	brokers: [process.env.KAFKA_BROKER],
	sasl: {
		mechanism: process.env.KAFKA_MECHANISM,
		username: process.env.KAFKA_USERNAME,
		password: process.env.KAFKA_PASSWORD,
	},
	ssl: false,
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
