/* eslint-disable max-len */
exports.up = async function(knex, Promise) {
	await knex.raw(
		"ALTER TABLE history_payment CHANGE COLUMN status status ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED') NOT NULL DEFAULT 'ACTIVE';"
	);

	await knex.raw(
		"ALTER TABLE history_payment ADD COLUMN payment_status ENUM('PAID_OUT', 'WITHOUT_PAYING') NOT NULL DEFAULT 'PAID_OUT' AFTER payment_token;"
	);
};

exports.down = function(knex, Promise) {
	return Promise.resolve(knex);
};
