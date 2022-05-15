/* eslint-disable no-console */
/* eslint-disable camelcase */

// Import Dependences
import { bookshelf } from "~/Server/database/db";

// Import Models
import ProviderHasProductModel     from "~/Server/database/models/providers/provider_has_product";
import ProducDiscountProviderModel from "~/Server/database/models/products/product_discount_provider";
import ProductModel                from "~/Server/database/models/products/product";

// Import Controllers
import ProductController from "~/Server/controllers/products/product_controller";

/**
 * Adds a new register to product discount provider in the database.
 *
 * @param  {{
 *     discount           : number,
 *     min_weight         : number,
 *     max_weight         : number,
 *     provider_id        : number,
 *     product_details_id : number,
 * }} body
 * @param  {?Transaction} transacting - If it is not null means that the insertions runs under that transaction,
 *                                      otherwise begins its own transaction.
 * @return {Promise.<undefined, Error>} Returns a Promise fulfilled without any data in case of success,
 *                                      otherwise is rejected.
 */
const addProductDiscountToProvider = async (body, transacting = null) => {
	async function doWork(t) {
		const options = { transacting : t };

		await new ProducDiscountProviderModel().save(body, options);
	}

	return transacting
		? doWork(transacting)
		: bookshelf.transaction(doWork);
};

/**
 * Deletes all the product_discounts/provider links from the database by the given provider ID.
 *
 * @param  {{
 *     provider_id        : number,
 *     product_details_id : number,
 * }} body
 * @param  {?Transaction} transacting - If it is not null means that the deletions runs under that transaction,
 *                                      otherwise begins its own transaction.
 * @return {Promise.<undefined, Error>} Returns a Promise fulfilling it with no information if success,
 *                                      in case af any error rejects with some error.
 */
const deleteVolumenProfiles = async (body, transacting = null) => {
	async function doWork(t) {
		const options = {
			transacting : t,
			require     : false,
		};

		await ProducDiscountProviderModel.query(function(builder) {
			builder
				.where("product_details_id", body.product_details_id)
				.where("provider_id", body.provider_id);
		}).destroy(options);
	}

	return transacting
		? doWork(transacting)
		: bookshelf.transaction(doWork);
};

/**
 * This function links a product to a supplier
 *
 * @author  Montserrat Delgado Alvarez
 * @version 0.10.0
 * @since   0.10.0
 *
 * @param {{
 *     provider_id        : number,
 *     product_id         : ?number,
 *     price              : ?number,
 *     status             : ?string,
 *     flags              : ?string,
 *     quality            : ?string,
 *     size               : ?string,
 *     product_details_id : ?number,
 * }} body
 * @param {Promise} transacting
*/
const addProduct = async (body, transacting = undefined) => {
	const doWork = async (t) => {
		const options = { transacting : t };
		const updateOptions = {
			transacting : t,
			method      : "update",
			patch       : true,
		};

		const attributes = {
		    price  : body.price  || undefined,
		    status : body.status || undefined,
		    flags  : body.flags  || undefined,
		};

		let productId    = body.product_id || null;
		const providerId = body.provider_id;

		try {
			if (body?.product_details_id && body?.size && body?.quality) {
				const productModel = await new ProductModel()
					.query(function(builder) {
						builder
							.where("product_details_id", body.product_details_id)
							.where("size", ProductModel.SIZES[body.size])
							.where("quality", ProductModel.QUALITIES[body.quality]);
					})
					.fetch(options);
				productId = productModel.id;
			}
			const providerHasProductModel = await new ProviderHasProductModel()
				.query(function(builder) {
					builder
						.where("product_id", productId)
						.where("provider_id", providerId);
				})
				.fetch(options);

			attributes.status = "ACTIVE";
			await providerHasProductModel.save(attributes, updateOptions);
			return { id : providerHasProductModel.id };
		} catch (error) {
			attributes.provider_id = providerId;
			attributes.product_id  = productId;
			const providerHasProductModel = await new ProviderHasProductModel().save(attributes, options);
			return { id : providerHasProductModel.id };
		}
	};

	return transacting
		? doWork(transacting)
		: bookshelf.transaction(doWork);
};

/**
 * This function edit links a product to a supplier
 *
 * @author  Montserrat Delgado Alvarez
 * @version 0.10.0
 * @since   0.10.0
 *
 * @param {{
 *     product_id  : number,
 *     provider_id : number,
 *     price       : ?number,
 *     status      : ?string,
 *     flags       : ?string,
 * }} body
 * @param {Promise} transacting
*/
const editProduct = async (body, transacting = undefined) => {
	const doWork = async (t) => {
		const options = {
			transacting : t,
			method      : "update",
			patch       : true,
		};

		const providerHasProductModel = await new ProviderHasProductModel()
			.query(function(builder) {
				builder
					.where("product_id", body.product_id)
					.where("provider_id", body.provider_id);
			})
			.fetch(options);

		await providerHasProductModel.save(body, options);
		return { id : providerHasProductModel.id };
	};

	return transacting
		? doWork(transacting)
		: bookshelf.transaction(doWork);
};

/**
 * This function registers the configuration of a product to be offered by a supplier
 *
 * @author  Montserrat Delgado Alvarez
 * @version 0.10.0
 * @since   0.10.0
 *
 * @param {{
 *     product_details_id : ?number,
 *     provider_id        : number,
 *     products           : {{
 *        price  : number,
 *        status : string,
 *        flags  : ?string,
 *     }?[]object}
 *     volumen_profiles : {{
 *         discount   : number,
 *         min_weight : number,
 *         max_weight : number,
 *     }?[]object}
 *     providers
 * }} body
 * @param {Promise} transacting
 */
const configProduct = async (body, transacting = undefined) => {
	const doWork = async (t) => {
		if (body.products) {
			for (const product of body.products) {
				const productAttributes = {
					...product,
					provider_id        : parseInt(body.provider_id),
					product_details_id : body.product_details_id,
				};
				await addProduct(productAttributes, t);
			}
		}

		if (body.volumen_profiles && body.product_details_id) {
			await deleteVolumenProfiles({
				product_details_id : body.product_details_id,
				provider_id        : body.provider_id,
			}, t);

			for (const volumenDiscount of body.volumen_profiles) {
				const volumenDiscountAttributes = {
					...volumenDiscount,
					product_details_id : body.product_details_id,
					provider_id        : body.provider_id,
				};

				await addProductDiscountToProvider(volumenDiscountAttributes, t);
			}
		}
		return { message : "Se ha guardado la configuración de forma exitosa" };
	};

	return transacting
		? doWork(transacting)
		: bookshelf.transaction(doWork);
};

/**
 * This function edit information a bratch of product to be offered by a supplier
 *
 * @author  Montserrat Delgado Alvarez
 * @version 0.10.0
 * @since   0.10.0
 *
 * @param {{
 *     provider_id         : number,
 *     product_details_ids : ?[]number,
 *     user_id             : ?number,
 *     products_ids        : []array,
 *     action              : string | ["PAUSED", "LIKED", "DELETED"]
 * }} body
 * @param {Promise} transacting
*/
const batchProductEditing = async (body, transacting) => {
	const doWork = async (t) => {
		switch (body?.action) {
			case "PAUSED"  :
				for (const productId of body?.products_ids) {
					await editProduct({
						product_id  : productId,
						provider_id : body?.provider_id,
						status      : "INACTIVE",
					}, t);
				}
				break;
			case "DELETED" :
				for (const productId of body.products_ids) {
					await editProduct({
						product_id  : productId,
						provider_id : body?.provider_id,
						status      : "DELETE",
					}, t);
				}
				break;
			case "LIKED" :
				for (const productDetailsId of body?.product_details_ids) {
					await ProductController.addProductToFavorities({
						product_details_id : productDetailsId,
						user_id            : body?.user_id,
					}, t);
				}
				break;
		}

		return { message : "El lote de productos se edito correctamente" };
	};

	return transacting
		? doWork(transacting)
		: bookshelf.transaction(doWork);
};

/**
 * This function active all varieties of product to a supplier
 *
 * @author  Montserrat Delgado Alvarez
 * @version 0.10.0
 * @since   0.10.0
 *
 * @param {{
 *     product_details_id : number,
 *     provider_id        : number,
 * }} body
 * @param {Promise} transacting
*/
const activeAllProducts = async (body, transacting = undefined) => {
	const doWork = async (t) => {
		const options = {
			transacting : t,
			method      : "update",
			patch       : true,
		};

		const attributes = { status : "ACTIVE" };

		const providerHasProductModel = await new ProviderHasProductModel()
			.query(function(builder) {
				builder
					.where("provider_id", body.provider_id)
					.whereIn("product_id", function() {
						this
							.select("p.id")
							.from("product as p")
							.where("p.product_details_id", body.product_details_id);
					})
					.where("status", "INACTIVE");
			})
			.save(attributes, options);

		return {
			id      : providerHasProductModel.id,
			message : "Se activaron correctamente las variedades de este producto",
		};
	};

	return transacting
		? doWork(transacting)
		: bookshelf.transaction(doWork);
};

const disableAllProducts = async (providerId, transacting = undefined) => {
	const doWork = async (t) => {
		const options = {
			transacting : t,
			method      : "update",
			patch       : true,
		};

		const attributes = { status : "INACTIVE" };

		let providerHasProductModel;

		try {
			providerHasProductModel = await new ProviderHasProductModel()
				.query(function(builder) {
					builder
						.where("provider_id", providerId)
						.where("status", "ACTIVE");
				})
				.save(attributes, options);
		} catch (error) {
			return { meesage : "No row updated" };
		}

		return {
			id      : providerHasProductModel.id,
			message : "Se desactivaron correctamente todaos los productos del proveedor",
		};
	};

	return transacting
		? doWork(transacting)
		: bookshelf.transaction(doWork);
};

module.exports = {
	configProduct,
	addProductDiscountToProvider,
	addProduct,
	editProduct,
	batchProductEditing,
	activeAllProducts,
	disableAllProducts,
};
