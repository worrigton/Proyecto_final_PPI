/* eslint-disable camelcase */
import {
	allow,
	composeMiddlewares,
	auth_validation,
} from "~/Util/ApiHelpers";
import { getConfigCustomerEmail } from "~/Server/controllers/customers/customer_emails_controller";

const Paginate = async (request, response) => {
	try {
		const data = await getConfigCustomerEmail(request.query.customerId);
		response.status(200).send(data);
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);
		response.status(error.status ? error.status : 500).send(error ?  error : Object.values(error));
	}
};

export default composeMiddlewares(
	auth_validation(["CUSTOMER"]),
	allow("GET"),
)(Paginate);
