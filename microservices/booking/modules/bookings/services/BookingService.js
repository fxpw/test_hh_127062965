'use strict';
const { Kafka } = require('kafkajs');
const bookingRepository = require('modules/bookings/repositories/BookingRepository');

const config = require('config/config');

const kafka = new Kafka({
	clientId: config.kafka.clientId,
	brokers: [config.kafka.broker],
	ssl: config.kafka.ssl,
});
const consumer = kafka.consumer({ groupId: 'booking.checker' });

class BookingService {
	async startConsumer() {
		await consumer.connect();
		await consumer.subscribe({ topic: 'booking.created', fromBeginning: false });

		await consumer.run({
			eachMessage: async ({ message }) => {
				const data = JSON.parse(message.value.toString());
				console.log('📩 Booking received:', data);

				const exists = await bookingRepository.findExisting(data.restaurant, data.time);
				const newStage = exists ? 'REJECTED' : 'CONFIRMED';
				await bookingRepository.updateStage(data.id, newStage);

				console.log(`✅ Booking ${data.id} → ${newStage}`);
			},
		});
	}
}

module.exports = new BookingService();
