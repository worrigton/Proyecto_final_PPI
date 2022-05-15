/* eslint-disable no-console */
/* eslint-disable camelcase */
// Import Dependences
import { bookshelf } from "~/Server/database/db";

// Import Models
import CategoryModel from "~/Server/database/models/products/category";

/**
 * Inserts a new category register into the database.
 *
 * @author  Montserrat Delgado Alvarez
 * @version 0.10.0
 * @since   0.10.0
 * @param {{
 *     name : string
 * }} body - Constains the necesary information to create the new register.
 * @return {Promise.<number, Error>} Returns a Promise which in case of success is fullfilled with the
 *                                   new record's database ID, otherwise rejects with some error.
*/
async function addCategory(body, transacting = undefined) {
	async function doWork(t) {
		const attributes = {
			name : body.name,
		};

		const options = {
			transacting : t,
		};

		const categoryModel = await new CategoryModel().save(attributes, options);


		return { id : categoryModel.id };
	}

	return transacting
		? doWork(transacting)
		: bookshelf.transaction(doWork);
}

/**
 * Returns a list of categorys with pagination information from the database.
 *
 * @author  Montserrat Delgado Alvarez
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
 *            categorys and the pagination information, otherwise rejects with Error.
*/
async function getPage(page, query) {
	try {
		const options = {
			pageSize : query.page_size > 0 && query.page_size <= 100 ? query.page_size : 25,
			page     : page > 0 ? page : 1,
		};
		const column = query.order_by || "name";
		const order  = query.order || "DESC";

		const categoryCollection = await CategoryModel.query(function(builder) {
			builder
				.columns("category.*")
				.orderBy(column, order);

			if (query.filter) {
				builder.where("name", "LIKE", `%${query.filter}%`);
			}
		}).fetchPage(options);

		const collection = categoryCollection.models.map(categoryModel => categoryModel.attributes);

		return {
			collection : collection,
			pagination : categoryCollection.pagination,
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
	addCategory,
	getPage,
};
