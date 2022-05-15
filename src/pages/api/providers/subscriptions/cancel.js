/* eslint-disable camelcase */
import {
	allow,
	auth_validation,
	composeMiddlewares,
} from "~/Util/ApiHelpers";

import { cancelSubscription } from "~/Server/controllers/info/payment_controller";

/**
 * Change Subscription
 * @param {{
 *     body : {{
 *         provider_id         : number,
 *     }}
 * }} request
 * @param {*} response
 */
const CancelSubscription = async (request, response) => {
	try {
		const data = await cancelSubscription(request.body);
		response.status(200).send(data);
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log(error);
		response.status(error.status ? error.status : 500).send(error ?  error : Object.values(error));
	}
};

export default composeMiddlewares(
	allow("PATCH"),
	auth_validation(["PROVIDER", "ADMIN"])
)(CancelSubscription);
