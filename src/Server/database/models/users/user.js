const { bookshelf } = require("~/Server/database/db");

// Import Others Relations Models
require("../customers/customer");
require("../providers/provider");
require("../employees/employee");
require("../info/file");

const User = bookshelf.Model.extend({
	tableName : "user",
	customer  : function() {
		return this.hasOne("Customer");
	},
	employee : function() {
		return this.hasOne("Employee");
	},
	provider : function() {
		return this.hasOne("Provider");
	},
	file : function() {
		return this.belongsTo("File");
	},
});

module.exports = bookshelf.model("User", User);
