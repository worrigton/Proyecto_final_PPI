const { bookshelf } = require("~/Server/database/db");

const State = bookshelf.Model.extend({
	tableName : "state",
});

module.exports = bookshelf.model("State", State);
