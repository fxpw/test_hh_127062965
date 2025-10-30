'use strict';
const BookingModel = require('db/models/booking');

class BookingRepository {
	async create(bookingData) {
		return await BookingModel.create(bookingData);
	}

	async findById(id) {
		return await BookingModel.findByPk(id);
	}

	async findExisting(restaurant, time) {
		return await BookingModel.findOne({ where: { restaurant, time } });
	}

	async updateStage(id, stage) {
		return await BookingModel.update({ stage }, { where: { id } });
	}
}

module.exports = new BookingRepository();
