
exports.up = async function(knex) {
	await knex.schema.table("user", function(t) {
		t.date("password_updated", "date ").default(null);
	});
};

exports.down = function(knex) {

};
