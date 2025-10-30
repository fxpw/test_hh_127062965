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
		let connected = false;
		for (let i = 0; i < 10; i++) {
			try {
				await consumer.connect();
				connected = true;
				break;
			} catch (err) {
				console.warn(`Kafka not ready yet (${i + 1}/10)... retrying in 5s`);
				await new Promise(r => setTimeout(r, 5000));
			}
		}
		if (!connected) throw new Error('Kafka connection failed after retries');

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
