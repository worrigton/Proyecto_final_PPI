/* eslint-disable camelcase */
/* eslint-disable max-len */
const nodemailer = require("../mailer_service.js");
const moment     = require("moment");
const fs         = require("fs");
require("moment/locale/es");
moment().locale("es");

import { getBuyOrderDetails } from "~/Server/controllers/orders/buy_orders_controller";

import { formatToCurrency } from "~/Util";

const ACTIONS_DATA = {
	"PAID" : { // Pago aprobado
		STATUS       : "Pedido pagado.",
		LABEL_STATUS : "Se ha marcado como pagado tu pedido.",
		MESSAGE      : "El vendedor ha verificado tu método de pago como exitoso y marcó tu pedido como pagado.",
	},
	"READY" : { // Pedido preparado
		STATUS       : "Pedido preparado",
		LABEL_STATUS : "Tenemos listo tu pedido",
		MESSAGE      : "El vendedor ha iniciado el proceso de envío, tendrás tu pedido tan pronto como sea posible. Si pediste varios artículos es posible que el envío se realice en paquetes separados.",
	},
	"DELIVERED" : { // Pedido Entregado
		STATUS       : "Pedido entregado",
		LABEL_STATUS : "Tu pedido ha llegado a la puerta",
		MESSAGE      : "Tu pedido ha sido entregado, verifica que la información sea correcta.",
	},
	"CANCELED" : { // Pedido Cancelado por el proveedor
		STATUS       : "Pedido cancelado",
		LABEL_STATUS : "Lo sentimos, tu pedido ha sido cancelado",
		MESSAGE      : "Lo sentimos, el proveedor ha cancelado tu pedido, por la siguiente razón: *RAZON*, para cualquier aclaración contactanos.",
	},
	"DECLINED" : { // Pedido Cancelado por el cliente
		STATUS       : "Pedido cancelado",
		LABEL_STATUS : "Haz cancelado tu pedido",
		MESSAGE      : "Sentimos que hayas cancelado tu pedido, si tienes dudas o claraciónes haznos saber.",
	},
};

export const mailChangeOrderStatus = async ({
	buy_order_id : buyOrderId,
	provider_id  : providerId,
	email,
	action,
}) => {
	try {
		const buyOrder = await getBuyOrderDetails(buyOrderId, providerId);

		let html = fs.readFileSync("src/Server/views/sale_order_status.html", "utf8");
		const customerAddress = buyOrder.customer.customer_address.address;
		const shippingAddrres = `Mexico, ${customerAddress.state}, ${customerAddress.city}, ${customerAddress.neighborhood}, ${customerAddress.street} ${`${customerAddress.ext_num  } ${ buyOrder.customer_address.int_num || "" }`}. ${customerAddress.zip_code}, ${buyOrder?.customer_address?.telephone}`;

		html = html.replace("*LABEL_STATUS*", ACTIONS_DATA[action].LABEL_STATUS);
		html = html.replace("*STATUS*", ACTIONS_DATA[action].STATUS);
		html = html.replace("*MESSAGE*", ACTIONS_DATA[action].MESSAGE);
		html = html.replace("*CODE*", buyOrder.code);
		html = html.replace("*USER_NAME*", `${buyOrder.customer.first_name} ${buyOrder.customer.last_name}`);
		html = html.replace("*SHIPPING_ADDRESS*", shippingAddrres);
		let concepts = "";
		for (const product of buyOrder.sale_orders[0].products) {
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
			</table><hr>`;
		}

		html = html.replace("*CONCEPTS*", concepts);

		const mailOptions = {
			from    : "Zoko <info@mailer.zoko.mx>", // sender address
			to      : email,
			subject : "Actualización de tu orden en Zoko", // Subject line
			html,
		};

		nodemailer.transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				throw { error };
			}
			return;
		});
	} catch (error) {
		throw {
			status  : 200,
			message : "El correo no pudo ser enviado exitosamente",
			error,
		};
	}
};

export const sendMailBuyOrder = async (HtmlTemplate, email) => {
	try {
		const mailOptions = {
			from    : "Zoko <zoko@gmail.com>", // sender address
			to      : email,
			subject : "Información de tu pedido en Zoko", // Subject line
			html    : HtmlTemplate,
		};

		nodemailer.transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				throw { error };
			}
			return;
		});
	} catch (error) {
		throw {
			status  : 200,
			message : "El correo no pudo ser enviado exitosamente",
			error,
		};
	}
};
