/* eslint-disable max-len */
exports.up = async function(knex, Promise) {
	await knex.schema.table("history_payment", function(t) {
		t.dropColumn("date");
	});
};

exports.down = function(knex, Promise) {
	return Promise.resolve(knex);
};
