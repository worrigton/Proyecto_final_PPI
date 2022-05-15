/* eslint-disable camelcase */
const { bookshelf, knex  } = require("~/Server/database/db");

require("~/Server/database/models/customers/customer");
require("~/Server/database/models/customers/billing_profiles");
require("~/Server/database/models/customers/customer_address");
require("~/Server/database/models/orders/sale_order");
require("~/Server/database/models/info/address");

const BuyOrder = bookshelf.Model.extend({
	tableName : "buy_order",
	customer  : function() {
		return this.belongsTo("Customer", "customer_id");
	},
	billing_profile : function() {
		return this.belongsTo("BillingProfiles", "billing_profiles_id");
	},
	customer_address : function() {
		return this.belongsTo("CustomerAddress", "customer_address_id");
	},
	sale_orders : function() {
		return this.hasMany("SaleOrder")
			.query(function(builder) {
				builder
					.columns(
						"*",
						function() {
							this
								.select(function() {
									this
										.select(function() {
											this
												.select("trade_name")
												.from("provider as p")
												.where("p.id", knex.raw("php.provider_id"));
										})
										.from("provider_has_product as php")
										.where("php.id", knex.raw("sohp.provider_has_product_id"));
								})
								.from("sale_order_has_product as sohp")
								.where("sohp.sale_order_id", knex.raw("sale_order.id"))
								.limit(1)
								.as("trade_name");
						},
						function() {
							this
								.select(function() {
									this
										.select(function() {
											this
												.select("user_id")
												.from("provider as p")
												.where("p.id", knex.raw("php.provider_id"));
										})
										.from("provider_has_product as php")
										.where("php.id", knex.raw("sohp.provider_has_product_id"));
								})
								.from("sale_order_has_product as sohp")
								.where("sohp.sale_order_id", knex.raw("sale_order.id"))
								.limit(1)
								.as("user_id");
						},
						function() {
							this.select("sohf.file_id")
								.from("sale_order_has_file as sohf")
								.where("sohf.sale_order_id", knex.raw("sale_order.id"))
								.where("type", "VOUCHER")
								.orderBy("id", "DESC")
								.limit(1)
								.as("voucher_id");
						},
						function() {
							this.select("sohf.file_id")
								.from("sale_order_has_file as sohf")
								.where("sohf.sale_order_id", knex.raw("sale_order.id"))
								.where("type", "BILL")
								.orderBy("id", "DESC")
								.limit(1)
								.as("bill_id");
						},
						function() {
							this.select("sohf.file_id")
								.from("sale_order_has_file as sohf")
								.where("sohf.sale_order_id", knex.raw("sale_order.id"))
								.where("type", "PAY_ORDER")
								.orderBy("id", "DESC")
								.limit(1)
								.as("pay_order_id");
						},
					);
			});
	},
});

BuyOrder.ORDER_STATUSES = {
	ACTIVE    : 1,
	CANCELED  : 2,
	FINALIZED : 3,
};

export default bookshelf.model("BuyOrder", BuyOrder);
