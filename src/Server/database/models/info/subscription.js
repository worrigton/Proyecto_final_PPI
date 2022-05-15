const { bookshelf } = require("~/Server/database/db");

import SubscriptionFeaturesModel from "~/Server/database/models/info/subscription_feature";

const Subscription = bookshelf.Model.extend({
	tableName : "subscription",
	features  : function() {
		return this.hasMany(SubscriptionFeaturesModel);
	},
});

module.exports = bookshelf.model("Subscription", Subscription);
