const { bookshelf } = require("~/Server/database/db");

const File = bookshelf.Model.extend({
	tableName : "file",
});

module.exports = bookshelf.model("File", File);
