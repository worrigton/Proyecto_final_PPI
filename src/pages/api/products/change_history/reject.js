/* eslint-disable camelcase */
import {
	allow,
	auth_validation,
	composeMiddlewares,
} from "~/Util/ApiHelpers";

import { rejectProductChangeHistory } from "~/Server/controllers/products/product_change_history_controller";

const Reject = async (request, response) => {
	try {
		request.body.user_type = request.decoded?.data?.type;
		const data = await rejectProductChangeHistory(request.body);
		response.status(200).send(data);
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);
		response.status(error.status ? error.status : 500).send(error ?  error : Object.values(error));
	}
};

export default composeMiddlewares(
	allow("PATCH"),
	auth_validation(["ADMIN"])
)(Reject);
