/* eslint-disable camelcase */
/* eslint-disable max-len */
import { allow, composeMiddlewares } from "~/Util/ApiHelpers";

import paymentController from "~/Server/controllers/info/payment_controller";

const Payment = async (request, response) => {
	try {
		const paymentResult = await paymentController.pay(request.body);
		response.status(200).send({ message : "success", label : "payment_done", payload : paymentResult });
	} catch (error) {
		// let messageError;
		// if (error.error.code === "ER_DUP_ENTRY") {
		// 	messageError = "Nombre de usuario duplicado";
		// }
		response.status(error.status ? error.status : 500).send({ message : "error", label : error });
	}
};


export default composeMiddlewares(allow("POST"))(Payment);

