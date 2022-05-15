/* eslint-disable camelcase */
/* eslint-disable max-len */
import {
	auth_validation,
	allow,
	composeMiddlewares,
} from "~/Util/ApiHelpers";

const rowsOfData = [
	{ img : "/assets/supliers/cosechas.png", name : "Casechas Mex Sa de CV", evaluation : 3, registration_date : new Date("08/01/2019"), products_quantity : 40, offered_products : 12 },
	{ img : "/assets/supliers/granos.png", name : "Granos de Sinaloa SA de CV", evaluation : 10, registration_date : new Date("04/01/2018"), products_quantity : 20, offered_products : 20 },
	{ img : "/assets/supliers/agro.png", name : "Agro Comercial Rancho las Ánimas", evaluation : 10, registration_date : new Date("01/01/2018"), products_quantity : 10, offered_products : 32 },
];

const GetSupliers = (req, res) => {
	const {
		evaluation : requestedFlag,
		per_page,
		page,
		ord,
		order_by,
		search_query,
	} = req.query;

	// Apply filters
	let filteredData = requestedFlag
		? rowsOfData.filter(({ evaluation }) => evaluation === requestedFlag)
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

	if (ord !== "ASC" && ord !== "DESC") {
		return res.status(400).send("Ord must be \"ASC\" or \"DESC\"");
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
			per_page     : perPage,
			total        : orderedData.length,
			current_page : currentPage + 1,
			from         : collection[0],
			to           : collection[collection.length - 1],
		},
	});
};

export default composeMiddlewares(
	allow("GET"),
	auth_validation,
)(GetSupliers);
