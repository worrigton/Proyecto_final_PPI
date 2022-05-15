/* eslint-disable camelcase */
import { update } from "~/Server/controllers/providers/shipping_profiles_controller";
import {
	allow,
	composeMiddlewares,
	auth_validation,
} from "~/Util/ApiHelpers";

const Update = async (request, response) => {
	try {
		const data = await update(request.body);
		response.status(200).send(data);
	} catch (error) {
		response.status(error.status ? error.status : 500).send(error ?  error : Object.values(error));
	}
};

export default composeMiddlewares(
	auth_validation(["PROVIDER", "EMPLOYEE", "ADMIN"]),
	allow("PATCH")
)(Update);
