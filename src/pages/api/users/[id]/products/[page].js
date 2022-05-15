/* eslint-disable camelcase */
/* eslint-disable max-len */
import {
	auth_validation,
	allow,
	composeMiddlewares,
} from "~/Util/ApiHelpers";

const rowsOfData = [
	{ img : "/assets/products/nuez.png", name : "Arroz integral blanco", flag : "revision_pending", offeredBy : 0 },
	{ img : "/assets/products/semilla_de_calabaza.jpg", name : "Semilla de calabaza sin cáscara", flag : "", offeredBy : 50 },
	{ img : "/assets/products/frijol_flo_de_junio.jpg", name : "Frijol flor de junio", flag : "", offeredBy : 2 },
	{ img : "/assets/products/frijol_peruano_bola.png", name : "Frijol peruano bola", flag : "suggested_change", offeredBy : 10 },
	{ img : "/assets/products/2.png", name : "Producto 1", flag : "new_product", offeredBy : 0 },
	{ img : "/assets/products/2.png", name : "Producto 2", flag : "revision_pending", offeredBy : 0 },
	{ img : "/assets/products/2.png", name : "Producto 3", flag : "new_product", offeredBy : 0 },
	{ img : "/assets/products/2.png", name : "Producto 4", flag : "revision_pending", offeredBy : 0 },
];

const GetUserProducts = (req, res) => {
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

	if (ord !== "ASC" && ord !== "DESC") {
		return res.status(400).send("Ord must be \"ASC\" or \"DESC\"");
	}

	if (ord === "DESC") {
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
)(GetUserProducts);
