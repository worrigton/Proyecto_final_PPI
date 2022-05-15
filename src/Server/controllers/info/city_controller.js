/* eslint-disable camelcase */
// Import Models
import CityModel from "~/Server/database/models/info/city";

/**
 * Returns a list of cities with pagination information from the database.
 *
 * @author  Montserrat Delgado Alvarez
 * @version 0.10.0
 * @since   0.10.0
 *
 *
 * @param  {number} page - Number of the page to request.
 * @param  {{
 *     page      : number,
 *     state_id  : ?number,
 *     filter    : ?string,
 *     order_by  : ?string,
 *     order     : ?number,
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
 *         pageSize  : number
 *     }
 * }, Error>} On success returns a Promise fullfilled with an object which contains a list of
 *            cities and the pagination information, otherwise rejects with Error.
*/
async function getPage(query) {
	try {
		const options = {
			pageSize : query.page_size > 0 && query.page_size <= 1000 ? query.page_size : 25,
			page     : query.page > 0 ? query.page : 1,
		};
		const column = query.order_by || "name";
		const order  = query.order || "ASC";

		const cityCollection = await CityModel.query(function(builder) {
			builder
				.columns("city.*")
				.orderBy(column, order);

			if (query.filter) {
				builder.where("name", "LIKE", `%${query.filter}%`);
			}

			if (query.state_id) {
				builder.where("state_id", query.state_id);
			}

			builder.orderBy(column, order);
		}).fetchPage(options);

		const collection = cityCollection.models.map(cityModel => cityModel.attributes);

		return {
			collection : collection,
			pagination : cityCollection.pagination,
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
