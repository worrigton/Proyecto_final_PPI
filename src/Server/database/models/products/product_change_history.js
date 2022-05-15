const { bookshelf } = require("~/Server/database/db");

// Import Models
import FileModel    from "~/Server/database/models/info/file";
import FeatureModel from "~/Server/database/models/products/feature";

const ProductChangeHistory = bookshelf.Model.extend({
	tableName : "product_change_history",
	files     : function() {
		return this.belongsToMany(FileModel, "product_change_history_has_file")
			.query(function(builder) {
				builder.columns(
					"product_change_history_has_file.file_id as id"
				);
			});
	},
	features : function() {
		return this.belongsToMany(FeatureModel, "product_change_history_has_feature")
			.query(function(builder) {
				builder.columns(
					"name",
					"product_change_history_has_feature.feature_id as id",
					"product_change_history_has_feature.label",
				);
			});
	},
});

module.exports = bookshelf.model("ProductChangeHistory", ProductChangeHistory);
