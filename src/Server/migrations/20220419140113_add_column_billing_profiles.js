/* eslint-disable max-len */
exports.up = async function(knex, Promise) {
	await knex.schema.table("billing_profiles", function(t) {
		t.specificType("flags", "ENUM('PREDETERMINED')");
	});
};

exports.down = function(knex, Promise) {
	return Promise.resolve(knex);
};
