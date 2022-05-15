/* eslint-disable no-console */
/* eslint-disable camelcase */
// Import Dependences
// import { bookshelf } from "~/Server/database/db";

// Import Models
import SubscriptionModel from "~/Server/database/models/info/subscription";

/**
 * Returns a list of subscriptions with pagination information from the database.
 *
 * @author  Cesar A. Herrera de la T.
 * @version 0.10.0
 * @since   0.10.0
 *
 *
 * @param  {number} page - Number of the page to request.
 * @param  {{
*     filter           : ?string,
*     order_by         : ?string,
*     order            : ?string,
*     page_size        : ?number
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
*            subscriptions and the pagination information, otherwise rejects with Error.
*/
export const getPage = async (query) => {
	try {
		const options = {
			pageSize    : query.page_size > 0 && query.page_size <= 1000 ? query.page_size : 25,
			page        : query.page > 0 ? query.page : 1,
			withRelated : ["features"],
		};

		const column = query.order_by || "name";
		const order  = query.order || "ASC";

		const subscriptionCollection = await SubscriptionModel.query(function(builder) {
			builder
				.columns("subscription.*")
				.orderBy(column, order);

			if (query.filter) {
				builder.where("name", "LIKE", `%${query.filter}%`);
			}
		}).fetchPage(options);

		const collection = subscriptionCollection.models.map(subscriptionModel => {
			const features = subscriptionModel.related("features");
			subscriptionModel.attributes.features = features;
			return subscriptionModel.attributes;
		});

		return {
			collection : collection,
			pagination : subscriptionCollection.pagination,
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
