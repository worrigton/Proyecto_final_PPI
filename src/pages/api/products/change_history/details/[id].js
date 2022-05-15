/* eslint-disable camelcase */
import { allow, composeMiddlewares, auth_validation } from "~/Util/ApiHelpers";

import { getProductChangeHistory } from "~/Server/controllers/products/product_change_history_controller";

const Paginate = async (request, response) => {
	try {
		const data = await getProductChangeHistory(request.query.id);
		response.status(200).send(data);
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);
		response.status(error.status ? error.status : 500).send(error ?  error : Object.values(error));
	}
};

export default composeMiddlewares(
	allow("GET"),
	auth_validation(["PROVIDER", "ADMIN", "EMPLOYEE"])
)(Paginate);
