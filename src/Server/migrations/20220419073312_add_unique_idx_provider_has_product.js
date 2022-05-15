/* eslint-disable max-len */
exports.up = async function(knex, Promise) {
	await knex.raw("ALTER TABLE provider_has_product ADD UNIQUE INDEX provider_id_product_id_UNIQUE (provider_id ASC, product_id ASC) VISIBLE");
	await knex.raw("ALTER TABLE provider_has_product ALTER INDEX fk_product_has_provider_product1_idx INVISIBLE");
};

exports.down = function(knex, Promise) {
	return Promise.resolve(knex);
};
