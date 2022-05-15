const { bookshelf } = require("~/Server/database/db");

// Import Models
import AddresModel from "~/Server/database/models/info/address";

const BillingProfiles = bookshelf.Model.extend({
	tableName : "billing_profiles",
	address   : function() {
		return this.belongsTo(AddresModel);
	},
});


module.exports = bookshelf.model("BillingProfiles", BillingProfiles);
