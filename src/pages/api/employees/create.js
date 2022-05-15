/* eslint-disable camelcase */
import {
	allow,
	composeMiddlewares,
	auth_validation,
} from "~/Util/ApiHelpers";

import { register } from "~/Server/controllers/users/user_controller";

const Register = async (request, response) => {
	try {
		const data = await register(request.body);
		response.status(200).send(data);
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);
		response.status(error.status ? error.status : 500).send(error ?  error : Object.values(error));
	}
};

export default composeMiddlewares(
	allow("POST"),
	auth_validation(["ADMIN"]),
)(Register);

