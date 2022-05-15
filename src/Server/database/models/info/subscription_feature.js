const { bookshelf } = require("~/Server/database/db");

const SubscriptionFeature = bookshelf.Model.extend({
	tableName : "subscription_feature",
});

module.exports = bookshelf.model("SubscriptionFeature", SubscriptionFeature);
