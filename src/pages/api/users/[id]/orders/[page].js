/* eslint-disable camelcase */
/* eslint-disable max-len */
import {
	auth_validation,
	allow,
	composeMiddlewares,
} from "~/Util/ApiHelpers";

const rowsOfData = [
	{ order_id : 1001, order_date : new Date(), provider : "Semillas y Granos de Sinaloa", client : "Cliente de Prueba", payment_status : "pending", flag : "not_ready", total : "1280" },
	{ order_id : 1002, order_date : new Date(), provider : "Semillas y Granos de Sinaloa", client : "Cliente de Prueba 2", payment_status : "finalized", flag : "not_ready", total : "1280" },
];

const GetUserOrders = (req, res) => {
	const {
		flag : requestedFlag,
		per_page,
		page,
		ord,
		order_by,
		search_query,
	} = req.query;

	// Apply filters
	let filteredData = requestedFlag
		? rowsOfData.filter(({ flag }) => flag === requestedFlag)
		: rowsOfData;

	if (typeof search_query === "string" && search_query) {
		filteredData = filteredData
			.filter(({ name }) => name.toLowerCase().includes(search_query.toLowerCase()));
	}

	const compareKey = key => (a, b) => {
		let elementFromA = a[key];
		let elementFromB = b[key];

		typeof elementFromA === "string" && (elementFromA = elementFromA.toLowerCase());
		typeof elementFromB === "string" && (elementFromB = elementFromB.toLowerCase());

		return elementFromA > elementFromB
			? 1
			: -1;
	};

	let orderedData = order_by
		? filteredData.sort(compareKey(order_by))
		: filteredData;

	if (ord !== "ASC" && ord !== "DES") {
		return res.status(400).send("Ord must be \"ASC\" or \"DES\"");
	}

	if (ord === "DES") {
		orderedData = orderedData.reverse();
	}

	const perPage       = parseInt(per_page);
	const maxNumOfPages = Math.ceil(orderedData.length / perPage);
	const currentPage   = page > maxNumOfPages || page <= 0
		? 0
		: parseInt(page - 1);

	const collection = orderedData.slice(currentPage * perPage, currentPage * perPage + perPage);

	res.status(200).send({
		collection,
		pagination : {
			pageSize : perPage,
			rowCount : orderedData.length,
			page     : currentPage + 1,
		},
	});
};

export default composeMiddlewares(
	allow("GET"),
	auth_validation,
)(GetUserOrders);
