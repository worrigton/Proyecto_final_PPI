const { bookshelf } = require("~/Server/database/db");

const ProductDetailsHasFile = bookshelf.Model.extend({
	tableName : "product_details_has_file",
});

module.exports = bookshelf.model("ProductDetailsHasFile", ProductDetailsHasFile);
