const { bookshelf } = require("~/Server/database/db");

const Category = bookshelf.Model.extend({
	tableName : "category",
});

module.exports = bookshelf.model("Category", Category);
