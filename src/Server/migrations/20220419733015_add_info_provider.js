/* eslint-disable max-len */
exports.up = async function(knex, Promise) {
	await knex.schema.table("provider", function(t) {
		t.string("titular_acount").notNullable();
		t.string("number_acount").notNullable();
		t.string("clabe_acount").notNullable();
	});
};

exports.down = function(knex, Promise) {
	return Promise.resolve(knex);
};
