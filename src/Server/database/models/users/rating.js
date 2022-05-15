const { bookshelf } = require("~/Server/database/db");

const Rating = bookshelf.Model.extend({
	tableName : "rating",
});

module.exports = bookshelf.model("Rating", Rating);
