import { allow, composeMiddlewares } from "~/Util/ApiHelpers";

import paymentController from "~/Server/controllers/info/payment_controller";

const paymentToken = async ( request, response ) => {
	try {
		const paymentResult = await paymentController.getClientSecret(request.query);
		response.status(200).send({ message : "success", label : "payment_done", payload : paymentResult });
	} catch (error) {
		response.status(error.status ? error.status : 500).send({ message : "error", label : error });
	}
};

export default composeMiddlewares(allow("GET"))(paymentToken);
