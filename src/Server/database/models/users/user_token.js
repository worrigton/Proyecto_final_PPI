const { bookshelf } = require("~/Server/database/db");

const UserToken = bookshelf.Model.extend({
	tableName : "user_token",
});

module.exports = bookshelf.model("UserToken", UserToken);
