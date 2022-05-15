/* eslint-disable camelcase */
// Import Dependences
import { bookshelf, knex } from "~/Server/database/db";

// Import Models
import EmployeeModel            from "~/Server/database/models/employees/employee";
import EmployeeHasEmployeeModel from "~/Server/database/models/employees/employee_has_provider";

// Import Utils
import sanitizedDate from "~/Util/parseDate";

const IMAGE_SIZES = [ "xs", "sm", "md", "lg"];

/**
 * Adds a list of provider to some employee by the given employee ID.
 * The position of each branch is considered in the database.
 *
 * @param  {number} employeeId - employee's database ID.
 * @param  {number[]} providerIds - Contains the list of providers to insert.
 * @param  {?Transaction} transacting - If it is not null means that the insertions runs under that transaction,
 *                                      otherwise begins its own transaction.
 * @return {Promise.<undefined, Error>} Returns a Promise fulfilled without any data in case of success,
 *                                      otherwise is rejected.
 */
const linkProvidersToEmployee = async (employeeId, providerIds, transacting = null) => {
	async function doWork(t) {
		const options = { transacting : t };

		for (const providerId of providerIds) {
			const attributes = {
				employee_id : employeeId,
				provider_id : providerId,
			};
			await new EmployeeHasEmployeeModel().save(attributes, options);
		}
		return;
	}

	return transacting
		? doWork(transacting)
		: bookshelf.transaction(doWork);
};

/**
 * Deletes all the provider/employee links from the database by the given employee ID.
 *
 * @param  {number} employeeId - employee's database ID.
 * @param  {number} providerId - provider's database ID.
 * @param  {?Transaction} transacting - If it is not null means that the insertions runs under that transaction,
 *                                      otherwise begins its own transaction.
 * @return {Promise.<undefined, Error>} Returns a Promise fulfilling it with no information if success,
 *                                      in case af any error rejects with some error.
 */
function delProvidersToEmployee(employeeId, providerId = undefined, transacting = null) {
	async function doWork(t) {
		const options = {
			transacting : t,
			require     : false,
		};

		if ( providerId ) {
			await EmployeeHasEmployeeModel
				.where("employee_id", employeeId)
				.where("provider_id", providerId)
				.destroy(options);
		} else {
			await EmployeeHasEmployeeModel
				.where("employee_id", employeeId)
				.destroy(options);
		}
	}

	return transacting
		? doWork(transacting)
		: bookshelf.transaction(doWork);
}

/**
 * Updates all the provider/employee links of a specific employee by its given ID.
 *
 * @param  {number} employeeId - employee's database ID.
 * @param  {number[]} providerIds - Contains the new list of provider ids to link.
 * @param  {?Transaction} transacting - If it is not null means that the insertions runs under that transaction,
 *                                      otherwise begins its own transaction.
 * @return {Promise.<undefined, Error>} Returns a Promise fulfilled without any data in case of success,
 *                                      otherwise is rejected.
 */
function updateProvidersLinkToEmployee(employeeId, providerIds, transacting = null) {
	async function doWork(t) {
		await delProvidersToEmployee(employeeId, t);
		return linkProvidersToEmployee(employeeId, providerIds, t);
	}

	return transacting
		? doWork(transacting)
		: bookshelf.transaction(doWork);
}

/**
 * Inserts a new employee register into the database.
 *
 * @author  Cesar A. Herrera de la T.
 * @version 0.10.0
 * @since   0.10.0
 * @param {{
 *     user_id      : number,
 *     first_name   : string,
 *     last_name    : string,
 *     provider_ids : ?array
 * }} body - Constains the necesary information to create the new register.
 * @return {Promise.<number, Error>} Returns a Promise which in case of success is fullfilled with the
 *                                   new record's database ID, otherwise rejects with some error.
*/
async function create(body, transacting = undefined) {
	async function doWork(t) {
		const attributes = {
			user_id    : body.user_id,
			first_name : body.first_name,
			last_name  : body.last_name,
		};

		const options = {
			transacting : t,
		};

		const employeeModel = await new EmployeeModel().save(attributes, options);

		if (body.provider_ids && body.provider_ids.length > 0) {
			await linkProvidersToEmployee(employeeModel.id, body.provider_ids, t);
		}
		return { id : employeeModel.id };
	}

	return transacting
		? doWork(transacting)
		: bookshelf.transaction(doWork);
}

/**
 * Updates a specific Employee register which already
 * exists into the database by the given ID.
 *
 * @author  Cesar A. Herrera de la T.
 * @version 0.10.0
 * @since   0.10.0
 *
 * @param  {number} id - Database ID of the employee.
 * @param  {{
 *     first_name   : string,
 *     last_name    : string,
 *     provider_ids : ?array
 * }} body - Contains the information to save into the database.
 * @return {Promise.<undefined, Error>} Returns a promise which in case of success is fullfilled without
 *                                      any information, if any problem then is rejected with some error.
*/
async function update(body, transacting = undefined) {
	async function doWork(t) {
		const attributes = {
			first_name : body.first_name,
			last_name  : body.last_name,
		};

		const options = {
			transacting : t,
			method      : "update",
			patch       : true,
		};

		const employeeModel = await new EmployeeModel({ id : body.id }).fetch(options);
		if (!employeeModel) {
			throw {
				status  : 409,
				label   : "NOT_FOUND",
				message : `Requested 'employee' with ID [${ body.id }] was not found`,
				info    : { attributes },
			};
		}

		if (body?.provider_ids?.length > 0) {
			await updateProvidersLinkToEmployee(body.id, body.provider_ids, t);
		}

		return employeeModel.save(attributes, options);
	}

	return transacting
		? doWork(transacting)
		: bookshelf.transaction(doWork);
}

/**
 * Returns a list of employees with pagination information from the database.
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
 *     page_size : ?number,
 * }} query - Contains information wich modifies the results, that includes filtering, sorting and pagination.
 * @return {Promise.<{
 *     collection : {
 *         id              : number,
 *         user_id         : number,
 *         first_name      : string,
 *         last_name       : string,
 *         email           : string,
 *         total_providers : number,
 *     }[],
 *     pagination : {
 *         rowCount  : number,
 *         pageCount : number,
 *         page      : number,
 *         pageSize  : number
 *     }
 * }, Error>} On success returns a Promise fullfilled with an object which contains a list of
 *            employees and the pagination information, otherwise rejects with Error.
*/
async function getPage(query) {
	try {
		const options = {
			pageSize : query.page_size > 0 && query.page_size <= 100 ? query.page_size : 25,
			page     : query.page > 0 ? query.page : 1,
		};
		const column = query.order_by || "first_name";
		const order  = query.order || "DESC";

		const dateStart = query.date_start ? sanitizedDate(query.date_start) : undefined;
		const dateEnd   = query.date_end   ? sanitizedDate(query.date_end) : undefined;

		const status = {
			ACTIVE : "ACTIVO",
			DELATE : "ELIMINADO",
		};

		const employeeCollection = await EmployeeModel.query(function(builder) {
			builder.columns(
				"employee.*",
				function() {
					this.select("u.email")
						.from("user AS u")
						.where("u.id", "=", knex.raw("employee.user_id"))
						.as("email");
				},
				function() {
					this.select("u.status")
						.from("user AS u")
						.where("u.id", "=", knex.raw("employee.user_id"))
						.as("status");
				},
				function() {
					this.count("* as count")
						.from("employee_has_provider AS ehp")
						.where("ehp.employee_id", "=", knex.raw("employee.id"))
						.as("total_providers");
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

			builder.orderBy(column, order);
		}).fetchPage(options);

		const collection = employeeCollection.models.map(employeeModel => employeeModel.attributes);
		for (let index = 0; index < Object.entries(collection).length; index++) {
			const element = collection[index];
			collection[index].status = status[element.status];
		}

		return {
			collection : collection,
			pagination : employeeCollection.pagination,
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
 * Gets from the database a employee register according to the given ID.
 *
 * @author  Cesar A. Herrera de la T.
 * @version 0.10.0
 * @since   0.10.0
 *
 * @param  {number} id - Database ID of the color.
 * @return {Promise.<{
	*     id          : number,
	*     user_id     : number,
	*     last_name   : string,
	*     first_name  : string,
	*     images      : []string,
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
const getEmployee = async (id) => {
	try {
		const options = {
			withRelated : ["user"],
		};

		const employeeModel = await new EmployeeModel({ id : id })
			.query(function(builder) {
				builder.columns(
					"employee.*",
					function() {
						this.count("* as count")
							.from("employee_has_provider AS ehp")
							.where("ehp.employee_id", "=", knex.raw("employee.id"))
							.as("total_providers");
					},
				);
			}).fetch(options);

		const data = employeeModel.attributes;

		data.images = IMAGE_SIZES.reduce((accum, size) => ({
			...accum,
			[size] : `/api/images/users/${size}/${data.user_id}`,
		}), { "original" : `/api/images/users/${data.user_id}` });

		data.user = employeeModel.related("user").attributes;
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

module.exports = {
	create,
	update,
	getPage,
	getEmployee,
	linkProvidersToEmployee,
	delProvidersToEmployee,
};
