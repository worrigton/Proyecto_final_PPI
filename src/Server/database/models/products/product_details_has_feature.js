const { bookshelf } = require("~/Server/database/db");

const ProductDetailsHasFeature = bookshelf.Model.extend({
	tableName : "product_details_has_feature",
});

module.exports = bookshelf.model("ProductDetailsHasFeature", ProductDetailsHasFeature);
