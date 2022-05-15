/* eslint-disable camelcase */
import { allow, composeMiddlewares, auth_validation } from "~/Util/ApiHelpers";

import { addProduct } from "~/Server/controllers/products/provider_has_product_controller";

const Register = async (request, response) => {
	try {
		request.body.provider_id = request.query.providerId;
		const data = await addProduct(request.body);
		response.status(200).send(data);
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);
		response.status(error.status ? error.status : 500).send(error ?  error : Object.values(error));
	}
};

export default composeMiddlewares(
	allow("POST"),
	auth_validation(["PROVIDER", "ADMIN", "EMPLOYEE"]),
)(Register);
