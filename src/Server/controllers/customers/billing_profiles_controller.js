/* eslint-disable camelcase */
//Import Dependences
import { bookshelf } from "~/Server/database/db";

// Import Models
import BillingProfilesModel from "~/Server/database/models/customers/billing_profiles";

// Import Controllers
import AddressController from "../info/address_controller";

const updateFlagsNull = async (customerId, transacting = undefined) => {
	async function doWork(t) {
		const options = {
			transacting : t,
			method      : "update",
			patch       : true,
		};

		await new BillingProfilesModel()
			.query(function(builder) {
				builder
					.where("customer_id", customerId);
			})
			.save({ flags : null }, options);
		return { message : "Registros actualizados" };
	}

	return transacting
		? doWork(transacting)
		: bookshelf.transaction(doWork);
};


/**
 * Inserts a new Billing register into the database.
 *
 * @author  Montserrat Delgado Alvarez
 * @version 0.10.0
 * @since   0.10.0
 * @param {{
 *     customer_id  : number,
 *     name         : string,
 *     tax_regime   : string,
 *     rfc          : string,
 *     email        : string,
 *     address      : object,
 * }} body - Constains the necesary information to create the new register.
 * @return {Promise.<number, Error>} Returns a Promise which in case of success is fullfilled with the
 *                                   new record's database ID, otherwise rejects with some error.
*/
const create = async (body, transacting = undefined) => {
	async function doWork(t) {
		const attributes = {
			customer_id : body.customer_id,
			name        : body.name,
			tax_regime  : body.tax_regime,
			rfc         : body.rfc,
			flags       : (typeof body.flags === "string") ? body.flags : undefined,
		};

		const options = {
			transacting : t,
		};

		if (attributes.flags) {
			await updateFlagsNull(body.customer_id, t);
		}

		const addresModel = await AddressController.create(body.address, t);

		attributes.address_id = addresModel.id;

		const billingProfilesModel = await new BillingProfilesModel().save(attributes, options);

		return { id : billingProfilesModel.id };
	}

	return transacting
		? doWork(transacting)
		: bookshelf.transaction(doWork);
};

const update = async (body, transacting = undefined) => {
	async function doWork(t) {
		const attributes = {
			name       : body.name       || undefined,
			tax_regime : body.tax_regime || undefined,
			rfc        : body.rfc        || undefined,
			email      : body.email      || undefined,
			flags      : body.flags ? body.flags : null,
		};
		const options = {
			transacting : t,
			method      : "update",
			patch       : true,
		};

		const billingProfilesModel = await new BillingProfilesModel({ id : body.id }).fetch(options);
		if (!billingProfilesModel) {
			throw {
				status  : 409,
				label   : "NOT_FOUND",
				message : `Requested 'billing profile' with ID [${ body.id }] was not found`,
				info    : { attributes },
			};
		}

		if (attributes.flags === "PREDETERMINED") {
			await updateFlagsNull(body.customer_id, t);
		}

		await billingProfilesModel.save(attributes, options);

		if (body.address) {
			await AddressController.update(body.address.id, body.address, t);
		}

		return { id : billingProfilesModel.id };
	}

	return transacting
		? doWork(transacting)
		: bookshelf.transaction(doWork);
};

const getBillingProfiles = async (id) => {
	try {
		const options = {
			withRelated : ["address"],
		};

		const billingProfilesModel = await new BillingProfilesModel({ id : id })
			.query(function(builder) {
				builder.columns(
					"billing_profiles.*",
				);
			}).fetch(options);

		const data = billingProfilesModel.attributes;

		data.address = billingProfilesModel.related("address").attributes;

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

const getPage = async (query) => {
	try {
		const options = {
			pageSize    : query.page_size > 0 && query.page_size <= 100 ? query.page_size : 25,
			page        : query.page > 0 ? query.page : 1,
			withRelated : ["address"],
		};

		const column = query.order_by || "flags";
		const order  = query.order || "DESC";

		const billingProfilesCollection = await BillingProfilesModel.query(function(builder) {
			builder.columns(
				"billing_profiles.*"
			);

			if (query.filter) {
				builder
					.where(function() {
						this.orWhere("name", "LIKE", `%${ query.filter }%`)
							.orWhere("tax_regime", "LIKE", `%${ query.filter }%`)
							.orWhere("rfc", "LIKE", `%${ query.filter }%`)
							.orWhere("email", "LIKE", `%${ query.filter }%`)
							.orWhereIn("address_id", function() {
								this.select("a.id")
									.from("address AS a")
									.orWhere("a.street", "LIKE", `%${ query.filter }%`)
									.orWhere("a.ext_number", "LIKE", `%${ query.filter }%`)
									.orWhere("a.neighborhood", "LIKE", `%${ query.filter }%`)
									.orWhere("a.telephone", "LIKE", `%${ query.filter }%`)
									.orWhere("a.zip_code", "LIKE", `%${ query.filter }%`);
							});
					});
			}

			if (query.customer_id) {
				builder.where("customer_id", query.customer_id);
			}

			builder.orderBy(column, order);
		}).fetchPage(options);

		const collection = billingProfilesCollection.models.map(billingProfilesModel => {
			billingProfilesModel.attributes.address = billingProfilesModel.related("address").attributes;
			return billingProfilesModel.attributes;
		});

		return {
			collection : collection,
			pagination : billingProfilesCollection.pagination,
		};

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
	update,
	getBillingProfiles,
	getPage,
};
