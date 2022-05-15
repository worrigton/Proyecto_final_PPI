/* eslint-disable camelcase */
// Import Models
import StateModel from "~/Server/database/models/info/state";

/**
 * Returns a list of states with pagination information from the database.
 *
 * @author  Montserrat Delgado Alvarez
 * @version 0.10.0
 * @since   0.10.0
 *
 *
 * @param  {number} page - Number of the page to request.
 * @param  {{
 *     page      : number
 *     filter    : ?string,
 *     order_by  : ?string,
 *     order     : ?string,
 *     page_size : ?number
 * }} query - Contains information wich modifies the results, that includes filtering, sorting and pagination.
 * @return {Promise.<{
 *     collection : {
 *         id   : number,
 *         name : number,
 *     }[],
 *     pagination : {
 *         rowCount  : number,
 *         pageCount : number,
 *         page      : number,
 *         pageSize  : number,
 *     }
 * }, Error>} On success returns a Promise fullfilled with an object which contains a list of
 *            states and the pagination information, otherwise rejects with Error.
*/
async function getPage(query) {
	try {
		const options = {
			pageSize : query.page_size > 0 && query.page_size <= 100 ? query.page_size : 25,
			page     : query.page > 0 ? query.page : 1,
		};
		const column = query.order_by || "name";
		const order  = query.order || "ASC";

		const stateCollection = await StateModel.query(function(builder) {
			builder
				.columns("state.*");

			if (query.filter) {
				builder.where("name", "LIKE", `%${query.filter}%`);
			}

			builder.orderBy(column, order);
		}).fetchPage(options);

		const collection = stateCollection.models.map(stateModel => stateModel.attributes);

		return {
			collection : collection,
			pagination : stateCollection.pagination,
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

module.exports = {
	getPage,
};
