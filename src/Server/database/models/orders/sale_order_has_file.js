const { bookshelf } = require("~/Server/database/db");

const SaleOrderHasFile = bookshelf.Model.extend({
	tableName : "sale_order_has_file",
});

export default bookshelf.model("SaleOrderHasFile", SaleOrderHasFile);
