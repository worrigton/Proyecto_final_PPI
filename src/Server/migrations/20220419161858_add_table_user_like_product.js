/* eslint-disable max-len */
exports.up = async function(knex, Promise) {
	await knex.schema.createTable("user_like_product_details", function(t) {
		t.increments("id").unsigned().primary().notNullable();
		t.integer("product_details_id").unsigned().notNullable();
		t.integer("user_id").unsigned().notNullable();
		t.specificType("like_type", "ENUM('LIKE')").notNullable().default("LIKE");

		t.index("product_details_id", "fk_user_has_product_details_product_details1");
		t.index("user_id", "fk_user_has_product_details_user1");

		t.foreign("product_details_id", "fk_user_has_product_details_product_details1")
			.references("product_details.id")
			.onDelete("NO ACTION")
			.onUpdate("CASCADE");
		t.foreign("user_id", "fk_user_has_product_details_user1")
			.references("user.id")
			.onDelete("NO ACTION")
			.onUpdate("CASCADE");
	});
};

exports.down = function(knex, Promise) {
	return Promise.resolve(knex);
};
