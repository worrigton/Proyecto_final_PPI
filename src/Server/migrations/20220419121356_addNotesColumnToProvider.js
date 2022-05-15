
exports.up = async function(knex) {
	await knex.schema.table("provider", function(t) {
		t.text("notes", "mediumtext ").default(null);
	});
};

exports.down = function(knex) {
};
