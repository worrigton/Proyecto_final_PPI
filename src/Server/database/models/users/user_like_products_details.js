const { bookshelf } = require("~/Server/database/db");

const UserLikeProductDetails = bookshelf.Model.extend({
	tableName : "user_like_product_details",
});

module.exports = bookshelf.model("UserLikeProductDetails", UserLikeProductDetails);
