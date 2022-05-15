const { bookshelf } = require("~/Server/database/db");

const ProductChangeHistoryHasFile = bookshelf.Model.extend({
	tableName : "product_change_history_has_file",
});

module.exports = bookshelf.model("ProductChangeHistoryHasFile", ProductChangeHistoryHasFile);
