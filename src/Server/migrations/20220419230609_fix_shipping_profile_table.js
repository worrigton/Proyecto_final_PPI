/* eslint-disable max-len */
exports.up = async function(knex, Promise) {
	await knex.raw("ALTER TABLE shipping_profiles DROP FOREIGN KEY fk_shipping_profiles_region_provider1;");
	await knex.raw(
		"ALTER TABLE shipping_profiles DROP COLUMN region_provider_id, " +
		"DROP INDEX fk_provider_id_region_provider_id_transport_type_idx, " +
		"ADD UNIQUE INDEX fk_provider_id_region_provider_id_transport_type_idx (provider_id ASC, transport ASC, frezee_tax ASC)," +
		"DROP INDEX fk_shipping_profiles_region_provider1_idx;"
	);

	await knex.schema.alterTable("shipping_profiles", function(t) {
		t.integer("state_id").unsigned().notNullable();
		t.index("state_id", "fk_shipping_profiles_state1");

		t.foreign("state_id", "fk_shipping_profiles_state1")
			.references("state.id")
			.onDelete("NO ACTION")
			.onUpdate("CASCADE");
	});

	await knex.raw(
		"ALTER TABLE shipping_profiles CHANGE COLUMN min_weingth min_weight DECIMAL(13,3) NOT NULL, " +
		"CHANGE COLUMN max_weingth max_weight DECIMAL(13,3) NOT NULL ;"
	);

	await knex.raw(
		"ALTER TABLE shipping_profiles DROP INDEX fk_provider_id_region_provider_id_transport_type_idx;"
	);
};

exports.down = function(knex, Promise) {
	return Promise.resolve(knex);
};
