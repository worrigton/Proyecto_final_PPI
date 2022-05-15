const { bookshelf } = require("~/Server/database/db");

import AddresModel from "~/Server/database/models/info/address";

const CustomerAddress = bookshelf.Model.extend({
	tableName : "customer_address",
	address   : function() {
		return this.belongsTo(AddresModel);
	},
});


module.exports = bookshelf.model("CustomerAddress", CustomerAddress);
