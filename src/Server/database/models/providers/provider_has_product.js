const { bookshelf } = require("~/Server/database/db");

const ProviderHasProduct = bookshelf.Model.extend({
	tableName : "provider_has_product",
});

module.exports = bookshelf.model("ProviderHasProduct", ProviderHasProduct);
