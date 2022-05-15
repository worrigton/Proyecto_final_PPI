const { bookshelf } = require("~/Server/database/db");

const CustomerHasEmail = bookshelf.Model.extend({
	tableName : "customer_has_email",
});


module.exports = bookshelf.model("CustomerHasEmail", CustomerHasEmail);
