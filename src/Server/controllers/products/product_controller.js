/* eslint-disable no-console */
/* eslint-disable camelcase */
// Import Dependences
import { bookshelf, knex } from "~/Server/database/db";
import _                   from "lodash";

// Import Models
import ProductDetailsModel           from "~/Server/database/models/products/product_details";
import ProductDetailsHasFileModel    from "~/Server/database/models/products/product_details_has_file";
import ProductDetailsHasFeatureModel from "~/Server/database/models/products/product_details_has_feature";
import FileModel                     from "~/Server/database/models/info/file";
import ProductModel                  from "~/Server/database/models/products/product";
import UserLikeProductDetailsModel   from "~/Server/database/models/users/user_like_products_details";
import ProductDiscountProviderModel  from "~/Server/database/models/products/product_discount_provider";
import ShippingProfilesModel         from "~/Server/database/models/providers/shipping_profiles";

const EXEC_PATH                  = process.cwd().replace(/[\\]+/ig, "/");
const DEFAULT_PRODUCT_IMAGE_PATH = `${EXEC_PATH}/src/Resources/img/Producto`;
const DEFAULT_IMAGE_NAME         = "product_not_found.png";

const PRODUCT_SIZE    = Object.values(ProductModel.SIZES_STRINGS);
const PRODUCT_QUALITY = Object.values(ProductModel.QUALITIES_STRINGS);
const IMAGE_SIZES     = [ "xs", "sm", "md", "lg"];
/**
 * Inserts a new product register into the database.
 *
 * @author  Cesar A. Herrera de la T.
 * @version 0.10.0
 * @since   0.10.0
 * @param {{
 *     product_details_id : number,
 *     size               : string,
 *     quality            : string,
 * }} body - Constains the necesary information to create the new register.
 * @return {Promise.<number, Error>} Returns a Promise which in case of success is fullfilled with the
 *                                   new record's database ID, otherwise rejects with some error.
*/
const addProduct = async (body, transacting = undefined) => {
	const doWork = async (t) => {
		const attributes = {
			size               : body.size,
			quality            : body.quality,
			product_details_id : body.product_details_id,
		};

		const options = {
			transacting : t,
		};

		const productModel = await new ProductModel().save(attributes, options);

		return productModel.id;
	};

	return transacting
		? doWork(transacting)
		: bookshelf.transaction(doWork);
};

/**
 * Adds a list of File to some product details by the given product details ID.
 * The position of each branch is considered in the database.
 *
 * @param  {number} productDetailsId - product details's database ID.
 * @param  {number[]} fileIds - Contains the list of Files to insert.
 * @param  {?Transaction} transacting - If it is not null means that the insertions runs under that transaction,
 *                                      otherwise begins its own transaction.
 * @return {Promise.<undefined, Error>} Returns a Promise fulfilled without any data in case of success,
 *                                      otherwise is rejected.
 */
const linkFilesToProduct = async (productDetailsId, fileIds, transacting = null) => {
	const doWork = async (t) => {
		const options = { transacting : t };

		for (const fileId of fileIds) {
			const attributes = {
				product_details_id : productDetailsId,
				file_id            : fileId,
			};
			await new ProductDetailsHasFileModel().save(attributes, options);
		}

		return;
	};

	return transacting
		? doWork(transacting)
		: bookshelf.transaction(doWork);
};

/**
 * Adds a list of feature to some product details by the given product details ID.
 * The position of each branch is considered in the database.
 *
 * @param  {number} productDetailsId - product details's database ID.
 * @param  {{
 *    [feature_id] : label | string,
 * }} features - Contains the list of features to insert.
 * @param  {?Transaction} transacting - If it is not null means that the insertions runs under that transaction,
 *                                      otherwise begins its own transaction.
 * @return {Promise.<undefined, Error>} Returns a Promise fulfilled without any data in case of success,
 *                                      otherwise is rejected.
 */
const linkFeaturesToProduct = async (productDetailsId, features, transacting = null) => {
	const doWork = async (t) => {
		const options = { transacting : t };

		for (const [featureId, label] of Object.entries(features)) {
			const attributes = {
				product_details_id : productDetailsId,
				feature_id         : featureId,
				label,
			};
			await new ProductDetailsHasFeatureModel().save(attributes, options);
		}
		return;
	};

	return transacting
		? doWork(transacting)
		: bookshelf.transaction(doWork);
};

/**
 * Deletes all the feature/product_details links from the database by the given product_details ID.
 *
 * @param  {number} productDetailsId - product details's database ID.
 * @param  {?Transaction} transacting - If it is not null means that the insertions runs under that transaction,
 *                                      otherwise begins its own transaction.
 * @return {Promise.<undefined, Error>} Returns a Promise fulfilling it with no information if success,
 *                                      in case af any error rejects with some error.
 */
const delFeaturesToProduct = async (productDetailsId, transacting = null) => {
	const doWork = async (t) => {
		const options = {
			transacting : t,
			require     : false,
		};

		await ProductDetailsHasFeatureModel.where("product_details_id", "=", productDetailsId).destroy(options);
	};

	return transacting
		? doWork(transacting)
		: bookshelf.transaction(doWork);
};

/**
 * Deletes all the file/product_details links from the database by the given product_details ID.
 *
 * @param  {number} productDetailsId - product details's database ID.
 * @param  {?Transaction} transacting - If it is not null means that the insertions runs under that transaction,
 *                                      otherwise begins its own transaction.
 * @return {Promise.<undefined, Error>} Returns a Promise fulfilling it with no information if success,
 *                                      in case af any error rejects with some error.
 */
const delFilesToProduct = async (productDetailsId, transacting = null) => {
	const doWork = async (t) => {
		const options = {
			transacting : t,
			require     : false,
		};

		await ProductDetailsHasFileModel.where("product_details_id", "=", productDetailsId).destroy(options);
	};

	return transacting
		? doWork(transacting)
		: bookshelf.transaction(doWork);
};

/**
 * Updates all the feature/product_details links of a specific product_details by its given ID.
 *
 * @param  {number} productDetailsId - product_details is database ID.
 * @param  {{
 *     [feature_id] : label | string,
 * }} features - Contains the new list of feature ids to link.
 * @param  {?Transaction} transacting - If it is not null means that the insertions runs under that transaction,
 *                                      otherwise begins its own transaction.
 * @return {Promise.<undefined, Error>} Returns a Promise fulfilled without any data in case of success,
 *                                      otherwise is rejected.
 */
const updateFeaturesLinkToProduct = async (productDetailsId, features, transacting = null) => {
	const doWork = async (t) => {
		await delFeaturesToProduct(productDetailsId, t);
		return linkFeaturesToProduct(productDetailsId, features, t);
	};

	return transacting
		? doWork(transacting)
		: bookshelf.transaction(doWork);
};

/**
 * Updates all the file/product_details links of a specific product_details by its given ID.
 *
 * @param  {number} productDetailsId - product_details is database ID.
 * @param  {number[]} file_ids - Contains the new list of file ids to link.
 * @param  {?Transaction} transacting - If it is not null means that the insertions runs under that transaction,
 *                                      otherwise begins its own transaction.
 * @return {Promise.<undefined, Error>} Returns a Promise fulfilled without any data in case of success,
 *                                      otherwise is rejected.
*/
const updateFilesLinkToProduct = async (productDetailsId, file_ids, transacting = null) => {
	const doWork = async (t) => {
		await delFilesToProduct(productDetailsId, t);
		return linkFilesToProduct(productDetailsId, file_ids, t);
	};

	return transacting
		? doWork(transacting)
		: bookshelf.transaction(doWork);
};

/**
 * Inserts a new product register into the database or register a new change history.
 *
 * @author  Cesar A. Herrera de la T.
 * @version 0.10.0
 * @since   0.10.0
 * @param {{
 *     name               : string,
 *     description        : string,
 *     category_id        : number,
 *     features           : object,
 *     user_type          : string,
 *     file_ids           : ?number[].
 * }} body - Constains the necesary information to create the new register.
 * @return {Promise.<number, Error>} Returns a Promise which in case of success is fullfilled with the
 *                                   new record's database ID, otherwise rejects with some error.
*/
const addProductDetails = async (body, transacting = undefined) => {
	const doWork = async (t) => {
		const attributes = {
			name        : body.name,
			description : body.description,
			category_id : body.category_id,
		};

		const options = {
			transacting : t,
		};

		const productDetailsModel = await new ProductDetailsModel().save(attributes, options);

		await linkFeaturesToProduct(productDetailsModel.id, body?.features, t);
		await linkFilesToProduct(productDetailsModel.id, body?.file_ids, t);

		for (const quality of PRODUCT_QUALITY) {
			const productData = {
				quality            : ProductModel.QUALITIES[quality],
				product_details_id : productDetailsModel.id,
			};
			for (const size of PRODUCT_SIZE) {
				productData.size = ProductModel.SIZES[size];
				await addProduct(productData, t);
			}
		}

		return productDetailsModel.id;
	};

	return transacting
		? doWork(transacting)
		: bookshelf.transaction(doWork);
};

/**
 * Updates a specific Product Details register which already
 * exists into the database by the given ID.
 *
 *
 * @author  Cesar A. Herrera de la T.
 * @version 0.10.0
 * @since   0.10.0
 *
 * @param {number} id,
 * @param {{
 *     name               : string,
 *     description        : string,
 *     category_id        : number,
 *     features           : object,
 *     user_type          : string,
 *     file_ids           : ?number[].
 * }} body - Constains the necesary information to create the new register.
 * @return {Promise.<undefined, Error>} Returns a promise which in case of success is fullfilled without
 *                                      any information, if any problem then is rejected with some error.
*/
const updateProductDetails = async (id, body, transacting = undefined) => {
	const doWork = async (t) => {
		const attributes = {
			name        : body.name,
			description : body.description,
			category_id : body.category_id,
		};

		const options = {
			transacting : t,
		};

		const updOptions = {
			transacting : t,
			method      : "update",
			patch       : true,
		};

		const productDetailsModel = await new ProductDetailsModel({ id : id }).fetch(options);

		if (!productDetailsModel) {
			throw {
				status  : 409,
				label   : "NOT_FOUND",
				message : `Requested 'product' with ID [${ id }] was not found`,
				info    : { attributes },
			};
		}

		if (body?.features) {
			await updateFeaturesLinkToProduct(id, body.features, t);
		}

		if (body?.file_ids) {
			await updateFilesLinkToProduct(id, body.file_ids, t);
		}

		return productDetailsModel.save(attributes, updOptions);
	};

	return transacting
		? doWork(transacting)
		: bookshelf.transaction(doWork);
};

/**
 * Return filePath in the correct format
 *
 * @author  Cesar A. Herrera de la T.
 * @version 0.10.0
 * @since   0.10.0
 *
 * @param {string} filePath
 * @param {string} size
 */
const parseImagePath = async (filePath, size) => {
	let pathFile = filePath.split("/");
	const fileName = pathFile.pop();
	pathFile = `${pathFile.join("/")}/${size}/${fileName}`;

	return pathFile;
};

/**
 * Gets from the database a price list register according to the given ID.
 *
 * @author  Cesar A. Herrera de la T.
 * @version 0.10.0
 * @since   0.10.0
 *
 * @param  {{
 *     file_id : number,
 *     size    : string,
 * }} body - Constains the necesary information to get image path.
 * @return {Promise.<{
 *     imagePath : string,
 * }, Error>} Returns a promise, in case of success is fullfilled with the found record attributes,
*            otherwise rejects image_not_found path.
*/
const getImageProduct = async (body) => {
	try {
		const fileModel = await new FileModel({ id : body.file_id }).fetch();

		let imagePath = body.size
			? await parseImagePath(fileModel.attributes.path, body.size)
			: fileModel.attributes.path.replace(/[\\]+/ig, "/");

		imagePath = `${EXEC_PATH}/${imagePath}`;
		return imagePath;

	} catch (error) {
		// In case of error return a default image path for the products
		const imagePath =  body.size
			? `${DEFAULT_PRODUCT_IMAGE_PATH}/${body.size}/${DEFAULT_IMAGE_NAME}`
			: `${DEFAULT_PRODUCT_IMAGE_PATH}/${DEFAULT_IMAGE_NAME}`;
		return imagePath;
	}
};

/**
 * Returns a list of products details with pagination information from the database.
 *
 * @author  Cesar A. Herrera de la T.
 * @version 0.10.0
 * @since   0.10.0
 *
 *
 * @param  {number} page - Number of the page to request.
 * @param  {{
 *     page                    : number,
 *     filter                  : ?string,
 *     order_by                : ?string,
 *     order                   : ?string,
 *     page_size               : ?number,
 *     total_offers            : ?string|bolean,
 *     cheaper_product         : ?string|bolean,
 *     frezee                  : ?string|bolean,
 *     pending_changes         : ?string|bolean,
 *     date_start              : ?string,
 *     date_end                : ?string,
 *     min_price               : ?number,
 *     max_price               : ?number,
 *     only_offered            : ?string|bolean,
 *     image_size              : ?string|bolean,
 *     image_array             : ?string|bolean,
 *     volume_discount         : ?string|bolean,
 *     state_id                : ?number,
 *     provider_id             : ?number,
 *     product_provider_status : ?string,
 *     user_liked_product      : ?number,
 * }} query - Contains information wich modifies the results, that includes filtering, sorting and pagination.
 * @return {Promise.<{
 *     collection : {
 *         id              : number,
 *         category_id     : number,
 *         name            : string
 *         description     : string
 *         created_at      : string,
 *         category        : string,
 *         pending_changes : number,
 *         cheaper_product : number,
 *         images          : []object,
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
		const providerId            = query.provider_id || undefined;
		const productProviderStatus = query.product_provider_status || undefined;

		const options     = {
			pageSize    : query.page_size > 0 && query.page_size <= 100 ? query.page_size : 25,
			page        : query.page > 0 ? query.page : 1,
			withRelated : providerId ? [
				"files",
				{
					"products" : function(qb) {
						qb
							.columns(
								function() {
									this.select("id")
										.from("provider_has_product AS php")
										.where("php.product_id", knex.raw("product.id"))
										.where("php.provider_id", providerId)
										.as("provider_has_product_id");
								},
								function() {
									this.select("price")
										.from("provider_has_product AS php")
										.where("php.product_id", knex.raw("product.id"))
										.where("php.provider_id", providerId)
										.as("price");
								},
								function() {
									this.select("flags")
										.from("provider_has_product AS php")
										.where("php.product_id", knex.raw("product.id"))
										.where("php.provider_id", providerId)
										.as("flags");
								},
								function() {
									this.select("status")
										.from("provider_has_product AS php")
										.where("php.product_id", knex.raw("product.id"))
										.where("php.provider_id", providerId)
										.as("status");
								},
							)
							.whereIn("product.id", function() {
								this.select("php.product_id")
									.from("provider_has_product AS php")
									.where("php.provider_id", providerId);
								if (productProviderStatus) {
									this.where("php.status", productProviderStatus);
								} else {
									this.where("php.status", "<>", "DELETE");
								}
							});
					},
				},
			] : ["files"],
		};

		const column = query.order_by || "id";
		const order  = query.order    || "DESC";

		const pendingChanges = query.pending_changes ? true : false;
		const cheaperProduct = query.cheaper_product ? true : false;
		const totalOffers    = query.total_offers    ? true : false;
		const onlyOffered    = query.only_offered    ? true : false;
		const frezee         = query.frezee          ? true : false;

		const dateEnd   = query.end_date   ? query.end_date   : undefined;
		const minPrice  = query.min_price  ? parseInt(query.min_price)       : undefined;
		const maxPrice  = query.max_price  ? parseInt(query.max_price)       : undefined;
		const dateStart = query.start_date ? query.start_date : undefined;

		const filter           = query.filter             || undefined;
		const stateId          = query.state_id           || undefined;
		const categoryId       = query.category_id        || undefined;
		const imageSize        = query.image_size         || "xs";
		const imageArray       = query.image_array        || undefined;
		const userLikedProduct = query.user_liked_product || undefined;
		const pausedProducts   = query.paused_products    || undefined;
		const volumeDiscount   = query.volume_discount    || undefined;

		const productDetails = ProductDetailsModel.query(function(builder) {
			builder.columns(
				"product_details.*",
				function() {
					this.select("c.name")
						.from("category AS c")
						.where("c.id", "=", knex.raw("product_details.category_id"))
						.as("category");
				}
			);

			// Validacion para agregar mas informacion
			if (providerId) {
				builder.columns(
					function() {
						this.select("ulpd.id")
							.from("user_like_product_details as ulpd")
							.where("ulpd.user_id", function() {
								this.select("pr.user_id")
									.from("provider AS pr")
									.where("pr.id", providerId);
							})
							.where("ulpd.product_details_id", "=", knex.raw("product_details.id"))
							.as("favorite");
					}
				);
			}

			if (pendingChanges) {
				builder.columns(
					function() {
						this.count("* as count")
							.from("product_change_history AS pch")
							.where("pch.product_details_id", knex.raw("product_details.id"))
							.where("status", "REVIEW")
							.as("pending_changes");
					}
				);
			}

			if (cheaperProduct) {
				builder.columns(
					function() {
						this.select("php.price")
							.from("provider_has_product AS php")
							.whereIn("php.product_id", function() {
								this.select("p.id")
									.from("product AS p")
									.orWhere("p.product_details_id", knex.raw("product_details.id"));
							})
							.limit(1)
							.orderBy("php.price", "ASC")
							.as("cheaper_product");
					}
				);
			}

			if (totalOffers) {
				builder.columns(
					function() {
						this.count("* as count")
							.from("provider_has_product AS php")
							.whereIn("php.product_id", function() {
								this.select("p.id")
									.from("product AS p")
									.where("p.product_details_id", knex.raw("product_details.id"));
							})
							.where("status", "ACTIVE")
							.as("total_offers");
					}
				);
			}

			// Logica para filtrar busquedas
			if (filter) {
				builder
					.where(function() {
						this.orWhere("name", "LIKE", `%${ filter }%`)
							.orWhere("description", "LIKE", `%${ filter }%`)
							.orWhereIn("category_id", function() {
								this.select("c.id")
									.from("category AS c")
									.orWhere("c.name", "LIKE", `%${ filter }%`);
							});
					});
			}

			if (dateStart || dateEnd) {
				if (dateStart) {
					builder.where("created_at", ">=", dateStart);
				}

				if (dateEnd) {
					builder.where("created_at", "<=", dateEnd);
				}
			}

			if (categoryId) {
				builder.where("category_id", categoryId);
			}

			if (userLikedProduct) {
				builder.whereIn("id", function() {
					this.select("ulpd.product_details_id")
						.from("user_like_product_details as ulpd")
						.where("ulpd.user_id", userLikedProduct);
				});
			}

			if (volumeDiscount) {
				builder.whereIn("id", function() {
					this.select("pdp.product_details_id")
						.from("product_discount_provider as pdp")
						.groupBy("pdp.product_details_id");
				});
			}

			if (minPrice || maxPrice || onlyOffered || frezee || providerId || stateId) {
				builder
					.where(function() {
						this.whereIn("id", function() {
							this.select("p.product_details_id")
								.from("product AS p")
								.whereIn("p.id", function() {
									this.select("php.product_id")
										.from("provider_has_product AS php");
									if (minPrice) {
										this.where("php.price", ">=", minPrice);
									}

									if (maxPrice) {
										this.where("php.price", "<=", maxPrice);
									}

									if (onlyOffered) {
										this.where("php.status", "ACTIVE");
									}

									if (frezee) {
										this.where("flags", "FREZEE");
									}

									if (stateId) {
										this.whereIn("php.provider_id", function() {
											this.select("rp.provider_id")
												.from("region_provider as rp")
												.where("state_id", stateId);
										});
									}

									if (providerId && !pausedProducts) {
										this.where("php.provider_id", providerId);
										if (productProviderStatus) {
											this.where("php.status", productProviderStatus);
										} else {
											this.where("php.status", "<>", "DELETE");
										}
									}

									if (pausedProducts && providerId) {
										this.where("php.status", "INACTIVE")
											.where("php.provider_id", providerId);
									}
								});
						});
					});
			}
			builder.orderBy(column, order);
		});

		let productDetailsCollection;
		if (pausedProducts && providerId) {
			productDetailsCollection = await productDetails.fetchAll(options);
		} else {
			productDetailsCollection = await productDetails.fetchPage(options);
		}

		let collection = productDetailsCollection.models.map(productDetailsModel => {
			const remaining_varieties = {
				"Primera"   : Object.values(ProductModel.SIZES_STRINGS),
				"Segunda"   : Object.values(ProductModel.SIZES_STRINGS),
				"Económica" : Object.values(ProductModel.SIZES_STRINGS),
			};

			if (imageArray) {
				const images = productDetailsModel.related("files").models.map(
					fileModel => IMAGE_SIZES.reduce((accum, size) => ({
						...accum,
						[size] : `/api/images/products/${size}/${fileModel.attributes.id}`,
					}), { "original" : `/api/images/products/${fileModel.attributes.id}` }));
				productDetailsModel.attributes.images = images;
			}

			const image = productDetailsModel.related("files").models.reduce((accum, fileModel) =>
				accum = `/api/images/products/${imageSize}/${fileModel.attributes.id}`
			, "");
			productDetailsModel.attributes.image           = image;
			productDetailsModel.attributes.cheaper_product = productDetailsModel.attributes.cheaper_product || 0;

			const products = productDetailsModel.related("products")
				.models.map( providerMode => providerMode.attributes);

			if (products.length > 0) {
				productDetailsModel.attributes.varieties = products.reduce((accum, { size, quality }) => {
					const index = remaining_varieties[quality]?.indexOf(size);
					if (index > -1) {
						remaining_varieties[quality].splice(index, 1);
						if (remaining_varieties[quality].length === 0)
							delete remaining_varieties[quality];
					}
					if (!Array.isArray(accum[quality])) {
						return {
							...accum,
							[quality] : [size],
						};
					}
					return {
						...accum,
						[quality] : accum[quality].indexOf(size) === -1
							? [ ...accum[quality], size]
							: accum[quality],
					};
				}, {});
				productDetailsModel.attributes.remaining_varieties = providerId ? remaining_varieties : undefined;
			}

			productDetailsModel.attributes.products = products;
			return productDetailsModel.attributes;
		});

		if (pausedProducts && providerId) {
			collection = collection.reduce((accum, productDetails) => {
				let allInactives = true; //boolean
				productDetails.products.map(product => {
					if (product.status === "ACTIVE") {
						allInactives = false;
					}
				});
				if (allInactives) {
					accum.push(productDetails);
				}
				return accum;
			}, []);
		}

		return {
			collection : collection,
			pagination : productDetailsCollection.pagination,
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

const getProviderInfo = async (providerId, productDetailsId, stateId) => {
	const discountsCollection = await ProductDiscountProviderModel.query(function(builder) {
		builder
			.columns(
				"product_discount_provider.*",
			)
			.where("provider_id", providerId)
			.where("product_details_id", productDetailsId);

		builder.orderBy("id", "ASC");
	}).fetchAll();

	const providerModel = await ProductDetailsModel.query(function(builder) {
		builder.columns(
			function() {
				this.select("php.price")
					.from("provider_has_product AS php")
					.whereIn("php.product_id", function() {
						this.select("p.id")
							.from("product AS p")
							.where("p.product_details_id", productDetailsId);
					})
					.where("php.provider_id", providerId)
					.limit(1)
					.orderBy("php.price", "ASC")
					.as("cheaper_product");
			},
			function() {
				this.select("p.trade_name")
					.from("provider as p")
					.where("id", providerId)
					.as("name");
			}
		);
	}).fetch();

	const provider_info = providerModel.attributes;
	let discounts       = discountsCollection.models.map(discountModel => discountModel.attributes);

	const shippingTaxCollection = await ShippingProfilesModel.query(function(builder) {
		builder
			.columns(
				"shipping_profiles.*"
			)
			.where("provider_id", providerId);

		if (stateId) {
			builder.whereIn("region_provider_id", function() {
				this.select("id")
					.from("region_provider")
					.where("state_id", stateId);
			});
		}
	}).fetchAll();

	let shipping_taxes = shippingTaxCollection.models.map(shipingTaxModel => shipingTaxModel.attributes);

	discounts      = _.orderBy(discounts, ["min_weight"], ["asc"]);
	shipping_taxes = _.orderBy(shipping_taxes, ["min_weight"], ["asc"]);

	return {
		discounts,
		shipping_taxes,
		provider_info,
	};
};

/**
 * Obtain the collection of suppliers and their information on each variety of a single product
 *
 * @param {number} productDetailId
 * @return {Promise.<{
 *     products : {
 *        id                 : number,
 *        product_details_id : number,
 *        size               : string,
 *        quality            : string,
 *        providers : {
 *            id          : number | provuder_has_product_id,
 *            provider_id : number,
 *            product_id  : number,
 *            price       : number,
 *            flags       : string,
 *            stauts      : string,
 *            trade_name  : string,
 *        }[]object,
 *     }[] object,
 * } , Error>} Returns a promise, in case of success is fullfilled with the found record attributes,
 *            otherwise rejects with some error.
 */
const getProductsCollection = async (productDetailsId, providerId, stateId) => {
	const options = {
		withRelated : providerId
			? [{
				"provider_has_product_active" : function(qb) {
					qb.where("provider_id", providerId);
					if (stateId) {
						qb.where(function() {
							this.whereIn("provider_id", function() {
								this.select("rp.provider_id")
									.from("region_provider as rp")
									.where("state_id", stateId);
							});
						});
					}
				},
			}]
			: [{
				"provider_has_product_active" : function(qb) {
					if (stateId) {
						qb.where(function() {
							this.whereIn("provider_id", function() {
								this.select("rp.provider_id")
									.from("region_provider as rp")
									.where("state_id", stateId);
							});
						});
					}
				},
			}],
	};

	const productCollection = await new ProductModel()
		.query(function(builder) {
			builder
				.columns(
					"product.*"
				);
			if (providerId) {
				builder.columns(
					function() {
						this.select("price")
							.from("provider_has_product AS php")
							.where("php.product_id", knex.raw("product.id"))
							.where("php.provider_id", providerId)
							.as("price");
					},
					function() {
						this.select("flags")
							.from("provider_has_product AS php")
							.where("php.product_id", knex.raw("product.id"))
							.where("php.provider_id", providerId)
							.as("flags");
					},
					function() {
						this.select("status")
							.from("provider_has_product AS php")
							.where("php.product_id", knex.raw("product.id"))
							.where("php.provider_id", providerId)
							.as("status");
					},
				);
			}

			builder
				.where("product_details_id", productDetailsId)
				.whereIn("id", function() {
					this.select("php.product_id")
						.from("provider_has_product AS php")
						.where("php.status", "<>", "DELETE")
						.where("php.product_id", knex.raw("product.id"));
					if (providerId) {
						this.where("php.provider_id", providerId);
					}
					this.orderBy("id", "ASC");
				});

			if (stateId) {
				builder
					.where(function() {
						this.whereIn("id", function() {
							this.select("php.product_id")
								.from("provider_has_product AS php")
								.whereIn("php.provider_id", function() {
									this.select("rp.provider_id")
										.from("region_provider as rp")
										.where("state_id", stateId);
								});
						});
					});
			}
		})
		.fetchAll(options);

	const collection = productCollection.models.map(productModel => {
		const providers = productModel.related("provider_has_product_active")
			.models.map( providerModel => providerModel.attributes);
		productModel.attributes.providers = providers;
		return productModel.attributes;
	});

	return collection;
};

/**
 * Gets from the database a product details register according to the given ID.
 *
 * @author  Cesar A. Herrera de la T.
 * @version 0.10.0
 * @since   0.10.0
 *
 * @param {number} productDetailsId - Database ID of the product details.
 * @param {number} providerId - Database ID of the provideer realted of the products.
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
const getProductDetails = async ({
	id          : productDetailsId,
	user_id     : userId,
	state_id    : stateId,
	provider_id : providerId,
}) => {
	try {
		const options = {
			withRelated : ["files", "features", "products"],
		};

		const remaining_varieties = {
			"Primera"   : Object.values(ProductModel.SIZES_STRINGS),
			"Segunda"   : Object.values(ProductModel.SIZES_STRINGS),
			"Económica" : Object.values(ProductModel.SIZES_STRINGS),
		};

		const productDetailsModel = await new ProductDetailsModel({ id : productDetailsId })
			.query(function(builder) {
				builder.columns(
					"product_details.*",
					function() {
						this.select("c.name")
							.from("category AS c")
							.where("c.id", "=", knex.raw("product_details.category_id"))
							.as("category");
					}
				);

				if (userId) {
					builder.columns(
						function() {
							this.select("ulpd.id")
								.from("user_like_product_details as ulpd")
								.where("ulpd.user_id", userId)
								.where("ulpd.product_details_id", knex.raw("product_details.id"))
								.as("like");
						}
					);
				}
			}).fetch(options);
		const data      = productDetailsModel.attributes;
		data.images_ids = [];
		const images    = productDetailsModel.related("files")
			.models.map( fileModel => IMAGE_SIZES.reduce((accum, size) => {
				data.images_ids.push(fileModel.attributes.id);
				return {
					...accum,
					[size] : `/api/images/products/${size}/${fileModel.attributes.id}`,
				};
			}, { "original" : `/api/images/products/${fileModel.attributes.id}` }));
		data.images_ids = _.uniq(data.images_ids);
		const features = productDetailsModel.related("features").models
			.map(featureModel => featureModel.attributes);

		data.products  = await getProductsCollection(productDetailsId, providerId, stateId);

		data.providers = {};
		let providerIds = _(data.products).map(
			product => _(product.providers).map(p => _.pick(p, "provider_id"))
		).value();
		providerIds = providerIds.reduce((accum, provider) => {
			providerId = provider.map(p => p.provider_id);
			return [...accum, ...providerId];
		}, []);
		providerIds = _.uniq(providerIds);

		if (providerIds.length > 0) {
			for (const providerId of providerIds) {
				data.providers[providerId] = await getProviderInfo(providerId, productDetailsId);
				data.providers[providerId].varieties = data.products.reduce((accum, product) => {
					const indexProvider = _.findIndex(product.providers, function(provider) {
						return provider.provider_id == providerId;
					});

					if (indexProvider === -1) {
						return accum;
					}

					if (!Array.isArray(accum[product.quality])) {
						return {
							...accum,
							[product.quality] : [product.size],
						};
					}

					return {
						...accum,
						[product.quality] : accum[product.quality].indexOf(product.size) === -1
							? [ ...accum[product.quality], product.size]
							: accum[product.quality],
					};
				}, {});
			}
		}

		data.varieties = data.products.reduce((accum, { size, quality }) => {
			let index = -1;
			if (Object.keys(remaining_varieties).length > 0) {
				index = remaining_varieties[quality].indexOf(size);
			}

			//const index = remaining_varieties[quality].indexOf(size);

			if (index > -1) {
				remaining_varieties[quality].splice(index, 1);
				if (remaining_varieties[quality].length === 0)
					delete remaining_varieties[quality];
			}

			if (!Array.isArray(accum[quality])) {
				return {
					...accum,
					[quality] : [size],
				};
			}

			return {
				...accum,
				[quality] : accum[quality].indexOf(size) === -1
					? [ ...accum[quality], size]
					: accum[quality],
			};
		}, {});

		data.remaining_varieties = providerId ? remaining_varieties : undefined;
		data.images              = images;
		data.features            = features;
		data.like                = Boolean(data.like);
		data.product_details_id  = data.id;

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
 * Add a product to a user's favorite product list
 *
 * @param  {{
 *     product_details_id : number,
 *     user_id            : number,
 * }} body - Constains the necesary information to register the favorite product.
 *
 * @param  {?Transaction} transacting - If it is not null means that the insertions runs under that transaction,
 *                                      otherwise begins its own transaction.
 * @return {Promise.<undefined, Error>} Returns a Promise fulfilled without any data in case of success,
 *                                      otherwise is rejected.
 */
const addProductToFavorities = async (body, transacting = null) => {
	const doWork = async (t) => {
		const options = { transacting : t };
		const attributes = {
			product_details_id : body.product_details_id,
			user_id            : body.user_id,
			like_type          : "LIKE",
		};
		try {
			const ULPDModel = await new UserLikeProductDetailsModel()
				.query(function(builder) {
					builder
						.where("product_details_id", body.product_details_id)
						.where("user_id", body.user_id);
				})
				.fetch(options);

			return {
				id      : ULPDModel.attributes.id,
				message : "Este producto ya esta en tu lista de productos favoritos",
			};
		} catch (error) {
			const ULPDModel2 = await new UserLikeProductDetailsModel().save(attributes, options);
			return {
				id      : ULPDModel2.id,
				message : "Se agrego este producto a tus favoritos",
			};
		}
	};
	return transacting
		? doWork(transacting)
		: bookshelf.transaction(doWork);
};

/**
 * Delete a product to a user's favorite product list
 *
 * @param  {{
 *     product_id : number,
 *     user_id    : number,
 * }} body - Constains the necesary information to register the favorite product.
 *
 * @param  {?Transaction} transacting - If it is not null means that the insertions runs under that transaction,
 *                                      otherwise begins its own transaction.
 * @return {Promise.<undefined, Error>} Returns a Promise fulfilled without any data in case of success,
 *                                      otherwise is rejected.
*/
const deleteProductToFavorities = async (body, transacting = null) => {
	const doWork = async (t) => {
		const options = { transacting : t, require : false };

		await new UserLikeProductDetailsModel()
			.query(function(builder) {
				builder
					.where("product_details_id", body.product_details_id)
					.where("user_id", body.user_id);
			})
			.destroy(options);

		return {
			// eslint-disable-next-line max-len
			message : `Se elimino el producto con el ID [${body.product_details_id}] exitosamente de tu lista de favoritos`,
		};
	};
	return transacting
		? doWork(transacting)
		: bookshelf.transaction(doWork);
};

const ProductController = {
	addProductDetails,
	updateProductDetails,
	getImageProduct,
	getProductDetails,
	getPage,
	addProductToFavorities,
	deleteProductToFavorities,
};

export {
	addProductDetails,
	updateProductDetails,
	getImageProduct,
	getProductDetails,
	getPage,
	addProductToFavorities,
	deleteProductToFavorities,
};

export default ProductController;
