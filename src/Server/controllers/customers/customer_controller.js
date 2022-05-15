/* eslint-disable camelcase */
// Import Dependences
import { bookshelf, knex } from "~/Server/database/db";

// Import Models
import CustomerModel          from "~/Server/database/models/customers/customer";
import CustomerHasEmailsModel from "~/Server/database/models/customers/customer_has_email";
import CustomerAddressModel   from "~/Server/database/models/customers/customer_address";
import AddressModel           from "~/Server/database/models/info/address";

// Import Controllers
import BillingController        from "~/Server/controllers/customers/billing_profiles_controller";
import CustomerEmailsController from "~/Server/controllers/customers/customer_emails_controller";

const IMAGE_SIZES = [ "xs", "sm", "md", "lg"];

/**
 * Inserts a new customer register into the database.
 *
 * @author  Cesar A. Herrera de la T.
 * @version 0.10.0
 * @since   0.10.0
 * @param {{
 *     user_id         : integer,
 *     first_name      : string,
 *     last_name       : string,
 *     billing_profile : ?object
 *     customer_emails : {{
 *         [email_id] : status | string
 *     }?object}
 * }} body - Constains the necesary information to create the new register.
 * @return {Promise.<number, Error>} Returns a Promise which in case of success is fullfilled with the
 *                                   new record's database ID, otherwise rejects with some error.
*/
async function create(body, transacting = undefined) {
	async function doWork(t) {
		const attributes = {
			user_id       : body.user_id,
			first_name    : body.first_name,
			last_name     : body.last_name,
			taxpayer_type : body.taxpayer_type || undefined,
			legal_name    : body.legal_name || undefined,
		};

		const options = {
			transacting : t,
		};

		const customerModel = await new CustomerModel().save(attributes, options);

		if (body.billing_profile) {
			body.billing_profile.customer_id = customerModel.id;
			await BillingController.create(body.billing_profile, t);
		}

		if (body.customer_emails) {
			for (const [email_id, status] of Object.entries(body.customer_emails)) {
				await CustomerEmailsController.create({
					email_id,
					status,
					customer_id : customerModel.id,
				}, t);
			}
		}

		return { id : customerModel.id };
	}

	return transacting
		? doWork(transacting)
		: bookshelf.transaction(doWork);
}

/**
 * Returns a list of customers with pagination information from the database.
 *
 * @author  Cesar A. Herrera de la T.
 * @version 0.10.0
 * @since   0.10.0
 *
 *
 * @param  {number} page - Number of the page to request.
 * @param  {{
 *     page      : number,
 *     filter    : ?string,
 *     order_by  : ?string,
 *     order     : ?string,
 *     page_size : ?number
 * }} query - Contains information wich modifies the results, that includes filtering, sorting and pagination.
 * @return {Promise.<{
 *     collection : {
 *         id           : number,
 *         user_id      : number,
 *         first_name   : string,
 *         last_name    : string,
 *         email        : string,
 *         total_orders : number,
 *     }[],
 *     pagination : {
 *         rowCount  : number,
 *         pageCount : number,
 *         page      : number,
 *         pageSize  : number
 *     }
 * }, Error>} On success returns a Promise fullfilled with an object which contains a list of
 *            customers and the pagination information, otherwise rejects with Error.
*/
async function getPage(query) {
	try {
		const options = {
			pageSize : query.page_size > 0 && query.page_size <= 100 ? query.page_size : 25,
			page     : query.page > 0 ? query.page : 1,
		};
		const dateStart = query.start_date ? query.start_date : undefined;
		const dateEnd   = query.end_date   ? query.end_date : undefined;

		const column = query.order_by || "first_name";
		const order  = query.order || "DESC";

		const customerCollection = await CustomerModel.query(function(builder) {
			builder.columns(
				"customer.*",
				function() {
					this.select("u.email")
						.from("user AS u")
						.where("u.id", "=", knex.raw("customer.user_id"))
						.as("email");
				},
				function() {
					this.count("* as count")
						.from("buy_order AS b")
						.where("b.customer_id", "=", knex.raw("customer.id"))
						.as("total_orders");
				},
			);

			if (query.filter) {
				builder
					.where(function() {
						this.orWhere("first_name", "LIKE", `%${ query.filter }%`)
							.orWhere("last_name", "LIKE", `%${ query.filter }%`)
							.orWhereIn("user_id", function() {
								this.select("u.id")
									.from("user AS u")
									.orWhere("u.email", "LIKE", `%${ query.filter }%`)
									.orWhere("u.username", "LIKE", `%${ query.filter }%`);
							});
					});
			}

			if (dateStart || dateEnd) {
				if (dateStart) {
					builder
						.where(function() {
							this.whereIn("user_id", function() {
								this.select("u.id")
									.from("user as u")
									.where("created_at", ">=", dateStart);
							});
						});
				}

				if (dateEnd) {
					builder
						.where(function() {
							this.whereIn("user_id", function() {
								this.select("u.id")
									.from("user as u")
									.where("created_at", "<=", dateEnd);
							});
						});
				}
			}

			builder
				.where(function() {
					this.whereIn("user_id", function() {
						this.select("u.id")
							.from("user as u")
							.where("delete", false);
					});
				})
				.orderBy(column, order);

		}).fetchPage(options);

		const collection = customerCollection.models.map(customerModel => customerModel.attributes);

		return {
			collection : collection,
			pagination : customerCollection.pagination,
		};

	} catch (error) {
		throw error && error.status && error.label ? error : {
			status  : 500,
			label   : "DATABASE_ERROR",
			message : "There was a problem with the database",
			error   : error,
		};
	}
}

/**
 * Gets from the database a customer register according to the given ID.
 *
 * @author  Cesar A. Herrera de la T.
 * @version 0.10.0
 * @since   0.10.0
 *
 * @param  {number} id - Database ID of the color.
 * @return {Promise.<{
 *     id          : number,
 *     user_id     : number,
 *     address_id  : number,
 *     legal_name  : string,
 *     last_name   : string,
 *     first_name  : string,
 *     trade_name  : string,
 *     store_email : string,
 *     rfc         : string,
 *     rating      : number,
 *     images      : []string,
 *     regions     : {{
 *         id          : number,
 *         city_id     : number,
 *         state_id    : number,
 *         customer_id : number,
 *         city        : string,
 * 		   state       : string,
 *     }[]objects}
 *     user : {
 *         id         : number,
 *         username   : string,
 *         email      : string,
 *         type       : string,
 *         status     : string,
 *         created_at : number,
 *     }
 * } , Error>} Returns a promise, in case of success is fullfilled with the found record attributes,
 *            otherwise rejects with some error.
*/
const getCustomer = async (id) => {
	try {
		const options = {
			withRelated : ["user"],
		};

		const customerModel = await new CustomerModel({ id : id })
			.query(function(builder) {
				builder.columns(
					"customer.*",
					function() {
						this.select(knex.raw("IFNULL(SUM(r.rating) / COUNT(r.rating), 0)"))
							.from("rating AS r")
							.where("r.user_id", "=", knex.raw("customer.user_id"))
							.as("rating");
					},
					function() {
						this
							.select(knex.raw("COUNT(*)"))
							.from("sale_order as s")
							.whereIn("buy_order_id", function() {
								this.select("bo.id")
									.from("buy_order AS bo")
									.where("bo.customer_id", knex.raw("customer.id"));
							})
							.whereNotIn("s.status", ["FINISHED", "CANCELED", "DECLINED"])
							.where("s.shipping_status", "NOT_READY")
							.as("not_ready_sale_orders");
					},
					function() {
						this
							.select(knex.raw("COUNT(*)"))
							.from("sale_order as s")
							.whereIn("buy_order_id", function() {
								this.select("bo.id")
									.from("buy_order AS bo")
									.where("bo.customer_id", knex.raw("customer.id"));
							})
							.as("total_orders");
					},
					function() {
						this
							.select(function() {
								this
									.select("telephone")
									.from("address as a")
									.where("a.id", knex.raw("ca.address_id"));
							})
							.from("customer_address as ca")
							.where("ca.customer_id", knex.raw("customer.id"))
							.where("ca.flags", "PREDETERMINED")
							.as("telephone").limit(1);
					}
				);
			})
			.fetch(options);

		const data = customerModel.attributes;
		data.images = IMAGE_SIZES.reduce((accum, size) => ({
			...accum,
			[size] : `/api/images/users/${size}/${data.user_id}`,
		}), { "original" : `/api/images/users/${data.user_id}` });

		data.user            = customerModel.related("user").attributes;
		data.user.created_at = data?.user?.created_at.valueOf();

		return data;

	} catch (error) {
		throw error && error.status && error.label ? error : {
			status  : 500,
			label   : "DATABASE_ERROR",
			message : "There was a problem with the database",
			error   : error,
		};
	}
};

/**
 * Updates a specific Provider register which already
 * exists into the database by the given ID.
 *
 * @author  Cesar A. Herrera de la T.
 * @version 0.10.0
 * @since   0.10.0
 *
 * @param  {{
 *     id              : integer,
 *     user_id         : integer,
 *     first_name      : string,
 *     last_name       : string,
 *     billing_profile : ?object
 * }} body - Contains the information to save into the database.
 * @return {Promise.<undefined, Error>} Returns a promise which in case of success is fullfilled without
 *                                      any information, if any problem then is rejected with some error.
*/
const update = async (body, transacting = undefined) => {
	async function doWork(t) {
		const attributes = {
			first_name : body.first_name || undefined,
			last_name  : body.last_name  || undefined,
		};

		const options = {
			transacting : t,
			method      : "update",
			patch       : true,
		};
		const customerModel = await new CustomerModel({ id : body.id }).fetch(options);
		if (!customerModel) {
			throw {
				status  : 409,
				label   : "NOT_FOUND",
				message : `Requested 'customer' with ID [${ body.id }] was not found`,
				info    : { attributes },
			};
		}

		const customerAddressModel = await new CustomerAddressModel({ customer_id : body.id })
			.where("flags", "PREDETERMINED")
			.fetch(options);

		const addressAtributes = {
			telephone : body.telephone || undefined,
		};

		const addressModel = await new AddressModel({ id : customerAddressModel.attributes.address_id }).fetch(options);
		if (!addressModel) {
			throw {
				status  : 409,
				label   : "NOT_FOUND",
				message : `Requested 'address' with ID [${ customerAddressModel.attributes.address_id }] was not found`,
				info    : { attributes },
			};
		}

		await addressModel.save(addressAtributes, options);

		await customerModel.save(attributes, options);

		return { id : body.id };
	}

	return transacting
		? doWork(transacting)
		: bookshelf.transaction(doWork);
};

const validatePermisonEmail = async (customerId, emailId) => {
	try {
		return await bookshelf.transaction(async t => {

			const options = { transacting : t };

			const count = await CustomerHasEmailsModel
				.where({
					customer_id : customerId,
					email_id    : emailId,
					status      : "ACTIVE",
				})
				.count(options);
			if (count > 0) {
				const customerModel = await CustomerModel.query(function(builder) {
					builder
						.columns(
							"customer.id",
							function() {
								this.select("u.email")
									.from("user AS u")
									.where("u.id", "=", knex.raw("customer.user_id"))
									.as("email");
							},
						)
						.where("customer.id", customerId);
				}).fetch(options);

				return customerModel.attributes.email;
			} else {
				return false;
			}
		});
	} catch (error) {
		throw error && error.status && error.label ? error : {
			status  : 500,
			label   : "DATABASE_ERROR",
			message : "There was a problem with the database",
			error   : error,
		};
	}
};

module.exports = {
	create,
	getPage,
	getCustomer,
	update,
	validatePermisonEmail,
};
