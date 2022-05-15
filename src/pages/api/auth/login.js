/* eslint-disable no-console */
import { allow, composeMiddlewares } from "~/Util/ApiHelpers";
import sessionController             from "~/Server/controllers/session/session_controller";

const AuthLogin = async (request, response) => {
	try {
		const data = await sessionController.login(request.body);

		response.status(200).send(data);
	} catch (error) {
		console.log(error);
		response.status(error.status ? error.status : 500).send(error ?  error : Object.values(error));
	}
};

export default composeMiddlewares(allow("POST"))(AuthLogin);
