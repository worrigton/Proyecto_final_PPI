/* eslint-disable camelcase */
import {
	allow,
	auth_validation,
	composeMiddlewares,
} from "~/Util/ApiHelpers";

const fakeApprovals = [
	{
		image   : "/assets/products/nuez.png",
		flag    : "new_product",
		name    : "Nuez Pecana con cáscara",
		addedBy : "Cosechas Mex SA de CV",
		id      : "1",
	},
	{
		image   : "/assets/products/nuez.png",
		flag    : "new_product",
		name    : "Nuez Pecana con cáscara",
		addedBy : "Cosechas Mex SA de CV",
		id      : "2",
	},
	{
		image   : "/assets/products/nuez.png",
		flag    : "new_product",
		name    : "Nuez Pecana con cáscara",
		addedBy : "Cosechas Mex SA de CV",
		id      : "3",
	},
];

const Approvals = (req, res) => {
	res.status(200).send({
		collection : fakeApprovals,
	});
};

export default composeMiddlewares(
	allow("GET"),
	auth_validation,
)(Approvals);
