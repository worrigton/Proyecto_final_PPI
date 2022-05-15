/* eslint-disable camelcase */
const { bookshelf } = require("~/Server/database/db");

// Import Models
import FileModel                     from "~/Server/database/models/info/file";
import FeatureModel                  from "~/Server/database/models/products/feature";
import ProductDetailsHasFileModel    from "~/Server/database/models/products/product_details_has_file";
import ProductDetailsHasFeatureModel from "~/Server/database/models/products/product_details_has_feature";
import ProductModel                  from "~/Server/database/models/products/product";

const ProductDetails = bookshelf.Model.extend({
	tableName : "product_details",
	files     : function() {
		return this.belongsToMany(FileModel, "product_details_has_file")
			.through(ProductDetailsHasFileModel, "product_details_id")
			.query(function(builder) {
				builder.columns(
					"product_details_has_file.file_id as id",
				);
			});
	},
	features : function() {
		return this.belongsToMany(FeatureModel, "product_details_has_feature")
			.through(ProductDetailsHasFeatureModel, "product_details_id")
			.query(function(builder) {
				builder.columns(
					"name",
					"product_details_has_feature.feature_id as id",
					"product_details_has_feature.label",
				);
			});
	},
	products : function() {
		return this.hasMany(ProductModel, "product_details_id")
			.query(function(builder) {
				builder.columns(
					"id",
					"size",
					"quality",
					"product_details_id",
				);
			});
	},
});

module.exports = bookshelf.model("ProductDetails", ProductDetails);
