/* eslint-disable max-len */
exports.up = async function(knex, Promise) {
	await knex.schema.createTable("product_discount_provider", function(t) {
		t.increments("id").unsigned().primary().notNullable();
		t.specificType("discount", "SMALLINT").notNullable();
		t.specificType("min_weight", "DECIMAL(13,3)").notNullable();
		t.specificType("max_weight", "DECIMAL(13,3)").notNullable();
		t.integer("product_details_id").unsigned().notNullable();
		t.integer("provider_id").unsigned().notNullable();

		t.index("product_details_id", "fk_product_discount_provider_product_details1_idx");
		t.index("provider_id", "fk_product_discount_provider_provider1_idx");

		t.foreign("product_details_id", "fk_product_discount_provider_product_details1_idx")
			.references("product_details.id")
			.onDelete("NO ACTION")
			.onUpdate("CASCADE");
		t.foreign("provider_id", "fk_product_discount_provider_provider1_idx")
			.references("provider.id")
			.onDelete("NO ACTION")
			.onUpdate("CASCADE");
	});
};

exports.down = function(knex, Promise) {
	return Promise.resolve(knex);
};
