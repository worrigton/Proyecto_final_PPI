const { bookshelf, knex  } = require("~/Server/database/db");

require("~/Server/database/models/orders/sale_order_has_product");

const SaleOrder = bookshelf.Model.extend({
	tableName : "sale_order",
	products  : function() {
		return this.hasMany("SaleOrderHasProduct")
			.query(function(builder) {
				builder
					.columns(
						"sale_order_has_product.id",
						"sale_order_has_product.sale_order_id",
						"sale_order_has_product.provider_has_product_id",
						"sale_order_has_product.cost",
						"sale_order_has_product.price",
						"sale_order_has_product.quantity",
						"sale_order_has_product.p_discount",
						function() {
							this
								.select("php.provider_id")
								.from("provider_has_product as php")
								.where("php.id", knex.raw("sale_order_has_product.provider_has_product_id"))
								.as("provider_id");
						},
						function() {
							this
								.select(function() {
									this
										.select("size")
										.from("product")
										.where("id", knex.raw("php.product_id"));
								})
								.from("provider_has_product as php")
								.where("php.id", knex.raw("sale_order_has_product.provider_has_product_id"))
								.as("size");
						},
						function() {
							this
								.select(function() {
									this
										.select("quality")
										.from("product")
										.where("id", knex.raw("php.product_id"));
								})
								.from("provider_has_product as php")
								.where("php.id", knex.raw("sale_order_has_product.provider_has_product_id"))
								.as("quality");
						},
						function() {
							this
								.select(function() {
									this
										.select(function() {
											this
												.select("name")
												.from("product_details as pd")
												.where("pd.id", knex.raw("p.product_details_id"));
										})
										.from("product as p")
										.where("id", knex.raw("php.product_id"));
								})
								.from("provider_has_product as php")
								.where("php.id", knex.raw("sale_order_has_product.provider_has_product_id"))
								.as("name");
						},
						function() {
							this
								.select(function() {
									this
										.select(function() {
											this
												.select("id")
												.from("product_details as pd")
												.where("pd.id", knex.raw("p.product_details_id"));
										})
										.from("product as p")
										.where("id", knex.raw("php.product_id"));
								})
								.from("provider_has_product as php")
								.where("php.id", knex.raw("sale_order_has_product.provider_has_product_id"))
								.as("produc_details_id");
						},
						function() {
							this
								.select(function() {
									this
										.select(function() {
											this
												.select(function() {
													this
														.select("file_id")
														.from("product_details_has_file as pdhf")
														.where("pdhf.product_details_id", knex.raw("pd.id"))
														.orderBy("id", "ASC")
														.limit(1);
												})
												.from("product_details as pd")
												.where("pd.id", knex.raw("p.product_details_id"));
										})
										.from("product as p")
										.where("id", knex.raw("php.product_id"));
								})
								.from("provider_has_product as php")
								.where("php.id", knex.raw("sale_order_has_product.provider_has_product_id"))
								.as("file_id");
						},
					);
			});
	},
});

SaleOrder.STATUSES = {
	REQUESTED : 1,
	RUNNING   : 2,
	RETURNING : 3,
	FINISHED  : 4,
	CANCELED  : 5,
	DECLINED  : 6,
};

SaleOrder.SHIPPING_STATUSES = {
	NOT_READY : 1,
	READY     : 2,
	SENT      : 3,
	FINISHED  : 4,
};

SaleOrder.FLAGS = {
	PAID     : 0x01,
	INVOICED : 0x02,
};

export default bookshelf.model("SaleOrder", SaleOrder);
