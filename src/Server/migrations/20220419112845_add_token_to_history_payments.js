/* eslint-disable max-len */
exports.up = async function(knex, Promise) {
	await knex.schema.alterTable("history_payment", function(t) {
		t.string("payment_token").notNull();
	});

	await knex.raw("ALTER TABLE history_payment DROP FOREIGN KEY fk_history_payment_provider1;");
	await knex.raw("ALTER TABLE history_payment CHANGE COLUMN provider_id provider_id INT UNSIGNED NULL;");
	await knex.raw("ALTER TABLE history_payment ADD CONSTRAINT fk_history_payment_provider1 FOREIGN KEY (provider_id) REFERENCES provider (id);");
};

exports.down = function(knex, Promise) {

};
