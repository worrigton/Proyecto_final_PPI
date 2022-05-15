/* eslint-disable camelcase */
const { bookshelf, knex  } = require("~/Server/database/db");

require("../providers/region_provider");
require("../info/address");
require("../providers/history_payment");

require("../users/user");

const Provider = bookshelf.Model.extend({
	tableName : "provider",
	user      : function() {
		return this.belongsTo("User")
			.query(function(builder) {
				builder
					.columns(
						"user.id",
						"user.username",
						"user.email",
						"user.type",
						"user.status",
						"user.created_at"
					);
			});
	},
	address : function() {
		return this.belongsTo("Address");
	},
	regions : function() {
		return this.hasMany("RegionProvider")
			.query(function(builder) {
				builder
					.columns(
						"region_provider.id",
						"region_provider.city_id",
						"region_provider.state_id",
						"region_provider.provider_id",
						function() {
							this.select("name")
								.from("city AS c")
								.where("c.id", knex.raw("region_provider.city_id"))
								.as("city");
						},
						function() {
							this.select("name")
								.from("state AS s")
								.where("s.id", knex.raw("region_provider.state_id"))
								.as("state");
						}
					);
			});
	},
	membership : function() {
		return this.hasMany("HistoryPayment")
			.query(function(builder) {
				builder
					.columns(
						"history_payment.id",
						"history_payment.price",
						"history_payment.provider_id",
						"history_payment.subscription_id",
						"history_payment.type",
						"history_payment.status",
						"history_payment.created_at",
						function() {
							this.select("name")
								.from("subscription AS s")
								.where("s.id", knex.raw("history_payment.subscription_id"))
								.as("membership");
						},
						function() {
							this.select("quantity_product")
								.from("subscription AS s")
								.where("s.id", knex.raw("history_payment.subscription_id"))
								.as("quantity_product");
						},
					)
					.orderBy("id", "DESC")
					.limit(1);
			});
	},
});

module.exports = bookshelf.model("Provider", Provider);
