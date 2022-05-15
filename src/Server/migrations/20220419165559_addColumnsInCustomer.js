/* eslint-disable max-len */
exports.up = async function(knex, Promise) {
	await knex.schema.table("customer", function(t) {
		t.specificType("taxpayer_type", "ENUM('PHYSICAL','MORAL')").default(null);
		t.string("legal_name", 100).default(null);
	});
};

exports.down = function(knex, Promise) {
	return Promise.resolve(knex);
};
