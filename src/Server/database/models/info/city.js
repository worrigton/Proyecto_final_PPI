const { bookshelf } = require("~/Server/database/db");

const City = bookshelf.Model.extend({
	tableName : "city",
});

module.exports = bookshelf.model("City", City);
