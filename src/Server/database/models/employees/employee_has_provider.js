const { bookshelf } = require("~/Server/database/db");

const EmployeeHasProvider = bookshelf.Model.extend({
	tableName : "employee_has_provider",
});

module.exports = bookshelf.model("EmployeeHasProvider", EmployeeHasProvider);
