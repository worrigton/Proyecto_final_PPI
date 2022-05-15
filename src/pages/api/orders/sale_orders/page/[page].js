/* eslint-disable camelcase */
import {
	allow,
	auth_validation,
	composeMiddlewares,
} from "~/Util/ApiHelpers";
import { getPage } from "~/Server/controllers/orders/sale_order_controller";

const Paginate = async (request, response) => {
	try {
		const data = await getPage(request.query);
		response.status(200).send(data);
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);
		// response.status(error.status || 500).send(error || Object.values(error) || JSON.stringify(error));
	}
};

export default composeMiddlewares(
	allow("GET"),
	auth_validation(["ADMIN", "EMPLOYEE", "CUSTOMER", "PROVIDER"]),
)(Paginate);
