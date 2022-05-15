/* eslint-disable camelcase */
import {
	allow,
	auth_validation,
	composeMiddlewares,
} from "~/Util/ApiHelpers";

import { rateUser } from "~/Server/controllers/users/user_controller";

const Rate = async (request, response) => {
	try {
		const data = await rateUser(request.body);
		response.status(200).send(data);
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);
		response.status(error.status ? error.status : 500).send(error ?  error : Object.values(error));
	}
};

export default composeMiddlewares(
	allow("POST"),
	auth_validation(["PROVIDER", "ADMIN", "EMPLOYEE", "CUSTOMER"])
)(Rate);
