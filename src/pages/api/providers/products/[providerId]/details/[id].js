/* eslint-disable camelcase */
import {
	allow,
	composeMiddlewares,
	auth_validation,
} from "~/Util/ApiHelpers";
import { getProductDetails } from "~/Server/controllers/products/product_controller";

const Details = async (request, response) => {
	try {
		const userId = request.decoded?.data?.id;
		const data = await getProductDetails({
			id          : request.query.id,
			provider_id : request.query.providerId,
			user_id     : userId,
		});
		response.status(200).send(data);
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);
		response.status(error.status ? error.status : 500).send(error ?  error : Object.values(error));
	}
};

export default composeMiddlewares(
	allow("GET"),
	auth_validation(["PROVIDER", "ADMIN", "EMPLOYEE"]),
)(Details);
