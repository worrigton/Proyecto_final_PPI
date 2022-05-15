/* eslint-disable camelcase */
//Import Dependences
import { bookshelf } from "~/Server/database/db";

// Import Models
import AddressModel from "~/Server/database/models/info/address";

/**
 * Inserts a new Address register into the database.
 *
 * @author  Cesar A. Herrera de la T.
 * @version 0.10.0
 * @since   0.10.0
 * @param {{
 *     street       : string,
 *     ext_number   : string,
 *     city         : string,
 *     neighborhood : string,
 *     state        : string,
 *     zip_code     : string,
 *     country      : string,
 *     int_number   : ?string,
 *     telephone    : ?string,
 *     references   : ?string,
 * }} body - Constains the necesary information to create the new register.
 * @return {Promise.<number, Error>} Returns a Promise which in case of success is fullfilled with the
 *                                   new record's database ID, otherwise rejects with some error.
*/
async function create(body, transacting = undefined) {
	async function doWork(t) {
		const attributes = {
			street       : body.street,
			ext_number   : body.ext_number,
			city         : body.city,
			neighborhood : body.neighborhood,
			state        : body.state,
			zip_code     : body.zip_code,
			country      : body.country,
			int_number   : body.int_number ? body.int_number : undefined,
			telephone    : body.telephone  ? body.telephone  : undefined,
			references   : body.references ? body.references : undefined,
		};

		const options = {
			transacting : t,
		};

		const addressModel = await new AddressModel().save(attributes, options);

		return { id : addressModel.id };
	}

	return transacting
		? doWork(transacting)
		: bookshelf.transaction(doWork);
}

/**
 * Updates a specific Provider register which already
 * exists into the database by the given ID.
 *
 * @author  Cesar A. Herrera de la T.
 * @version 0.10.0
 * @since   0.10.0
 *
 * @param  {number} id - Database ID of the address.
 * @param  {{
 *     street       : string,
 *     ext_number   : string,
 *     city         : string,
 *     neighborhood : string,
 *     state        : string,
 *     zip_code     : string,
 *     country      : string,
 *     int_number   : ?string,
 *     telephone    : ?string,
 *     references   : ?string,
 * }} body - Contains the information to save into the database.
 * @return {Promise.<undefined, Error>} Returns a promise which in case of success is fullfilled without
 *                                      any information, if any problem then is rejected with some error.
*/
async function update(id, body, transacting = undefined) {
	async function doWork(t) {
		const attributes = {
			street       : body.street || undefined,
			ext_number   : body.ext_number || undefined,
			city         : body.city || undefined,
			neighborhood : body.neighborhood || undefined,
			state        : body.state || undefined,
			zip_code     : body.zip_code || undefined,
			country      : body.country || undefined,
			int_number   : body.int_number || undefined,
			telephone    : body.telephone || undefined,
			references   : body.references || undefined,
		};

		const options = {
			transacting : t,
			method      : "update",
			patch       : true,
		};

		const addressModel = await new AddressModel({ id : id }).fetch(options);
		if (!addressModel) {
			throw {
				status  : 409,
				label   : "NOT_FOUND",
				message : `Requested 'address' with ID [${ id }] was not found`,
				info    : { attributes },
			};
		}

		return addressModel.save(attributes, options);
	}

	return transacting
		? doWork(transacting)
		: bookshelf.transaction(doWork);
}

module.exports = {
	create,
	update,
};
