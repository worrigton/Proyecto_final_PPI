/* eslint-disable max-len */
exports.up = async function(knex, Promise) {
	await knex.schema.createTable("email", function(t) {
		t.increments("id").unsigned().primary().notNullable();
		t.string("name").notNullable();
		t.specificType("description", "TEXT");
		t.specificType("type", "SET('PROVIDER', 'CUSTOMER', 'EMPLOYEE')").notNullable();
	});
};

exports.down = function(knex, Promise) {
	return Promise.resolve(knex);
};
