/* eslint-disable camelcase */
import {
	allow,
	composeMiddlewares,
	auth_validation,
} from "~/Util/ApiHelpers";

import { deleteUser } from "~/Server/controllers/users/user_controller";

const Delete = async (request, response) => {
	try {
		await deleteUser(parseInt(request.body.id));
		response.status(200).send("ok");
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);
		response.status(error.status ? error.status : 500).send(error ?  error : Object.values(error));
	}
};

export default composeMiddlewares(
	allow("DELETE"),
	auth_validation(["ADMIN", "CUSTOMER", "PROVIDER"]),
)(Delete);
