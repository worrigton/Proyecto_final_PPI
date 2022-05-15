import { allow, composeMiddlewares } from "~/Util/ApiHelpers";

import paymentController from "~/Server/controllers/info/payment_controller";

const validateCoupon = async ( request, response ) => {
	try {
		const paymentResult = await paymentController.validateCoupon(request.query.id);
		response.status(200).send({ message : "success", label : "coupon", payload : paymentResult });
	} catch (error) {
		response.status(error.status).send({ message : "error", label : error.label });
	}
};

export default composeMiddlewares(allow("GET"))(validateCoupon);
