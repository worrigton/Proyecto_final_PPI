
exports.up = async function(knex) {
	await knex.schema.createTable("user_token", function(t) {
		t.increments("id").unsigned().primary().notNullable();
		t.integer("user_id").unsigned().notNullable();
		t.string("active_token");
		t.timestamp("created_at").defaultTo(knex.fn.now());
		t.enum("type", ["PASSWORD_RECOVERY", "ACCOUNT_ACTIVATION"]).notNullable();
		t.unique(["user_id", "type"]);
		t.unique(["active_token", "type"]);
		t.foreign("user_id")
			.references("user.id")
			.onDelete("NO ACTION")
			.onUpdate("CASCADE");
		t.engine("InnoDB");
	});
};

exports.down = function(knex) {};
