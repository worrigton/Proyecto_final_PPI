/* eslint-disable no-console */
import { allow, composeMiddlewares } from "~/Util/ApiHelpers";
import { passwordRecoveryConfirmation }   from "~/Server/controllers/session/session_controller";

const ChangePassword = async (request, response) => {
	try {
		const data = await passwordRecoveryConfirmation(request.body);

		response.status(200).send(data);
	} catch (error) {
		console.log(error);
		response.status(error.status ? error.status : 500).send(error ?  error : Object.values(error));
	}
};

export default composeMiddlewares(allow("POST"))(ChangePassword);
