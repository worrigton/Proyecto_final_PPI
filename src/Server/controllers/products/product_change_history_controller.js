/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable camelcase */
// Import Dependences
import { bookshelf, knex } from "~/Server/database/db";
import { PythonShell }     from "python-shell";
import { v4 as uuidv4 }    from "uuid";
import mkdirp              from "mkdirp";

// Import Models
import FileModel                           from "~/Server/database/models/info/file";
import ProductChangeHistoryModel           from "~/Server/database/models/products/product_change_history";
import ProductChangeHistoryHasFileModel    from "~/Server/database/models/products/product_change_history_has_file";
import ProductChangeHistoryHasFeatureModel from "~/Server/database/models/products/product_change_history_has_feature";

// Import Controllers
import ImageController   from "~/Server/controllers/image/image_controller";
import ProductController from "~/Server/controllers/products/product_controller";

// Import Helpers
import { getSubObjWithKeys } from "~/Util";

const EXEC_PATH = process.cwd().replace(/[\\]+/ig, "/");

// Tamaños que se manejaran al subir una imagen para usuarios
const IMAGE_SIZES = {
	"xs" : 72,
	"sm" : 144,
	"md" : 384,
	"lg" : 512,
};

/**
 * Resizing an image and store image resizing in the new path location
 *
 * @author  Montserrat Delgado Alvarez
 * @version 0.10.0
 * @since   0.10.0
 *
 * @param {string} fileName
 * @param {string} inputPath
 * @param {string} outputPath
 * @param {number} sizeValue
 */
const resizeImage = async (fileName, inputPath, outputPath, sizeValue) => {
	try {
		const options  = {
			mode       : "text",
			scriptPath : `${ EXEC_PATH }/src/Server/scripts/python`,
			args       : [`${ inputPath }/${ fileName }`, outputPath, sizeValue],
		};

		mkdirp.sync(outputPath);

		PythonShell.run("image_resizing.py", options, function(err, results) {
			if (err) {
				throw { ...err };
			}
			return;
		});
	} catch (error) {
		throw { ...error };
	}
};

/**
 * Stores an image in the file system before call function for resizing a original image
 * and saves the full path in the database's product register by the given ID.
 *
 * @author  Montserrat Delgado Alvarez
 * @version 0.10.0
 * @since   0.10.0
 *
 * @param  {number} productChangeId - Product database's ID.
 * @param  {string|Base64} imageBase64 - Source image in base64 string format.
 * @param  {?Transaction} transacting -  Indictes in which transaction this opration will run,
 * @return {Promise.<undefined, Error>} On success fulfills a Promise without any information,
 *                                      otherwise rejects with some error.
 */
const addImage = async (imageBase64, randomUuid, productChangeId, imageNumber, transacting = undefined) => {
	const doWork = async (t, attributes) => {
		const options = {
			transacting : t,
		};

		const fileModel = await new FileModel().save(attributes, options);
		return fileModel.id;
	};

	try {
		const base64String = imageBase64.split(",");
		const extension    = base64String[0].substring(11, base64String[0].indexOf(";")).toLowerCase();
		const image        = base64String[1];

		const fileName = `${ productChangeId }.${ extension }`;
		const fileDir  = `${ EXEC_PATH }/src/Server/storage/images/products/${randomUuid}/${productChangeId}/${imageNumber}`;
		const path     = `/src/Server/storage/images/products/${randomUuid}/${productChangeId}/${imageNumber}/${ fileName }`;

		mkdirp.sync(fileDir);

		const filePath = `${ fileDir }/${ fileName }`;

		await ImageController.saveFromBase64(filePath, image);

		for (const [sizeKey, sizeValue] of Object.entries(IMAGE_SIZES)) {
			const destPath =
				`${ EXEC_PATH }/src/Server/storage/images/products/${randomUuid}/${productChangeId}/${imageNumber}/${sizeKey}`;
			await resizeImage(fileName, fileDir, destPath, sizeValue);
		}

		const attributes = {
			path,
			ext : extension,
		};

		return transacting
			? doWork(transacting, attributes)
			: bookshelf.transaction(doWork);
	} catch (error) {
		throw {
			status  : 500,
			label   : "FILE_SYSTEM_ERROR",
			message : "There was a problem in the server's file system.",
			error   : error,
		};
	}
};

/**
 * Adds a list of file to some product_change_history by the given product_change_history ID.
 * The position of each branch is considered in the database.
 *
 * @param  {number} productChangeHistoryId - product_change_history's database ID.
 * @param  {number[]} fileIds - Contains the list of files to insert.
 * @param  {?Transaction} transacting - If it is not null means that the insertions runs under that transaction,
 *                                      otherwise begins its own transaction.
 * @return {Promise.<undefined, Error>} Returns a Promise fulfilled without any data in case of success,
 *                                      otherwise is rejected.
 */
function linkFilesToProduct(productChangeHistoryId, fileIds, transacting = null) {
	const doWork = async (t) => {
		const options = { transacting : t };

		for (const fileId of fileIds) {
			const attributes = {
				product_change_history_id : productChangeHistoryId,
				file_id                   : fileId,
			};
			await new ProductChangeHistoryHasFileModel().save(attributes, options);
		}

		return;
	};

	return transacting
		? doWork(transacting)
		: bookshelf.transaction(doWork);
}

/**
 * Adds a list of feature to some product_change_history by the given product_change_history ID.
 * The position of each branch is considered in the database.
 *
 * @param  {number} productChangeHistoryId - product_change_history's database ID.
 @param  {{
 *    [feature_id] : label | string,
 * }[]} features - Contains the list of features to insert.
 * @param  {?Transaction} transacting - If it is not null means that the insertions runs under that transaction,
 *                                      otherwise begins its own transaction.
 * @return {Promise.<undefined, Error>} Returns a Promise fulfilled without any data in case of success,
 *                                      otherwise is rejected.
 */
function linkFeatureToProduct(productChangeHistoryId, features, transacting = null) {
	const doWork = async (t) => {
		const options = { transacting : t };

		for (const [featureId, label] of Object.entries(features)) {
			const attributes = {
				product_change_history_id : productChangeHistoryId,
				feature_id                : featureId,
				label,
			};

			await new ProductChangeHistoryHasFeatureModel().save(attributes, options);
		}
		return;
	};

	return transacting
		? doWork(transacting)
		: bookshelf.transaction(doWork);
}

/**
 * Inserts a new product register into the database or register a new change history.
 *
 * @author  Montserrat Delgado Alvarez
 * @version 0.10.0
 * @since   0.10.0
 * @param {{
 *     name               : string,
 *     description        : string,
 *     category_id        : number,
 *     user_id            : number,
 *     product_details_id : ?number,
 *     features           : ?object,
 *     images             : ?string[],
 *     user_type          : string,
 *     image_ids          : ?number[],
 * }} body - Constains the necesary information to create the new register.
 * @return {Promise.<number, Error>} Returns a Promise which in case of success is fullfilled with the
 *                                   new record's database ID, otherwise rejects with some error.
*/
const newProductRequest = async (body, transacting = undefined) => {
	const doWork = async (t) => {
		const attributes = {
			name               : body.name,
			description        : body.description,
			category_id        : body.category_id,
			user_id            : body.user_id,
			status             : (body.user_type === "ADMIN") ? "APPROVED" : "REVIEW",
			product_details_id : body.product_details_id || undefined,
			type               : body.product_details_id ? "EDIT" : "CREATE",
		};
		const options = {
			transacting : t,
		};

		const updOptions = {
			transacting : t,
			method      : "update",
			patch       : true,
		};

		body.file_ids = [];

		let productChangeHistoryModel = await new ProductChangeHistoryModel().save(attributes, options);
		await linkFeatureToProduct(productChangeHistoryModel.id, body.features, t);

		if (body.images) {
			const randomUuid = uuidv4();
			for (let key in body.images) {
				key = parseInt(key);
				const imageId =
					await addImage(body.images[key], randomUuid, productChangeHistoryModel.id, (key + 1), t);
				body.file_ids.push(imageId);
			}
		}

		body.file_ids = body.image_ids ? [ ...body.file_ids, ...body.image_ids ] : body.file_ids;

		if (body.file_ids.length > 0) {
			await linkFilesToProduct(productChangeHistoryModel.id, body.file_ids, t);
		}
		if (body?.user_type === "ADMIN" && attributes.type === "CREATE") {
			const ProductDetailsId = await ProductController.addProductDetails(body, t);
			productChangeHistoryModel = await productChangeHistoryModel.save({
				product_details_id : ProductDetailsId,
			}, updOptions);
		} else if (body.user_type === "ADMIN" && attributes.type === "EDIT") {
			await ProductController.updateProductDetails(body.product_details_id, body, t);
		}

		return { id : productChangeHistoryModel.id };
	};

	return transacting
		? doWork(transacting)
		: bookshelf.transaction(doWork);
};

/**
 * Returns a list of product change history with pagination information from the database.
 *
 * @author  Montserrat Delgado Alvarez
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
 *     status    : ?string,
 *     type      : ?string,
 * }} query - Contains information wich modifies the results, that includes filtering, sorting and pagination.
 * @return {Promise.<{
 *     collection : {
 *         id                 : number,
 *         user_id            : number,
 *         category_id        : number,
 *         product_details_id : number
 *         name               : string
 *         description        : string
 *         type               : string,
 *         status             : string,
 *         date               : string,
 *         category           : string,
 *         username           : string,
 *         images_ids         : []number,
 *     }[],
 *     pagination : {
 *         rowCount  : number,
 *         pageCount : number,
 *         page      : number,
 *         pageSize  : number
 *     }
 * }, Error>} On success returns a Promise fullfilled with an object which contains a list of
 *            providers and the pagination information, otherwise rejects with Error.
*/
const getPage = async (query) => {
	try {
		const options = {
			pageSize    : query.page_size > 0 && query.page_size <= 100 ? query.page_size : 25,
			page        : query.page > 0 ? query.page : 1,
			withRelated : ["files"],
		};
		const column     = query.order_by    || "id";
		const order      = query.order       || "DESC";
		const imageSize  = query.image_size  || "xs";
		const imageArray = query.image_array || undefined;

		const productChangeHistoryCollection = await ProductChangeHistoryModel.query(function(builder) {
			builder.columns(
				"product_change_history.*",
				function() {
					this.select("c.name")
						.from("category AS c")
						.where("c.id", "=", knex.raw("product_change_history.category_id"))
						.as("category");
				},
				function() {
					this.select("u.username")
						.from("user AS u")
						.where("u.id", "=", knex.raw("product_change_history.user_id"))
						.as("username");
				}
			);

			if (query.filter) {
				builder
					.where(function() {
						this.orWhere("name", "LIKE", `%${ query.filter }%`)
							.orWhere("description", "LIKE", `%${ query.filter }%`)
							.orWhereIn("user_id", function() {
								this.select("u.id")
									.from("user AS u")
									.orWhere("u.email", "LIKE", `%${ query.filter }%`)
									.orWhere("u.username", "LIKE", `%${ query.filter }%`);
							})
							.orWhereIn("category_id", function() {
								this.select("c.id")
									.from("category AS c")
									.orWhere("c.name", "LIKE", `%${ query.filter }%`);
							});
					});
			}

			if (query.status) {
				builder.where("status", query.status);
			}

			if (query.type) {
				builder.where("type", query.type);
			}

			builder.orderBy(column, order);
		}).fetchPage(options);

		const collection = productChangeHistoryCollection.models.map(productChangeHistoryModel => {
			const fileIds = productChangeHistoryModel.related("files")
				.models.map(
					file => file.attributes.id
				);
			if (imageArray) {
				const images = productChangeHistoryModel.related("files").models.map(
					fileModel => IMAGE_SIZES.reduce((accum, size) => ({
						...accum,
						[size] : `/api/images/products/${size}/${fileModel.attributes.id}`,
					}), { "original" : `/api/images/products/${fileModel.attributes.id}` }));
				productChangeHistoryModel.attributes.images = images;
			}

			const image = productChangeHistoryModel.related("files").models.reduce((accum, fileModel) =>
				accum = `/api/images/products/${imageSize}/${fileModel.attributes.id}`
			, "");
			productChangeHistoryModel.attributes.image           = image;

			productChangeHistoryModel.attributes.images_ids = fileIds;
			return productChangeHistoryModel.attributes;
		});

		return {
			collection : collection,
			pagination : productChangeHistoryCollection.pagination,
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

/**
 * Gets from the database a product changr history register according to the given ID.
 *
 * @author  Montserrat Delgado Alvarez
 * @version 0.10.0
 * @since   0.10.0
 *
 * @param  {number} id - Database ID of the color.
 * @return {Promise.<{
 *     id                    : number,
 *     user_id               : number,
 *     first_name            : string,
 *     legal_name            : string
 *     store_name            : string
 *     trade_name            : string
 *     last_name             : string,
 *     email                 : string,
 *     total_products        : number,
 *     total_active_products : number,
 * } , Error>} Returns a promise, in case of success is fullfilled with the found record attributes,
 *            otherwise rejects with some error.
 *
 */
const getProductChangeHistory = async (id) => {
	try {
		const options = {
			withRelated : ["files", "features"],
		};

		const productChangeHistoryModel = await new ProductChangeHistoryModel({ id : id })
			.query(function(builder) {
				builder.columns(
					"product_change_history.*",
					function() {
						this.select("c.name")
							.from("category AS c")
							.where("c.id", "=", knex.raw("product_change_history.category_id"))
							.as("category");
					},
					function() {
						this.select("u.username")
							.from("user AS u")
							.where("u.id", "=", knex.raw("product_change_history.user_id"))
							.as("username");
					}
				);
			}).fetch(options);

		const data = productChangeHistoryModel.attributes;

		const images_ids = productChangeHistoryModel.related("files").models
			.map(file => file.attributes.id);

		const features = productChangeHistoryModel.related("features").models
			.map(file => file.attributes);

		data.images_ids = images_ids;
		data.features   = features;

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
 * This function approve a request product changes and
 * modify the status of that record.
 *
 * @author  Montserrat Delgado Alvarez
 * @version 0.10.0
 * @since   0.10.0
 *
 *
 * @param  {{
 *     id : number,
 * }} body -Contains the information necesary for approve a product change history request.
 * @return {Promise.<{
 *    id : number,
 * }, Error>} On success returns a Promise fullfilled with an object which contains a id
 * the modified record.
*/
const approveProductChangeHistory = async (body, transacting = undefined) => {
	async function doWork(t) {
		const updOptions = {
			transacting : undefined,
			method      : "update",
			patch       : true,
		};

		const productChangeHistory = await getProductChangeHistory(body.id);
		const data = getSubObjWithKeys(productChangeHistory, [
			"name",
			"description",
			"category_id",
			"user_id",
			"product_details_id",
			"image_ids",
			"type",
			"status",
		]);

		if (data.status === "APPROVED" || data.status === "REJECTED") {
			throw {
				status  : 400,
				label   : "BAD_REQUEST",
				message : "The status of this request is already approved or rejected",
				info    : { data },
			};
		}

		data.product_details_id = productChangeHistory.product_details_id || undefined;
		data.user_type          = body.user_type;
		data.features           = productChangeHistory.features.reduce((accum, feature) => ({
			...accum,
			[feature.id] : feature.label,
		}), {});
		data.file_ids           = productChangeHistory.images_ids;

		const productChangeHistoryModel = await new ProductChangeHistoryModel({ id : body.id }).fetch(updOptions);

		if (!productChangeHistoryModel) {
			throw {
				status  : 409,
				label   : "NOT_FOUND",
				message : `Requested 'product_change_history' with ID [${ body.id }] was not found`,
				info    : { data },
			};
		}

		if (data?.user_type === "ADMIN" && data.type === "CREATE") {
			const ProductDetailsId = await ProductController.addProductDetails(data);
			await productChangeHistoryModel.save({
				product_details_id : ProductDetailsId,
				status             : "APPROVED",
			}, updOptions);
		} else if (body.user_type === "ADMIN" && data.type === "EDIT") {
			await ProductController.updateProductDetails(data.product_details_id, data);
			await productChangeHistoryModel.save({
				status : "APPROVED",
			}, updOptions);
		}

		return { id : body.id };

	}

	return transacting
		? doWork(transacting)
		: bookshelf.transaction(doWork);
};

/**
 * This function reject a request product changes and
 * modify the status of that record.
 *
 * @author  Montserrat Delgado Alvarez
 * @version 0.10.0
 * @since   0.10.0
 *
 *
 * @param  {{
 *     id : number,
 * }} body -Contains the information necesary for reject a product change history request.
 * @return {Promise.<{
 *    id : number,
 * }, Error>} On success returns a Promise fullfilled with an object which contains a id
 * the modified record.
*/
const rejectProductChangeHistory = async (body, transacting = undefined) => {
	async function doWork(t) {
		const updOptions = {
			transacting : undefined,
			method      : "update",
			patch       : true,
		};

		const productChangeHistory = await getProductChangeHistory(body.product_details_id);

		const data = getSubObjWithKeys(productChangeHistory, [
			"status",
		]);

		if (data.status === "APPROVED" || data.status === "REJECTED") {
			throw {
				status  : 400,
				label   : "BAD_REQUEST",
				message : "The status of this request is already approved or rejected",
				info    : { data },
			};
		}

		data.product_details_id = productChangeHistory.product_details_id || undefined;
		data.user_type          = body.user_type;

		const productChangeHistoryModel = await new ProductChangeHistoryModel({ id : body.product_details_id }).fetch(updOptions);

		if (!productChangeHistoryModel) {
			throw {
				status  : 409,
				label   : "NOT_FOUND",
				message : `Requested 'product_change_history' with ID [${ body.product_details_id }] was not found`,
				info    : { data },
			};
		}

		if (data?.user_type === "ADMIN") {
			await productChangeHistoryModel.save({
				status : "REJECTED",
			}, updOptions);
		}

		return { id : body.product_details_id };

	}

	return transacting
		? doWork(transacting)
		: bookshelf.transaction(doWork);
};

module.exports = {
	newProductRequest,
	getPage,
	getProductChangeHistory,
	approveProductChangeHistory,
	rejectProductChangeHistory,
};
