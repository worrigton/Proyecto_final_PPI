const { bookshelf } = require("~/Server/database/db");

const Feature = bookshelf.Model.extend({
	tableName : "feature",
});

module.exports = bookshelf.model("Feature", Feature);
