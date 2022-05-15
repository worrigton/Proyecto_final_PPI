/* eslint-disable no-console */
/* eslint-disable camelcase */
// Import Dependences
import { bookshelf } from "~/Server/database/db";

// Import Models
import FeatureModel from "~/Server/database/models/products/feature";

/**
 * Inserts a new feature register into the database.
 *
 * @author  Cesar A. Herrera de la T.
 * @version 0.10.0
 * @since   0.10.0
 * @param {{
 *     name : string
 * }} body - Constains the necesary information to create the new register.
 * @return {Promise.<number, Error>} Returns a Promise which in case of success is fullfilled with the
 *                                   new record's database ID, otherwise rejects with some error.
*/
const addFeature = async (body, transacting) => {
	const doWork = async ()  => {
		const attributes = {
			name : body.name,
		};

		const featureModel = await new FeatureModel().save(attributes, { transacting });

		return { id : featureModel.id };
	};

	return transacting
		? doWork()
		: bookshelf.transaction(doWork);
};

/**
 * Returns a list of features with pagination information from the database.
 *
 * @author  Cesar A. Herrera de la T.
 * @version 0.10.0
 * @since   0.10.0
 *
 *
 * @param  {number} page - Number of the page to request.
 * @param  {{
 *     filter    : ?string,
 *     order_by  : ?string,
 *     order     : ?string,
 *     page_size : ?number
 * }} query - Contains information wich modifies the results, that includes filtering, sorting and pagination.
 * @return {Promise.<{
 *     collection : {
 *         id            : number,
 *         name          : number,
 *     }[],
 *     pagination : {
 *         rowCount  : number,
 *         pageCount : number,
 *         page      : number,
 *         pageSize   : number
 *     }
 * }, Error>} On success returns a Promise fullfilled with an object which contains a list of
 *            features and the pagination information, otherwise rejects with Error.
*/
async function getPage(page, query) {
	try {
		const options = {
			pageSize : query.page_size > 0 && query.page_size <= 1000 ? query.page_size : 25,
			page     : page > 0 ? page : 1,
		};
		const column = query.order_by || "name";
		const order  = query.ord || "DESC";

		const featureCollection = await FeatureModel.query(function(builder) {
			builder
				.columns("feature.*")
				.orderBy(column, order);

			if (query.filter) {
				builder.where("name", "LIKE", `%${query.filter}%`);
			}
		}).fetchPage(options);

		const collection = featureCollection.models.map(featureModel => featureModel.attributes);

		return {
			collection : collection,
			pagination : featureCollection.pagination,
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
	addFeature,
	getPage,
};
