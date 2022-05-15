const { bookshelf } = require("~/Server/database/db");

const ProductHasFeature = bookshelf.Model.extend({
	tableName : "product_has_feature",
});

module.exports = bookshelf.model("ProductHasFeature", ProductHasFeature);
