const { bookshelf } = require("~/Server/database/db");

const Address = bookshelf.Model.extend({
	tableName : "address",
});

module.exports = bookshelf.model("Address", Address);
