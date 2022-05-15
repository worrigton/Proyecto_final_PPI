/* eslint-disable max-len */
exports.up = async function(knex, Promise) {
	await knex.raw("ALTER TABLE `zoko_db`.`provider` CHANGE COLUMN `titular_acount` `titular_acount` VARCHAR(255) NULL , CHANGE COLUMN `number_acount` `number_acount` VARCHAR(255) NULL , CHANGE COLUMN `clabe_acount` `clabe_acount` VARCHAR(255) NULL ;");

	await knex.schema.alterTable("history_payment", function(t) {
		t.integer("new_subscription_id").unsigned();

		t.index("new_subscription_id", "fk_history_payment_subscription1_idx");

		t.foreign("new_subscription_id", "fk_history_payment_subscription1_idx")
			.references("subscription.id")
			.onDelete("NO ACTION")
			.onUpdate("NO ACTION");
	});
};

exports.down = function(knex, Promise) {
	return Promise.resolve(knex);
};
