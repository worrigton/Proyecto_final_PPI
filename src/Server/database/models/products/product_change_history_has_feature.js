const { bookshelf } = require("~/Server/database/db");

const ProductChangeHistoryHasFeature = bookshelf.Model.extend({
	tableName : "product_change_history_has_feature",
});

module.exports = bookshelf.model("ProductChangeHistoryHasFeature", ProductChangeHistoryHasFeature);
