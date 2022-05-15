const { bookshelf } = require("~/Server/database/db");

const RegionProvider = bookshelf.Model.extend({
	tableName : "region_provider",
});

module.exports = bookshelf.model("RegionProvider", RegionProvider);
