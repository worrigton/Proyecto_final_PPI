const { bookshelf } = require("~/Server/database/db");

const SaleOrderHasProduct = bookshelf.Model.extend({
	tableName : "sale_order_has_product",
});

export default bookshelf.model("SaleOrderHasProduct", SaleOrderHasProduct);
