import { allow, composeMiddlewares } from "~/Util/ApiHelpers";
import { addCategory }               from "~/Server/controllers/products/category_controller";

const Create = async (request, response) => {
	try {
		const data = await addCategory(request.body);
		response.status(200).send(data);
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);
		response.status(error.status ? error.status : 500).send(error ?  error : Object.values(error));
	}
};

export default composeMiddlewares(allow("POST"))(Create);
