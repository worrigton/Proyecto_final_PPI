/* eslint-disable no-undef */
/* eslint-disable camelcase */
import {
	allow,
	auth_validation,
	composeMiddlewares,
} from "~/Util/ApiHelpers";

import { placeOrder } from "~/Server/controllers/orders/buy_orders_controller";

const PlaceOrder = async (request, response) => {
	try {
		const result = await placeOrder(request.body);
		response.status(200).send(result);
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);
		response.status(error?.status || 500).send(error?.message || error);
	}
};

export default composeMiddlewares(
	allow("POST"),
	auth_validation(["CUSTOMER"]),
)(PlaceOrder);
