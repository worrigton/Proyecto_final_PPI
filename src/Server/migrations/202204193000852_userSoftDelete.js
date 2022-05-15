/* eslint-disable max-len */
exports.up = async function(knex, Promise) {
	await knex.raw("ALTER TABLE user ADD COLUMN `delete` TINYINT(1) NOT NULL DEFAULT 0 AFTER created_at;");
};

exports.down = function(knex, Promise) {
	return Promise.resolve(knex);
};
