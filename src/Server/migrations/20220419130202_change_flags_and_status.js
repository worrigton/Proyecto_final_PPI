/* eslint-disable max-len */
exports.up = async function(knex, Promise) {
	await knex.raw("ALTER TABLE sale_order CHANGE COLUMN status status ENUM('REQUESTED', 'RUNNING', 'RETURNING', 'FINISHED', 'CANCELED', 'DECLINED') NOT NULL DEFAULT 'REQUESTED' , CHANGE COLUMN flags flags SET('PAID', 'INVOICED') NULL DEFAULT NULL;");

	await knex.raw("ALTER TABLE sale_order CHANGE COLUMN amout amount DECIMAL(15,4) NULL DEFAULT NULL ;");
};

exports.down = function(knex, Promise) {
	return Promise.resolve(knex);
};
