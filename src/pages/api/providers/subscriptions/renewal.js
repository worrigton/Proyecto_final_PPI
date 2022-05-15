/* eslint-disable camelcase */
import { allow, composeMiddlewares } from "~/Util/ApiHelpers";
import { renewalSuscriptions }       from "~/Server/controllers/info/payment_controller";

const Renewal = async (request, response) => {
	try {
		const data = await renewalSuscriptions();
		response.status(200).send(data);
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);
		response.status(error.status || 500).send(error || Object.values(error) || JSON.stringify(error));
	}
};

export default composeMiddlewares(allow("GET"))(Renewal);
