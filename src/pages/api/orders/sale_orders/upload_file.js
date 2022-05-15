/* eslint-disable camelcase */
/* eslint-disable no-console */
import {
	allow,
	auth_validation,
	composeMiddlewares,
} from "~/Util/ApiHelpers";
import { updloadFileToSaleOrder } from "~/Server/controllers/orders/sale_order_controller";

export const config = {
	api : {
		bodyParser : {
			sizeLimit : "10mb",
		},
	},
};

const updaloadFile = async (request, response) => {
	try {
		const data = await updloadFileToSaleOrder(request.body);
		response.status(200).send(data);
	} catch (error) {
		console.log(error);
		response.status(error.status ? error.status : 500).send(error ?  error : Object.values(error));
	}
};

export default composeMiddlewares(
	allow("POST"),
	auth_validation(["PROVIDER", "ADMIN", "CUSTOMER"]),
)(updaloadFile);
