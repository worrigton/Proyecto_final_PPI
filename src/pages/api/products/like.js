/* eslint-disable camelcase */
/* eslint-disable no-console */
import {
	allow,
	auth_validation,
	composeMiddlewares,
} from "~/Util/ApiHelpers";
import { addProductToFavorities } from "~/Server/controllers/products/product_controller";

const Create = async (request, response) => {
	try {
		request.body.user_id = request.decoded?.data?.id;

		const data = await addProductToFavorities(request.body);
		response.status(200).send(data);
	} catch (error) {
		console.log(error);
		response.status(error.status ? error.status : 500).send(error ?  error : Object.values(error));
	}
};

export default composeMiddlewares(
	allow("POST"),
	auth_validation(["PROVIDER", "ADMIN", "EMPLOYEE", "CUSTOMER"]),
)(Create);
