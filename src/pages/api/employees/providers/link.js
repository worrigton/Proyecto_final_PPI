/* eslint-disable camelcase */
import {
	allow,
	composeMiddlewares,
	auth_validation,
} from "~/Util/ApiHelpers";

import { linkProvidersToEmployee } from "~/Server/controllers/users/employee_controller";

const LinkProvider = async (request, response) => {
	try {
		await linkProvidersToEmployee(
			parseInt(request.body.employee_id),
			[parseInt(request.body.provider_id)]
		);
		response.status(200).send("ok");
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);
		response.status(error.status ? error.status : 500).send(error ?  error : Object.values(error));
	}
};

export default composeMiddlewares(
	allow("POST"),
	auth_validation(["ADMIN", "EMPLOYEE"]),
)(LinkProvider);
