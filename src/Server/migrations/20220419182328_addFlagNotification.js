/* eslint-disable max-len */
exports.up = async function(knex, Promise) {
	await knex.raw("ALTER TABLE sale_order ADD COLUMN notification TINYINT(1) NOT NULL DEFAULT 1 AFTER note;");
};

exports.down = function(knex, Promise) {
	return Promise.resolve(knex);
};
