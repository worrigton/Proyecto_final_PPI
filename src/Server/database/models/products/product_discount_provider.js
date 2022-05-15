const { bookshelf } = require("~/Server/database/db");

const ProductDiscountProvider = bookshelf.Model.extend({
	tableName : "product_discount_provider",
});

module.exports = bookshelf.model("ProductDiscountProvider", ProductDiscountProvider);
