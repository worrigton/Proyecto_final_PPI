/* eslint-disable camelcase */
import { allow, composeMiddlewares, auth_validation } from "~/Util/ApiHelpers";

import { getBuyOrderDetails } from "~/Server/controllers/orders/buy_orders_controller";

const Details = async (request, response) => {
	try {
		const providerId = request.query.provider_id || undefined;
		const data = await getBuyOrderDetails(request.query.idOrCode, providerId);
		response.status(200).send(data);
	} catch (error) {
		response.status(error.status ? error.status : 500).send(error ?  error : Object.values(error));
	}
};

export default composeMiddlewares(
	allow("GET"),
	auth_validation(["ADMIN", "EMPLOYEE", "CUSTOMER", "PROVIDER"]),
)(Details);
