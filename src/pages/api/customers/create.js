import { allow, composeMiddlewares } from "~/Util/ApiHelpers";
import userController                from "~/Server/controllers/users/user_controller";

export const config = {
	api : {
		bodyParser : {
			sizeLimit : "2mb",
		},
	},
};

const Register = async (request, response) => {
	try {
		const data = await userController.register(request.body);
		response.status(200).send(data);
	} catch (error) {
		response.status(error.status ? error.status : 500).send(error ?  error : Object.values(error));
	}
};

export default composeMiddlewares(allow("POST"))(Register);
