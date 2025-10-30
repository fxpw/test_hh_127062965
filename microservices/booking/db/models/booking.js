// microservices/booking/db/models/booking.js
'use strict';
const {
	Model,
	Sequelize,
	DataTypes,
} = require('sequelize');

const sequelize = require('db/connect.js');

class Bookings extends Model {
	static associate(models) {
	}
}

const props = {
	id: {
		type: DataTypes.INTEGER.UNSIGNED,
		primaryKey: true,
	},
	stage: {
		type:DataTypes.ENUM(
			"CREATED","CHECKING_AVAILABILITY","CONFIRMED","REJECTED"
		),
		allowNull:false,
	},
	restaurant:{
		type: DataTypes.STRING(256),
		allowNull:false,
	},
	number_of_guests:{
		type: DataTypes.INTEGER,
		allowNull:false,
	},
	time:{
		type: DataTypes.DATE,
		allowNull:false,
	},
};

Bookings.init(props, {
	sequelize,
	tableName: 'bookings',
	timestamps: false,
});

/**
 * @typedef {import('sequelize').Model & typeof props} Bookings
 */

module.exports = Bookings;
