import generalMethods from "./generalMethods";
import admin          from "./admin";
import customer       from "./customer";
import provider       from "./provider";
import employee       from "./employee";
import product        from "./product";
import saleOrders     from "./saleOrders";
import user           from "./user";

const handleError = fn => async (...argsForFn) => {
	try {
		return fn(...argsForFn);
	} catch (err) {
		console.error("[Service.api] An exception has occurred. ", err);

		return false;
	}
};

const mapObjValuesRec = (obj, mapFn) => Object
	.entries(obj)
	.reduce((acc, [key, value]) => {
		const mappedValue = typeof value === "object" && !Array.isArray(value)
			? mapObjValuesRec(value, mapFn)
			: mapFn(value);

		return {
			...acc,
			[key] : mappedValue,
		};
	}, {});

// Inside Service.api, map all methods and objects' methods to handleError
const Service = {
	api : mapObjValuesRec({
		...generalMethods,
		admin,
		customer,
		provider,
		employee,
		product,
		saleOrders,
		user,
	}, handleError),
};

export default Service;
