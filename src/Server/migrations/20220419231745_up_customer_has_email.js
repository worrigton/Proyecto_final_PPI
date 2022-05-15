/* eslint-disable max-len */
exports.up = async function(knex, Promise) {
	await knex.schema.createTable("customer_has_email", function(t) {
		t.increments("id").unsigned().primary().notNullable();
		t.integer("email_id").unsigned().notNullable();
		t.integer("customer_id").unsigned().notNullable();
		t.specificType("status", "ENUM('ACTIVE', 'INACTIVE')").notNullable();

		t.index("email_id", "fk_customer_has_email_email1");
		t.index("customer_id", "fk_customer_has_email_customer1");

		t.foreign("email_id", "fk_customer_has_email_email1")
			.references("email.id")
			.onDelete("NO ACTION")
			.onUpdate("CASCADE");
		t.foreign("customer_id", "fk_customer_has_email_customer1")
			.references("customer.id")
			.onDelete("NO ACTION")
			.onUpdate("CASCADE");
	});
};

exports.down = function(knex, Promise) {
	return Promise.resolve(knex);
};
