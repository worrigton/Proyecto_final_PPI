/* eslint-disable camelcase */
import { allow, composeMiddlewares } from "~/Util/ApiHelpers";
import { getPage }                   from "~/Server/controllers/products/product_controller";

const Paginate = async (request, response) => {
	const { search_query } = request.query;

	if (search_query) {
		request.query["filter"] = search_query;
	}

	try {
		const data = await getPage(request.query);
		response.status(200).send(data);
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);
		response.status(error.status ? error.status : 500).send(error ?  error : Object.values(error));
	}
};

export default composeMiddlewares(allow("GET"))(Paginate);
