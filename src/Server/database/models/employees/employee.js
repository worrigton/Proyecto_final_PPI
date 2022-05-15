const { bookshelf } = require("~/Server/database/db");

require("../users/user");

const Employee = bookshelf.Model.extend({
	tableName : "employee",
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
});

module.exports = bookshelf.model("Employee", Employee);
