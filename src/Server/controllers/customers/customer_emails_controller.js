/* eslint-disable camelcase */
//Import Dependences
import { bookshelf } from "~/Server/database/db";

// Import Models
import CustomerHasEmailModel from "~/Server/database/models/customers/customer_has_email";

const create = async (body, transacting = undefined) => {
	async function doWork(t) {
		const attributes = {
			customer_id : parseInt(body.customer_id),
			email_id    : parseInt(body.email_id),
			status      : body.status || "ACTIVE",
		};

		const options = {
			transacting : t,
		};

		const customerHasEmailModel = await new CustomerHasEmailModel().save(attributes, options);

		return { id : customerHasEmailModel.id };
	}

	return transacting
		? doWork(transacting)
		: bookshelf.transaction(doWork);
};

const update = async (body, transacting = undefined) => {
	async function doWork(t) {
		const attributes = {
			status : body.status,
		};

		const options = {
			transacting : t,
			method      : "update",
			patch       : true,
		};

		const customerHasEmailModel = await new CustomerHasEmailModel()
			.query(function(builder) {
				builder
					.where("customer_id", body.customer_id)
					.where("email_id", body.email_id);
			})
			.save(attributes, options);

		return { id : customerHasEmailModel.id };
	}

	return transacting
		? doWork(transacting)
		: bookshelf.transaction(doWork);
};

/**
 *
 * @param {{
 *     customer_id : number,
 *     customer_emails : {{
 *         [email_id] : status | string
 *     }?object}
 * }} body
 * @param {*} transacting
 */
const updateBatch = async (body, transacting = undefined) => {
	async function doWork(t) {
		for (const [email_id, status] of Object.entries(body.customer_emails)) {
			await update({
				status,
				email_id    : parseInt(email_id),
				customer_id : body.customer_id,
			}, t);
		}

		return { message : "Se actualizaron los datos exitosamente" };
	}

	return transacting
		? doWork(transacting)
		: bookshelf.transaction(doWork);
};

const getConfigCustomerEmail = async (customerId) => {
	try {
		const customerEmailsCollection = await CustomerHasEmailModel.query(function(builder) {
			builder.columns(
				"customer_has_email.*"
			).where("customer_id", customerId);

			builder.orderBy("id", "ASC");
		}).fetchAll();

		let collection = customerEmailsCollection.models.map(
			customerHasEmailsModel => customerHasEmailsModel.attributes
		);

		collection = collection.reduce((accum, emailConfig) => ({
			...accum,
			[emailConfig.email_id] : emailConfig.status,
		}), {});

		return collection;

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
	updateBatch,
	getConfigCustomerEmail,
};
