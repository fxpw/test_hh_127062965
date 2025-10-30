// microservices/api/db/migrations/20251029094744-create-bookings.js
'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('bookings', {
			id: {
				type: Sequelize.INTEGER.UNSIGNED,
				primaryKey: true,
			},
			stage: {
				type: Sequelize.ENUM(
					"CREATED", "CHECKING_AVAILABILITY", "CONFIRMED", "REJECTED"
				),
				allowNull: false,
			},
			restaurant: {
				type: Sequelize.STRING(256),
				allowNull: false,
			},
			number_of_guests: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			time: {
				type: Sequelize.DATE,
				allowNull: false,
			},
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('bookings');
	},
};
