/* eslint-disable max-len */
exports.up = async function(knex, Promise) {
	await knex.raw(
		"ALTER TABLE `zoko_db`.`sale_order` CHANGE COLUMN `int` `id` INT UNSIGNED NOT NULL AUTO_INCREMENT;"
	);

	await knex.raw(
		"ALTER TABLE sale_order CHANGE COLUMN discount discount DECIMAL(12,3) NULL DEFAULT NULL ;"
	);

	await knex.raw(
		"ALTER TABLE sale_order_has_product DROP FOREIGN KEY fk_sale_order_has_provider_has_product_sale_order1;"
	);

	await knex.raw(
		"ALTER TABLE sale_order_has_product CHANGE COLUMN sale_order_int sale_order_id INT UNSIGNED NOT NULL ;"
	);

	await knex.raw(
		"ALTER TABLE sale_order_has_product ADD CONSTRAINT fk_sale_order_has_provider_has_product_sale_order1 FOREIGN KEY (sale_order_id) REFERENCES sale_order (id);"
	);

	await knex.raw("ALTER TABLE `sale_order_has_file` DROP FOREIGN KEY `fk_sale_order_has_file_sale_order1`;");

	await knex.raw("ALTER TABLE `sale_order_has_file` CHANGE COLUMN `sale_order_int` `sale_order_id` INT UNSIGNED NOT NULL ;");

	await knex.raw("ALTER TABLE `zoko_db`.`sale_order_has_file` ADD CONSTRAINT `fk_sale_order_has_file_sale_order1` FOREIGN KEY (`sale_order_id`) REFERENCES `zoko_db`.`sale_order` (`id`);");
};

exports.down = function(knex, Promise) {
	return Promise.resolve(knex);
};
