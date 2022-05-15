/* eslint-disable camelcase */
const { bookshelf } = require("~/Server/database/db");

require("../info/subscription");
require("./provider");

const HistoryPayment = bookshelf.Model.extend({
	tableName    : "history_payment",
	subscription : function() {
		return this.belongsTo("Subscription")
			.query(function(builder) {
				builder
					.columns(
						"subscription.*",
					);
			});
	},
	new_subscription : function() {
		return this.belongsTo("Subscription", "new_subscription_id")
			.query(function(builder) {
				builder
					.columns(
						"subscription.*",
					);
			});
	},
	provider : function() {
		return this.belongsTo("Provider", "provider_id");
	},
});

module.exports = bookshelf.model("HistoryPayment", HistoryPayment);
