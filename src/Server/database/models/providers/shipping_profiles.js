const { bookshelf } = require("~/Server/database/db");

import stateModel from "~/Server/database/models/info/state";

const ShippingProfiles = bookshelf.Model.extend({
	tableName : "shipping_profiles",
	state     : function() {
		return this.belongsTo(stateModel);
	},
});

module.exports = bookshelf.model("ShippingProfiles", ShippingProfiles);
