/* eslint-disable camelcase */
import {
	allow,
	composeMiddlewares,
	auth_validation,
} from "~/Util/ApiHelpers";

import { getCustomer } from "~/Server/controllers/customers/customer_controller";

const Paginate = async (request, response) => {
	try {
		const data = await getCustomer(request.query.id);
		response.status(200).send(data);
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);
		response.status(error.status ? error.status : 500).send(error ?  error : Object.values(error));
	}
};

export default composeMiddlewares(
	allow("GET"),
	auth_validation(["CUSTOMER", "ADMIN"]),
)(Paginate);
