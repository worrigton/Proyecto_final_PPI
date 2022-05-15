/* eslint-disable camelcase */
import {
	allow,
	composeMiddlewares,
	auth_validation,
} from "~/Util/ApiHelpers";

import { delProvidersToEmployee } from "~/Server/controllers/users/employee_controller";

const UnlinkProviderToEmployee = async (request, response) => {
	try {
		await delProvidersToEmployee(
			parseInt(request.body.employee_id),
			parseInt(request.body.provider_id)
		);
		response.status(200).send("ok");
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);
		response.status(error.status ? error.status : 500).send(error ?  error : Object.values(error));
	}
};

export default composeMiddlewares(
	allow("DELETE"),
	auth_validation(["ADMIN", "EMPLOYEE"]),
)(UnlinkProviderToEmployee);
