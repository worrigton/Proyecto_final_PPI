/* eslint-disable max-len */
exports.up = async function(knex, Promise) {
	await knex.schema.alterTable("buy_order", function(t) {
		t.integer("billing_profiles_id").unsigned();

		t.index("billing_profiles_id", "fk_buy_order_billing_profiles1");

		t.foreign("billing_profiles_id", "fk_buy_order_billing_profiles1")
			.references("billing_profiles.id")
			.onDelete("NO ACTION")
			.onUpdate("NO ACTION");
	});
};

exports.down = function(knex, Promise) {
	return Promise.resolve(knex);
};
