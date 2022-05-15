/* eslint-disable max-len */
exports.up = async function(knex, Promise) {
	await knex.schema.table("sale_order", function(t) {
		t.specificType("note", "TINYTEXT");
	});
};

exports.down = function(knex, Promise) {
	return Promise.resolve(knex);
};
