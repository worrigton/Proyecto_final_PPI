/* eslint-disable camelcase */
import { create } from "~/Server/controllers/customers/billing_profiles_controller";
import {
	allow,
	composeMiddlewares,
	auth_validation,
} from "~/Util/ApiHelpers";

const Create = async (request, response) => {
	try {
		const data = await create(request.body);
		response.status(200).send(data);
	} catch (error) {
		response.status(error.status ? error.status : 500).send(error ?  error : Object.values(error));
	}
};

export default composeMiddlewares(
	auth_validation(["CUSTOMER"]),
	allow("POST")
)(Create);
