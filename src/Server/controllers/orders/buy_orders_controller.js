/* eslint-disable import/extensions */
/* eslint-disable camelcase */
/* eslint-disable max-len */
import crypto           from "crypto";
import _                from "lodash";
import fs               from "fs";
import pdf              from "html-pdf";
import { v4 as uuidv4 } from "uuid";
import mkdirp           from "mkdirp";
import handlebars       from "handlebars";

import { bookshelf }       from "~/Server/database/db";

// import Models
import BuyOrder                 from "~/Server/database/models/orders/buy_order";
import ProviderModel            from "~/Server/database/models/providers/provider";
import SaleOrder                from "~/Server/database/models/orders/sale_order";
import FileModel                from "~/Server/database/models/info/file";
import SaleOrderHasFileModel    from "~/Server/database/models/orders/sale_order_has_file";
import SaleOrderHasProductModel from "~/Server/database/models/orders/sale_order_has_product";

import settings from "~/Server/settings.json";

// import Controllers
import { getProvider }           from "~/Server/controllers/providers/provider_controller";
import { validatePermisonEmail } from "~/Server/controllers/customers/customer_controller";

// Import Service
import { sendMailBuyOrder }             from "~/Server/services/emais/sale_order_email";
import { newBuyOrderNotificationEmail } from "~/Server/services/emais/buy_order";

// import Helpers
import { formatToCurrency } from "~/Util";

const EXEC_PATH = process.cwd().replace(/[\\]+/ig, "/");

const makeTemplateNewBuyOrder = async function(data) {
	const handlebarTemplate = fs.readFileSync("src/Server/templates/new_order_notification.handlebars", "utf8");
	const template          = handlebars.compile(handlebarTemplate)(data);

	return template;
};

export async function getBuyOrderDetails(identifier, providerId, image_size) {
	try {
		const imageSize = image_size || "sm";
		let buyOrderId;
		let buyOrderCode;

		if (typeof identifier === "string") {
			buyOrderCode = identifier;
		}
		const options = {
			withRelated : [
				"customer",
				"sale_orders.products",
				"customer_address.address",
				"billing_profile.address",
			],
		};

		if (providerId) {
			options.withRelated.push(
				{
					"sale_orders" : function(qb) {
						qb.where(function() {
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
					},
				}
			);
		}

		const buyOrderModel = await new BuyOrder()
			.query(function(builder) {
				builder.columns(
					"buy_order.*",
				);
				if (buyOrderCode) {
					builder.where("code", buyOrderCode);
				} else if (buyOrderId) {
					builder.where("id", buyOrderId);
				} else {
					builder.where("id", identifier);
				}
			}).fetch(options);
		const data = buyOrderModel.attributes;

		data.customer = buyOrderModel.related("customer").attributes;

		const billingProfileModel = buyOrderModel.related("billing_profile");
		data.customer.billing_profile = billingProfileModel.attributes;
		data.customer.billing_profile.address = billingProfileModel.related("address").attributes;

		const customerAddressModel = buyOrderModel.related("customer_address");
		data.customer.customer_address = customerAddressModel.attributes;
		data.customer.customer_address.address = customerAddressModel.related("address").attributes;

		const saleOrderModels = buyOrderModel.related("sale_orders").models;
		data.sale_orders = saleOrderModels.map(saleOrderModel => {
			const productModels = saleOrderModel.related("products").models;
			saleOrderModel.attributes.products = productModels.map(productModel => {
				productModel.attributes.image = `/api/images/products/${imageSize}/${productModel.attributes.file_id}`;
				return productModel.attributes;
			});
			return saleOrderModel.attributes;
		});

		return data;

	} catch (error) {
		throw error && error.status && error.label ? error : {
			status  : 500,
			label   : "DATABASE_ERROR",
			message : "There was a problem with the database",
			error   : error,
		};
	}
}

const saveOrderPdf = async (htmlTemplate, buyOrder, transacting) => {
	const doWork = async (attributes, t) => {
		const options = {
			transacting : t,
		};

		const fileModel = await new FileModel().save(attributes, options);

		for (const saleOrderId of buyOrder.sale_order_ids) {
			const SOFattributes = {
				file_id       : fileModel.id,
				type          : "PAY_ORDER",
				sale_order_id : saleOrderId,
			};

			await new SaleOrderHasFileModel().save(SOFattributes, { transacting : t });
		}

		return fileModel.id;
	};

	try {
		const randomUuid = uuidv4();
		const fileName   = `${ buyOrder.code }.pdf`;
		const fileDir    = `${ EXEC_PATH }/src/Server/storage/files/buy_orders/${randomUuid}/${buyOrder.id}`;
		const path       = `src/Server/storage/files/buy_orders/${randomUuid}/${buyOrder.id}/${ fileName }`;

		const options = {
			"border" : {
				"top"    : ".5in",
				"bottom" : ".5in",
			},
		};

		mkdirp.sync(fileDir);
		const filePath = `${ fileDir }/${ fileName }`;

		pdf.create(htmlTemplate, options).toFile(filePath, function(err, res) {
			if (err) {
				if (fs.existsSync(fileDir)) {
					fs.unlinkSync(fileDir);
				}
			}
		});

		const attributes = {
			path,
			ext : "pdf",
		};

		return transacting
			? doWork(attributes, transacting)
			: bookshelf.transaction(doWork(attributes));
	} catch (error) {
		throw error && error.status && error.label ? error : {
			status  : 500,
			label   : "DATABASE_ERROR",
			message : "There was a problem with the database",
			error   : error,
		};
	}
};

const makeTemplateBuyOrder = async (buyOrderId) => {
	const buyOrder = await getBuyOrderDetails(buyOrderId);

	let html = fs.readFileSync("src/Server/views/payment_buy_order.html", "utf8");

	const customerAddress = buyOrder.customer.customer_address.address;
	const shippingAddress = `Mexico, 
		${customerAddress.state}, 
		${customerAddress.city}, 
		${customerAddress.neighborhood}, 
		${customerAddress.street} Ext:${customerAddress.ext_num} ${customerAddress.int_num ? `Int: ${customerAddress.int_num}` : "" }
		${customerAddress.zip_code}, 
		${customerAddress.telephone ? `Tel: ${customerAddress.telephone}` : "Sin telefono" }`;

	html = html.replace("*CODE*", buyOrder.code);
	html = html.replace("*SHIPPING_ADDRESS*", shippingAddress);
	html = html.replace("*URL_VAUCHER*", "https://zoko.mx/customer/orders");

	let concepts = "";
	let paymentsData = "";
	for (const saleOrder of buyOrder.sale_orders) {
		const provider = await getProvider(saleOrder.products[0].provider_id);
		paymentsData += `
			<table style="Margin-bottom:16px;border-collapse:collapse;border-spacing:0;margin:0!important;margin-bottom:16px;padding:0;text-align:left;vertical-align:top;width:100%">
				<tr>
					<th style="Margin:0;background:#fefefe;border:1px solid #cbcbcb;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:1.3;margin:0;padding:10px;text-align:left;width:100%">
						<table class="row">
							<tbody>
								<th style="Margin:0 auto;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:1.3;margin:0 auto;padding:0;padding-bottom:16px;padding-left:0!important;padding-right:0!important;text-align:left">
									Número de cuenta
								</th>
								<th style="Margin:0 auto;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:1.3;margin:0 auto;padding:0;padding-bottom:16px;padding-left:0!important;padding-right:0!important;text-align:left">
									${provider.number_acount}
								</th>
							</tbody>
							<tbody>
								<th style="Margin:0 auto;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:1.3;margin:0 auto;padding:0;padding-bottom:16px;padding-left:0!important;padding-right:0!important;text-align:left">
									Número CLABE
								</th>
								<th style="Margin:0 auto;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:1.3;margin:0 auto;padding:0;padding-bottom:16px;padding-left:0!important;padding-right:0!important;text-align:left">
									${provider.clabe_acount}
								</th>
							</tbody>
							<tbody>
								<th style="Margin:0 auto;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:1.3;margin:0 auto;padding:0;padding-bottom:16px;padding-left:0!important;padding-right:0!important;text-align:left">
									Nombre del titular
								</th>
								<th style="Margin:0 auto;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:1.3;margin:0 auto;padding:0;padding-bottom:16px;padding-left:0!important;padding-right:0!important;text-align:left">
									${provider.titular_acount}
								</th>
							</tbody>
						</table>
					</th>
					<th class="expander">																	
					</th>
				</tr>
			</table>
			<table style="Margin-bottom:16px;border-collapse:collapse;border-spacing:0;margin:0!important;margin-bottom:16px;padding:0;text-align:left;vertical-align:top;">
				<tr>
				<th style="Margin:0;background:#fefefe;border:1px solid #cbcbcb;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:1.3;margin:0;padding:10px;text-align:left;width:100%">
					<table style="width:100%">
						<tbody>
							<th style="Margin:0 auto;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:1.3;margin:0 auto;padding:0;padding-bottom:16px;padding-left:0!important;padding-right:0!important;text-align:left">
								<strong>Monto a depositar</strong>
							</th>
							<th style="Margin:0 auto;color:#0a0a0a;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:1.3;margin:0 auto;padding:0;padding-bottom:16px;padding-left:0!important;padding-right:0!important;text-align:right">
								<strong>${formatToCurrency(saleOrder.amount)}</strong>
							</th>
						</tbody>
					</table>
				</th>
				<th class="expander">																	
				</th>
				</tr>
			</table>
			<br>`;
		for (const product of saleOrder.products) {
			concepts += `<table class="row">
				<tbody>
					<tr>
						<th class="small-2 large-2 columns first">
							<table>
								<tr>
									<th>
										<img class="img-table" src="https://zoko.mx${product.image}" alt>
									</th>
								</tr>
							</table>
						</th>
						<th class="small-4 large-4 columns">
							<table>
								<tr>
									<th>
										<h4 class="text-center color-secondary">${product.name}</h4>
										<h5 class="text-center color-secondary">Calidad <strong>${product.quality}</strong></h5>
										<h5 class="text-center color-secondary">Tamaño <strong>${product.size}</strong></h5>
									</th>
								</tr>
							</table>
						</th>
						<th class="small-3 large-3 columns">
							<table>
								<tr>
									<th>
										<h4 class="text-center color-secondary">${product.quantity} kilos</h5>
									</th>
								</tr>
							</table>
						</th>
						<th class="small-3 large-3 columns last">
							<table>
								<tr>
									<th>
										<h4 class="text-center color-secondary">${formatToCurrency(product.cost)}</h5>
									</th>
								</tr>
							</table>
						</th>
					</tr>
				</tbody>
			</table>
			<hr>`;
		}
	}

	const messageMultipleOrders = buyOrder.sale_orders.length > 1
		? `Tu pedido proviene de ${buyOrder.sale_orders.length} proveedores distintos. Realiza el depósito correspondiente para cada uno de los proveedores en la lista a continuación.`
		: "Realiza el depósito correspondiente al proveedor de tu pedido, con la siguiente información.";

	html = html.replace("*MESSAGE_MULTIPLE_ORDERS*", messageMultipleOrders);
	html = html.replace("*PAYMENTS_DATA*", paymentsData);
	html = html.replace("*CONCEPTS*", concepts);

	return html;
};

async function createSaleOrders(buyOrderId, orderData, { transacting }) {
	const saveOptions  = { transacting };
	const saleOrderIds = [];
	const providerIds  = [];
	const orderProductsByProviderProductId = _(orderData.products).map(product => ({
		...product,
		cost : product.discount
			? (product.price * product.quantity) - product.discount + product.shipping_cost
			: (product.price * product.quantity) + product.shipping_cost,
	})).groupBy("provider_id").value();

	/* Este codigo es para validar mas adelante precios contra lo que el servidor puede tener
	const providerProductIds               = Object.keys(orderProductsByProviderProductId);

	const providerHasProducts = await ProviderHasProduct.query(function(builder) {
		builder.whereIn("id", providerProductIds);
	}).fetchAll(saveOptions);

	const providerProductsByProviderId = _.groupBy(providerHasProducts.models, "provider_id");*/

	for (const providerId in orderProductsByProviderProductId) {
		const saleOrderAttributes = {
			buy_order_id    : buyOrderId,
			status          : SaleOrder.STATUSES.REQUESTED,
			shipping_status : SaleOrder.SHIPPING_STATUSES.NOT_READY,
			flags           : SaleOrder.FLAGS.PENDING,
			timestamp       : new Date(),
			shipping_cost   : _.sumBy(orderProductsByProviderProductId[providerId], "shipping_cost"),
			discount        : _.sumBy(orderProductsByProviderProductId[providerId], "discount"),
			amount          : _.sumBy(orderProductsByProviderProductId[providerId], function(product) {
				return product.cost * 1.16;
			}), // Se esta incluyendo el IVA al monto total de la orden
		};
		const saleOrder = await new SaleOrder().save(saleOrderAttributes, saveOptions);
		saleOrderIds.push(saleOrder.id);
		providerIds.push(providerId);
		for (const providerProduct of orderProductsByProviderProductId[providerId]) {
			const productAttributes = {
				sale_order_id : saleOrder.id,
				..._.pick(providerProduct, [
					"price",
					"quantity",
					"p_discount",
					"d_discount",
					"provider_has_product_id",
				]),
				cost : (providerProduct.cost * 1.16), // Se calcula el costo + IVA
			};
			await new SaleOrderHasProductModel().save(productAttributes, saveOptions);
		}
	}
	return { saleOrderIds, providerIds };
}

/**
 *
 * @param {{
 *     customer_id         : number,
 *     customer_address_id : number,
 *     products            : {{
 *         provider_has_product_id : number,
 *         provider_id             : number,
 *         price                   : number,
 *         quantity                : number,
 *         shipping_cost           : number,
 *         discount                : ?number,
 *         p_discount              : ?number,
 *         d_discount              : ?number,
 *     }[]object}
 * }} orderData
 */
export async function placeOrder(orderData) {
	try {
		const code = crypto.randomBytes(4).toString("hex");

		const buyOrderResponse = await bookshelf.transaction(async t => {
			const saveOptions = { transacting : t };
			const count       = await BuyOrder.where({ code }).count(saveOptions);

			if (count > 0) {
				throw {
					status  : 409,
					label   : "DUP_CODE",
					message : "Cannot place a new order due to dup code, try again",
				};
			}

			const attributes = {
				code,
				date         : new Date(),
				note         : null,
				order_status : BuyOrder.ORDER_STATUSES.ACTIVE,
				..._.pick(orderData, ["customer_id", "customer_address_id", "billing_profiles_id"]),
			};

			const buyOrder     = await new BuyOrder().save(attributes, saveOptions);
			const { saleOrderIds, providerIds } = await createSaleOrders(buyOrder.id, orderData, { transacting : t });
			for (const providerId of providerIds) {
				const providerModel = await new ProviderModel({ id : parseInt(providerId) }).fetch({ transacting : t });
				const providerEmailTemplate  = await makeTemplateNewBuyOrder({
					userName     : providerModel.get("trade_name"),
					code         : code,
					buyOrderLink : `${settings.settings.server_url}/proveedor/ordenes/detalles/${code}?provider_id=${providerId}`,
				});

				newBuyOrderNotificationEmail({
					to      : providerModel.get("store_email"),
					html    : providerEmailTemplate,
					subject : "Nuevo Pedido",
				});
			}
			buyOrder.attributes.sale_order_ids = saleOrderIds;

			return buyOrder.attributes;
		});

		const htmlTemplate     = await makeTemplateBuyOrder(buyOrderResponse.id);
		const permissionMailer = await validatePermisonEmail(orderData.customer_id, 1);

		if (permissionMailer) {
			sendMailBuyOrder(htmlTemplate, permissionMailer);
		}

		saveOrderPdf(htmlTemplate, buyOrderResponse);

		return buyOrderResponse;
	} catch (error) {
		throw error && error.status && error.label ? error : {
			status  : 500,
			label   : "DATABASE_ERROR",
			message : "There was a problem with the database",
			error   : error,
		};
	}
}
