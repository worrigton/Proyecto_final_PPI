/* eslint-disable camelcase */
// Import Dependences
import { bookshelf, knex } from "~/Server/database/db";

// Import Models
import ProviderModel       from "~/Server/database/models/providers/provider";
import ProductModel        from "~/Server/database/models/products/product";
import RegionProviderModel from "~/Server/database/models/providers/region_provider";
import ProductDetailsModel from "~/Server/database/models/products/product_details";

// Import Controllers
import AddressController         from "~/Server/controllers/info/address_controller";
import ShippingProfileController from "~/Server/controllers/providers/shipping_profiles_controller";

// Import Utils
import sanitizedDate from "~/Util/parseDate";

const IMAGE_SIZES = [ "xs", "sm", "md", "lg"];

/**
 * Adds a list of regions to some provider by the given provider ID.
 * The position of each branch is considered in the database.
 *
 * @param  {number} providerId - provider's database ID.
 * @param  {{
 *     state_id : number,
 *     city_id  : ?number
 * }[]Object}  - Contains the list of providers to insert.
 * @param  {?Transaction} transacting - If it is not null means that the insertions runs under that transaction,
 *                                      otherwise begins its own transaction.
 * @return {Promise.<undefined, Error>} Returns a Promise fulfilled without any data in case of success,
 *                                      otherwise is rejected.
 */
function linkRegionToProvider(providerId, regions, transacting = null) {
	async function doWork(t) {
		const options = { transacting : t };

		for (const region of regions) {
			const regionData = {
				state_id    : region.state_id,
				city_id     : region.city_id || undefined,
				provider_id : providerId,
			};
			await new RegionProviderModel().save(regionData, options);
			await ShippingProfileController.addShippingProfiles(providerId, region.state_id, t);
		}
	}

	return transacting
		? doWork(transacting)
		: bookshelf.transaction(doWork);
}

/**
 * Deletes all the region/provider links from the database by the given provider ID.
 *
 * @param  {number} providerId - provider's database ID.
 * @param  {?Transaction} transacting - If it is not null means that the insertions runs under that transaction,
 *                                      otherwise begins its own transaction.
 * @return {Promise.<undefined, Error>} Returns a Promise fulfilling it with no information if success,
 *                                      in case af any error rejects with some error.
 */
function delRegionsToProvider(providerId, transacting = null) {
	async function doWork(t) {
		const options = {
			transacting : t,
			require     : false,
		};

		await RegionProviderModel.where("provider_id", "=", providerId).destroy(options);
	}

	return transacting
		? doWork(transacting)
		: bookshelf.transaction(doWork);
}

/**
 * Updates all the provider/employee links of a specific employee by its given ID.
 *
 * @param  {number} ProviderId - employee's database ID.
 * @param {{
 *     state_id : number,
 *     city_id  : ?number
 * }[]Object} regions - Contains the array of objets of regions data to link.
 * @param  {?Transaction} transacting - If it is not null means that the insertions runs under that transaction,
 *                                      otherwise begins its own transaction.
 * @return {Promise.<undefined, Error>} Returns a Promise fulfilled without any data in case of success,
 *                                      otherwise is rejected.
 */
function updateRegionsToProvider(ProviderId, regions, transacting = null) {
	async function doWork(t) {
		await delRegionsToProvider(ProviderId, t);
		return linkRegionToProvider(ProviderId, regions, t);
	}

	return transacting
		? doWork(transacting)
		: bookshelf.transaction(doWork);
}

/**
 * Inserts a new provider register into the database.
 *
 * @author  Cesar A. Herrera de la T.
 * @version 0.10.0
 * @since   0.10.0
 * @param {{
 *     user_id     : string,
 *     first_name  : string,
 *     last_name   : string,
 *     legal_name  : string,
 *     trade_name  : string,
 *     store_email : string,
 *     rfc         : ?string,
 *     address     : object,
 *     regions     : {
 *         state_id : number,
 *         city_id  : ?number
 *     } ?[]Object
 * }} body - Constains the necesary information to create the new register.
 * @return {Promise.<number, Error>} Returns a Promise which in case of success is fullfilled with the
 *                                   new record's database ID, otherwise rejects with some error.
*/
const create = async (body, transacting) => {
	try {
		const doWork = async (t) => {
			const attributes = {
				user_id        : body.user_id,
				first_name     : body.first_name,
				last_name      : body.last_name,
				legal_name     : body.legal_name,
				trade_name     : body.trade_name,
				store_email    : body.store_email,
				rfc            : body.rfc || undefined,
				titular_acount : body.titular_acount || undefined,
				number_acount  : body.number_acount || undefined,
				clabe_acount   : body.clabe_acount || undefined,
			};

			const addresModel     = await AddressController.create(body.address, t);
			attributes.address_id = addresModel.id;
			const providerModel   = await new ProviderModel().save(attributes, { transacting : t });

			if (body?.regions) {
				await linkRegionToProvider(providerModel.id, body.regions, t);
			}

			// await addPaymentHistory(body.payment, t);

			return { id : providerModel.id };
		};

		return transacting
			? doWork(transacting)
			: bookshelf.transaction(doWork);
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
 * Updates a specific Provider register which already
 * exists into the database by the given ID.
 *
 * @author  Cesar A. Herrera de la T.
 * @version 0.10.0
 * @since   0.10.0
 *
 * @param  {number} id - Database ID of provider.
 * @param  {{
 *     first_name  : string,
 *     last_name   : string,
 *     legal_name  : string,
 *     trade_name  : string,
 *     store_email : string,
 *     rfc         : ?string,
 *     address     : ?object,
 *     regions     : {
 *         state_id : number,
 *         city_id  : ?number
 *     } ?[]Object
 * }} body - Contains the information to save into the database.
 * @return {Promise.<undefined, Error>} Returns a promise which in case of success is fullfilled without
 *                                      any information, if any problem then is rejected with some error.
*/
async function update(body, transacting = undefined) {
	async function doWork(t) {
		const attributes = {
			first_name     : body.first_name      || undefined,
			last_name      : body.last_name       || undefined,
			legal_name     : body.legal_name      || undefined,
			trade_name     : body.trade_name      || undefined,
			store_email    : body.store_email     || undefined,
			rfc            : body.rfc ? body.rfc : undefined,
			titular_acount : body.titular_acount  || undefined,
			number_acount  : body.number_acount   || undefined,
			clabe_acount   : body.clabe_acount    || undefined,
			notes          : body.note            || undefined,
		};

		const options = {
			transacting : t,
			method      : "update",
			patch       : true,
		};

		const providerModel = await new ProviderModel({ id : body.id }).fetch(options);
		if (!providerModel) {
			throw {
				status  : 409,
				label   : "NOT_FOUND",
				message : `Requested 'provider' with ID [${ body.id }] was not found`,
				info    : { attributes },
			};
		}

		await providerModel.save(attributes, options);

		if (body?.address?.id) {
			await AddressController.update(body.address.id, body.address, t);
		}

		if (body?.regions) {
			await updateRegionsToProvider(body.id, body.regions, t);
		}

		return { id : body.id };
	}

	return transacting
		? doWork(transacting)
		: bookshelf.transaction(doWork);
}

/**
 * Returns a list of providers with pagination information from the database.
 *
 * @author  Cesar A. Herrera de la T.
 * @version 0.10.0
 * @since   0.10.0
 *
 *
 * @param  {number} page - Number of the page to request.
 * @param  {{
 *     page                : number,
 *     filter              : ?string,
 *     order_by            : ?string,
 *     ord                 : ?string,
 *     page_size           : ?number
 *     include_employee_id : ?number,
 *     exclude_employee_id : ?number,
 *     date_start          : ?string,
 *     date_end            : ?string,
 * }} query - Contains information wich modifies the results, that includes filtering, sorting and pagination.
 * @return {Promise.<{
 *     collection : {
 *         id                    : number,
 *         user_id               : number,
 *         first_name            : string,
 *         legal_name            : string
 *         store_name            : string
 *         trade_name            : string
 *         last_name             : string,
 *         email                 : string,
 *         total_products        : number,
 *         total_active_products : number,
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
			pageSize : query.per_page > 0 && query.per_page <= 100 ? query.per_page : 25,
			page     : query.page > 0 ? query.page : 1,
		};

		const dateStart = query.date_start ? sanitizedDate(query.date_start) : undefined;
		const dateEnd   = query.date_end   ? sanitizedDate(query.date_end) : undefined;

		const column            = query.order_by            || "first_name";
		const order             = query.ord                 || "DESC";
		const includeEmployeeId = query.include_employee_id || undefined;
		const excludeEmployeeId = query.exclude_employee_id || undefined;
		const filter            = query?.filter && query?.filter.length > 0 ? filter : undefined;

		const providerCollection = await ProviderModel.query(function(builder) {
			builder.columns(
				"provider.*",
				function() {
					this.select("u.email")
						.from("user AS u")
						.where("u.id", "=", knex.raw("provider.user_id"))
						.as("email");
				},
				function() {
					this.select("u.created_at")
						.from("user AS u")
						.where("u.id", "=", knex.raw("provider.user_id"))
						.as("created_at");
				},
				function() {
					this.count("* as count")
						.from("product_details as pd")
						.whereIn("pd.id", function() {
							this.select("p.product_details_id")
								.from("product as p")
								.where("p.product_details_id", knex.raw("pd.id"))
								.whereIn("p.id", function() {
									this.select("php.product_id")
										.from("provider_has_product as php")
										.where("php.product_id", knex.raw("p.id"))
										.where("php.provider_id", knex.raw("provider.id"))
										.where("php.status", "<>", "DELETE");
								});
						})
						.as("total_products");
				},
				function() {
					this.count("* as count")
						.from("product_details as pd")
						.whereIn("pd.id", function() {
							this.select("p.product_details_id")
								.from("product as p")
								.where("p.product_details_id", knex.raw("pd.id"))
								.whereIn("p.id", function() {
									this.select("php.product_id")
										.from("provider_has_product as php")
										.where("php.product_id", knex.raw("p.id"))
										.where("php.provider_id", knex.raw("provider.id"))
										.where("php.status", "ACTIVE");
								});
						})
						.as("total_active_products");
				},
				function() {
					this.select(knex.raw("IFNULL(SUM(r.rating) / COUNT(r.rating), 0)"))
						.from("rating AS r")
						.where("r.user_id", "=", knex.raw("provider.user_id"))
						.as("rating");
				},
			);

			if (filter) {
				builder
					.where(function() {
						this.orWhere("first_name", "LIKE", `%${ query.filter }%`)
							.orWhere("last_name", "LIKE", `%${ query.filter }%`)
							.orWhere("legal_name", "LIKE", `%${ query.filter }%`)
							.orWhere("trade_name", "LIKE", `%${ query.filter }%`)
							.orWhereIn("user_id", function() {
								this.select("u.id")
									.from("user AS u")
									.orWhere("u.email", "LIKE", `%${ filter }%`)
									.orWhere("u.username", "LIKE", `%${ filter }%`);
							});
					});
			}

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

			if (includeEmployeeId || excludeEmployeeId) {
				builder
					.where(function() {
						if (includeEmployeeId) {
							this.whereIn("id", function() {
								this.select("ehp.provider_id")
									.from("employee_has_provider as ehp")
									.where("ehp.employee_id", includeEmployeeId);
							});
						}
						if (excludeEmployeeId) {
							this.whereNotIn("id", function() {
								this.select("ehp.provider_id")
									.from("employee_has_provider as ehp")
									.where("ehp.employee_id", excludeEmployeeId);
							});
						}
					});
			}

			builder
				.where(function() {
					this.whereIn("user_id", function() {
						this.select("u.id")
							.from("user as u")
							.where("delete", false);
					});
				})
				.orderBy(column, order);
		}).fetchPage(options);

		const collection = providerCollection.models.map(providerModel => providerModel.attributes);

		return {
			collection : collection,
			pagination : providerCollection.pagination,
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
 * Gets from the database a provider register according to the given ID.
 *
 * @author  Cesar A. Herrera de la T.
 * @version 0.10.0
 * @since   0.10.0
 *
 * @param  {number} id - Database ID of the color.
 * @return {Promise.<{
 *     id          : number,
 *     user_id     : number,
 *     address_id  : number,
 *     legal_name  : string,
 *     last_name   : string,
 *     first_name  : string,
 *     trade_name  : string,
 *     store_email : string,
 *     rfc         : string,
 *     rating      : number,
 *     images      : []string,
 *     regions     : {{
 *         id          : number,
 *         city_id     : number,
 *         state_id    : number,
 *         provider_id : number,
 *         city        : string,
 * 		   state       : string,
 *     }[]objects}
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
const getProvider = async (id) => {
	try {
		const options = {
			withRelated : ["user", "regions", "address", "membership"],
		};

		const providerModel = await new ProviderModel({ id : id })
			.query(function(builder) {
				builder.columns(
					"provider.*",
					function() {
						this.select(knex.raw("IFNULL(SUM(r.rating) / COUNT(r.rating), 0)"))
							.from("rating AS r")
							.where("r.user_id", "=", knex.raw("provider.user_id"))
							.as("rating");
					},
					function() {
						this
							.select(knex.raw("COUNT(*)"))
							.from("sale_order as s")
							.whereIn("s.id", function() {
								this.select("sohp.sale_order_id")
									.from("sale_order_has_product AS sohp")
									.whereIn("sohp.provider_has_product_id", function() {
										this.select("php.id")
											.from("provider_has_product as php")
											.where("php.provider_id", id);
									});
							})
							.whereNotIn("s.status", ["FINISHED", "CANCELED", "DECLINED"])
							.where("s.shipping_status", "NOT_READY")
							.as("not_ready_sale_orders");
					},
					function() {
						this
							.select(knex.raw("COUNT(*)"))
							.from("sale_order as s")
							.whereIn("s.id", function() {
								this.select("sohp.sale_order_id")
									.from("sale_order_has_product AS sohp")
									.whereIn("sohp.provider_has_product_id", function() {
										this.select("php.id")
											.from("provider_has_product as php")
											.where("php.provider_id", id);
									});
							})
							.whereIn("s.status", ["FINISHED"])
							.as("finish_sale_orders");
					},
					function() {
						this
							.select(knex.raw("COUNT(*)"))
							.from("sale_order as s")
							.whereIn("s.id", function() {
								this.select("sohp.sale_order_id")
									.from("sale_order_has_product AS sohp")
									.whereIn("sohp.provider_has_product_id", function() {
										this.select("php.id")
											.from("provider_has_product as php")
											.where("php.provider_id", id);
									});
							})
							.whereNotIn("s.id", function() {
								this.select("sl.id")
									.from("sale_order as sl")
									.where("sl.flags", "LIKE", "%PAID%");
							})
							.as("not_payed_sale_orders");
					},
					function() {
						this.select(knex.raw("COUNT(*)"))
							.from("product_details as pd")
							.whereIn("pd.id", function() {
								this.select("p.product_details_id")
									.from("product as p")
									.where("p.product_details_id", knex.raw("pd.id"))
									.whereIn("p.id", function() {
										this.select("php.product_id")
											.from("provider_has_product as php")
											.where("php.product_id", knex.raw("p.id"))
											.where("php.provider_id", knex.raw("provider.id"))
											.where("php.status", "<>", "DELETE");
									});
							})
							.as("total_products");
					},
					function() {
						this.select(knex.raw("COUNT(*)"))
							.from("product_details as pd")
							.whereIn("pd.id", function() {
								this.select("p.product_details_id")
									.from("product as p")
									.where("p.product_details_id", knex.raw("pd.id"))
									.whereIn("p.id", function() {
										this.select("php.product_id")
											.from("provider_has_product as php")
											.where("php.product_id", knex.raw("p.id"))
											.where("php.provider_id", knex.raw("provider.id"))
											.where("php.status", "ACTIVE");
									});
							})
							.as("total_active_products");
					},
				);
			}).fetch(options);

		const data = providerModel.attributes;

		data.images = IMAGE_SIZES.reduce((accum, size) => ({
			...accum,
			[size] : `/api/images/users/${size}/${data.user_id}`,
		}), { "original" : `/api/images/users/${data.user_id}` });

		data.user       = providerModel.related("user").attributes;
		data.address    = providerModel.related("address").attributes;

		const membershipCollections = providerModel.related("membership");
		const regionsCollections    = providerModel.related("regions");

		data.membership = membershipCollections.models?.length > 0 ? membershipCollections.models[0].attributes : null;
		data.regions    = regionsCollections.models?.length > 0
			? regionsCollections.models.map(region => region.attributes )
			: null;

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


const getProductDetail = async (productDetailsId, providerId) => {
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
			}).fetch(options);

		const data   = productDetailsModel.attributes;
		const images = productDetailsModel.related("files")
			.models.map( fileModel => IMAGE_SIZES.reduce((accum, size) => ({
				...accum,
				[size] : `/api/images/products/${size}/${fileModel.attributes.id}`,
			}), { "original" : `/api/images/products/${fileModel.attributes.id}` }));

		const features = productDetailsModel.related("features").models
			.map(file => file.attributes);

		data.varieties = data.products.reduce((accum, { size, quality }) => {
			const index = remaining_varieties[quality].indexOf(size);
			if (index > -1) {
				remaining_varieties[quality].splice(index, 1);
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
		data.images   = images;
		data.features = features;

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
	getProvider,
	getProductDetail,
};
