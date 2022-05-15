/* eslint-disable max-len */
/* eslint-disable camelcase */
import { bookshelf, knex } from "~/Server/database/db";
import { v4 as uuidv4 }    from "uuid";
import mkdirp              from "mkdirp";

// Import Models
import SaleOrderModel        from "~/Server/database/models/orders/sale_order";
import SaleOrderHasFileModel from "~/Server/database/models/orders/sale_order_has_file";
import FileModel             from "~/Server/database/models/info/file";

// Import
import FileController            from "~/Server/controllers/image/image_controller";
import { validatePermisonEmail } from "~/Server/controllers/customers/customer_controller";

// Import Helpers
import { sqlSetToInt } from "~/Util";

// Import Service
import { mailChangeOrderStatus } from "~/Server/services/emais/sale_order_email";

const EXEC_PATH = process.cwd().replace(/[\\]+/ig, "/");

/**
 * Stores an image in the file system before call function for resizing a original image
 * and saves the full path in the database's product register by the given ID.
 *
 * @author  Montserrat Delgado Alvarez
 * @version 0.10.0
 * @since   0.10.0
 *
 * @param  {number} saleOrderId - Product database's ID.
 * @param  {string|Base64} fileBase64 - Source image in base64 string format.
 * @param  {?Transaction} transacting -  Indictes in which transaction this opration will run,
 * @return {Promise.<undefined, Error>} On success fulfills a Promise without any information,
 *                                      otherwise rejects with some error.
 */
const addFile = async (fileBase64, randomUuid, saleOrderId, transacting = undefined) => {
	const doWork = async (t, attributes) => {
		const options = {
			transacting : t,
		};

		const fileModel = await new FileModel().save(attributes, options);
		return fileModel.id;
	};

	try {
		const base64String = fileBase64.split(",");
		//Get extension from base64 meta
		const metaTag      = base64String[0].split(":");
		const fileType     = metaTag[1].split(";");
		const extension    = fileType[0].split("/");
		//Convert to image
		const image        = base64String[1];
		const fileName = `${ saleOrderId }.${ extension[1] }`;
		const fileDir  = `${ EXEC_PATH }/src/Server/storage/files/sale_orders/${randomUuid}/${saleOrderId}`;
		const path     = `src/Server/storage/files/sale_orders/${randomUuid}/${saleOrderId}/${ fileName }`;

		mkdirp.sync(fileDir);

		const filePath = `${ fileDir }/${ fileName }`;

		await FileController.saveFromBase64(filePath, image);

		const attributes = {
			path,
			ext : extension[1],
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
 * Returns a list of products details with pagination information from the database.
 *
 * @author  Montserrat Delgado Alvarez
 * @version 0.10.0
 * @since   0.10.0
 *
 *
 * @param  {number} page - Number of the page to request.
 * @param  {{
 *     page            : number,
 *     filter          : ?string,
 *     order_by        : ?string,
 *     order           : ?string,
 *     page_size       : ?number,
 *     image_size      : ?string,
 *     open            : ?bool,
 *     status          : ?status,
 *     flags           : ?flags,
 *     paid            : ?bool,
 *     customer_id     : ?number,
 *     provider_id     : ?number,
 *     shipping_status : ?string,
 *     not_payed       : ?bool,
 *     notification    : ?bool,
 * }} query - Contains information wich modifies the results, that includes filtering, sorting and pagination.
 * @return {Promise.<{
 *     collection : {
 *         id              : number,
 *         buy_order_id    : number,
 *         shipping_cost   : number,
 *         status          : string,
 *         shipping_status : string,
 *         flags           : string,
 *         timestamp       : number,
 *         amout           : number,
 *         discount        : number,
 *         code            : string,
 *         trade_name      : string,
 *         customer        : string,
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
export const getPage =  async (query) => {
	try {
		const providerId = query.provider_id || undefined;
		const customerId = query.customer_id || undefined;

		const options     = {
			pageSize    : query.page_size > 0 && query.page_size <= 200 ? query.page_size : 25,
			page        : query.page > 0 ? query.page : 1,
			withRelated : ["products"],
		};

		const column = query.order_by || "id";
		const order  = query.order    || "DESC";

		const filter       = query.filter     || undefined;
		const imageSize    = query.image_size || "sm";
		const notification = query.notification ? true : false;

		let status         = query.status || undefined;
		let shippingStatus = query.shipping_status || undefined;
		let flags          = query.flags ? (SaleOrderModel.STATUSES[query.flags]) : undefined;

		if (query.open) {
			status         = undefined;
			flags          = undefined;
			shippingStatus = undefined;
		}

		const productDetailsCollection = await SaleOrderModel.query(function(builder) {
			builder.columns(
				"sale_order.*",
				function() {
					this.select("bo.code")
						.from("buy_order AS bo")
						.where("bo.id", knex.raw("sale_order.buy_order_id"))
						.as("code");
				},
				function() {
					this
						.select(function() {
							this
								.select(function() {
									this
										.select("trade_name")
										.from("provider as p")
										.where("p.id", knex.raw("php.provider_id"));
								})
								.from("provider_has_product as php")
								.where("php.id", knex.raw("sohp.provider_has_product_id"));
						})
						.from("sale_order_has_product as sohp")
						.where("sohp.sale_order_id", knex.raw("sale_order.id"))
						.limit(1)
						.as("trade_name");
				},
				function() {
					this
						.select(function() {
							this.select(knex.raw("CONCAT(c.first_name,' ',c.last_name)"))
								.from("customer as c")
								.where("c.id", knex.raw("bo.customer_id"));
						})
						.from("buy_order AS bo")
						.where("bo.id", knex.raw("sale_order.buy_order_id"))
						.as("customer");
				},
				function() {
					this
						.select(function() {
							this
								.select(function() {
									this.select("a.state")
										.from("address as a")
										.where("a.id", knex.raw("ca.address_id"));
								})
								.from("customer_address as ca")
								.where("ca.id", knex.raw("bo.customer_address_id"));
						})
						.from("buy_order AS bo")
						.where("bo.id", knex.raw("sale_order.buy_order_id"))
						.as("state");
				},
				function() {
					this.select("sohf.file_id")
						.from("sale_order_has_file as sohf")
						.where("sohf.sale_order_id", knex.raw("sale_order.id"))
						.where("type", "VOUCHER")
						.orderBy("id", "DESC")
						.limit(1)
						.as("voucher_id");
				},
				function() {
					this.select("sohf.file_id")
						.from("sale_order_has_file as sohf")
						.where("sohf.sale_order_id", knex.raw("sale_order.id"))
						.where("type", "BILL")
						.orderBy("id", "DESC")
						.limit(1)
						.as("bill_id");
				},
				function() {
					this.select("sohf.file_id")
						.from("sale_order_has_file as sohf")
						.where("sohf.sale_order_id", knex.raw("sale_order.id"))
						.where("type", "PAY_ORDER")
						.orderBy("id", "DESC")
						.limit(1)
						.as("pay_order_id");
				}
			);

			if (providerId) {
				builder
					.where(function() {
						this.whereIn("id", function() {
							this.select("sohp.sale_order_id")
								.from("sale_order_has_product AS sohp")
								.whereIn("sohp.provider_has_product_id", function() {
									this.select("php.id")
										.from("provider_has_product as php")
										.where("php.provider_id", providerId);
								});
						});
					});
			}

			if (customerId) {
				builder.whereIn("buy_order_id", function() {
					this.select("bo.id")
						.from("buy_order AS bo")
						.where("bo.customer_id", customerId);
				});
			}

			if (filter) {
				builder.where(function() {
					this
						.orWhereIn("buy_order_id", function() {
							this.select("bo.id")
								.from("buy_order AS bo")
								.where("bo.code", "LIKE", `%${ filter }%`);
						})
						.orWhereIn("id", function() {
							this.select("sohp.sale_order_id")
								.from("sale_order_has_product AS sohp")
								.whereIn("sohp.provider_has_product_id", function() {
									this.select("php.id")
										.from("provider_has_product as php")
										.whereIn("php.provider_id", function() {
											this.select("p.id")
												.from("provider as p")
												.where("p.trade_name", "LIKE", `%${ filter }%`);

										});
								});
						})
						.orWhereIn("buy_order_id", function() {
							this
								.select("bo.id")
								.from("buy_order AS bo")
								.whereIn("bo.customer_id", function() {
									this.select("c.id")
										.from("customer as c")
										.orWhere("c.first_name", "LIKE", `%${ filter }%`)
										.orWhere("c.last_name", "LIKE", `%${ filter }%`);
								});
						});
				});
			}

			if (flags) {
				builder.where(function() {
					this.whereRaw("?? & ? <> 0", ["flags", flags])
						.whereNotNull("flags");
				});
			}

			if (query.open) {
				builder.where(function() {
					this.where("status", "<>", SaleOrderModel.STATUSES.FINISHED)
						.where("status", "<>", SaleOrderModel.STATUSES.DECLINED)
						.where("status", "<>", SaleOrderModel.STATUSES.CANCELED);
				});
			}

			if (query.canceled) {
				builder.where(function() {
					this.orWhere("status", SaleOrderModel.STATUSES.DECLINED)
						.orWhere("status", SaleOrderModel.STATUSES.CANCELED);
				});
			}

			if (status) {
				builder.where("status", status);
			}

			if (shippingStatus) {
				builder.where("shipping_status", shippingStatus);
			}

			if (notification) {
				builder.where("notification", true);
			}

			if (query.paid) {
				builder.where("flags", "LIKE", "%PAID%");
			}

			if (query.not_payed) {
				builder.whereNotIn("id", function() {
					this.select("id")
						.from("sale_order as sl")
						.where("sl.flags", "LIKE", "%PAID%");
				});
			}

			builder.orderBy(column, order);
		}).fetchPage(options);

		const collection = productDetailsCollection.models.map(productDetailsModel => {
			const productModels = productDetailsModel.related("products");
			productDetailsModel.attributes.products =  productModels.map(productModel => {
				productModel.attributes.image = `/api/images/products/${imageSize}/${productModel.attributes.file_id}`;
				return productModel.attributes;
			});
			return productDetailsModel.attributes;
		});

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


export const update = async (body, transacting = undefined) => {
	async function doWork(t) {
		const options = {
			transacting : t,
			method      : "update",
			patch       : true,
		};

		const attributes = {
			status          : body.status          || undefined,
			shipping_status : body.shipping_status || undefined,
			note            : body.note            || undefined,
			notification    : (body.notification !== undefined) ? body.notification : 1,
		};

		const saleOrderModel = await SaleOrderModel.query(function(builder) {
			builder
				.columns(
					"sale_order.*",
					function() {
						this.select("b.customer_id")
							.from("buy_order AS b")
							.where("b.id", "=", knex.raw("sale_order.buy_order_id"))
							.as("customer_id");
					},
				)
				.where("id", body.id);
		}).fetch({ transacting : t });

		if (!saleOrderModel) {
			throw {
				status  : 409,
				label   : "NOT_FOUND",
				message : `Requested 'provider' with ID [${ body.id }] was not found`,
				info    : { attributes },
			};
		}

		const originalFlagsInt = sqlSetToInt(saleOrderModel.attributes.flags, SaleOrderModel.FLAGS) || 0;
		let newFlags           = originalFlagsInt;

		if (body.paid === true) {
			newFlags |= body.paid === true ? SaleOrderModel.FLAGS.PAID : 0;
		}
		else if (body.paid === false) {
			newFlags &= ~SaleOrderModel.FLAGS.PAID;
		}
		if (body.invoiced === true) {
			newFlags |= body.invoiced === true ? SaleOrderModel.FLAGS.INVOICED : 0;
		}
		else if (body.invoiced === false) {
			newFlags &= ~SaleOrderModel.FLAGS.INVOICED;
		}

		if (newFlags != originalFlagsInt) {
			attributes.flags = newFlags;
		}

		if (attributes.status || attributes.flags || attributes.shipping_status || (attributes.notification !== undefined)) {
			await saleOrderModel.save(attributes, options);
		}

		return saleOrderModel.attributes;
	}

	return transacting
		? doWork(transacting)
		: bookshelf.transaction(doWork);
};

/**
 *
 * @param {{
 *     id     : number | sale_order_id,
 *     action : string [PAID, INVOICED, READY, CANCELED, DECLINED, SENT, DELIVERED, NOTIFICATION]
 * }} body
 */
export const actions = async (body) => {
	let response;
	const emailIdToAction = {
		"PAID"         : 2,
		"READY"        : 3,
		"CANCELED"     : 5,
		"DECLINED"     : 5,
		"DELIVERED"    : 4,
		"NOTIFICATION" : 5,
	};

	switch (body.action) {
		case "PAID":
			response = await update({
				notification : 1,
				id           : body.id,
				paid         : true,
			});
			break;

		case "INVOICED":
			response = await update({
				notification : 1,
				id           : body.id,
				invoiced     : true,
			});
			break;

		case "READY":
			response = await update({
				notification    : 1,
				id              : body.id,
				shipping_status : SaleOrderModel.SHIPPING_STATUSES.READY,
				status          : SaleOrderModel.STATUSES.RUNNING,
			});
			break;

		case "CANCELED": // Cancelacion por el proveedor
			response = await update({
				notification    : 1,
				id              : body.id,
				shipping_status : SaleOrderModel.SHIPPING_STATUSES.FINISHED,
				status          : SaleOrderModel.STATUSES.CANCELED,
				note            : body.note || undefined,
			});
			break;

		case "DECLINED": // Cancelacion por parte del cliente
			response = await update({
				notification    : 1,
				id              : body.id,
				shipping_status : SaleOrderModel.SHIPPING_STATUSES.FINISHED,
				status          : SaleOrderModel.STATUSES.DECLINED,
				note            : body.note || undefined,
			});
			break;

		case "SENT":
			response = await update({
				notification    : 1,
				id              : body.id,
				shipping_status : SaleOrderModel.SHIPPING_STATUSES.SENT,
			});
			break;

		case "DELIVERED":
			response = await update({
				notification    : 1,
				id              : body.id,
				shipping_status : SaleOrderModel.SHIPPING_STATUSES.FINISHED,
				status          : SaleOrderModel.STATUSES.FINISHED,
			});
			break;

		case "NOTIFICATION" : // Este caso es para desactivar una notificación
			response = await update({
				notification : 0,
				id           : body.id,
			});
			break;

		default:
			break;
	}

	if (body.action !== "SENT" && body.action !== "INVOICED" && body.action !== "NOTIFICATION") {
		// Enviamos correo con la accion que le corresponda
		const permissionMailer = await validatePermisonEmail(response.customer_id, emailIdToAction[body.action]);

		if (permissionMailer) {
			mailChangeOrderStatus({
				buy_order_id : response.buy_order_id,
				provider_id  : body.provider_id,
				action       : body.action,
				email        : permissionMailer,
			});
		}
	}

	return { id : response.id, message : "Orden Actualizada!" };
};

/**
 *
 * @param {{
 *     file_type : string |	[BILL, VOUCHER, PAY_ORDER]
 *     file      : string | base64String,
 *     id        : id,
 * }} body
 */
export const updloadFileToSaleOrder = async (body, transacting) => {
	async function doWork(t) {
		const randomUuid = uuidv4();
		const fileId = await addFile(body.file, randomUuid, body.id, t);

		const attributes = {
			file_id       : fileId,
			type          : body.file_type,
			sale_order_id : body.id,
		};

		const saleOrderHasFileModel = await new SaleOrderHasFileModel().save(attributes, { transacting : t });

		if (body.file_type === "BILL") {
			await update({
				id           : body.id,
				invoiced     : true,
				notification : 1,
			}, t);
		}

		return { id : saleOrderHasFileModel.id };
	}

	return transacting
		? doWork(transacting)
		: bookshelf.transaction(doWork);
};
