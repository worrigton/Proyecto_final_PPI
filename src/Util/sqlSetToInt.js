import _ from "lodash";

const sqlSetToInt = function(obj, setValues) {
	let keys;
	if (Array.isArray(obj)) {
		keys = obj;
	}
	else if (typeof obj == "object" ) {
		keys = _.keys(obj);
	}
	else if (typeof obj == "string") {
		keys = obj.split(",");
	}
	else {
		throw new TypeError("The input obj must be an Array of string, an object or a comma separated string");
	}

	return _.chain(setValues)
		.pick(keys)
		.values()
		.reduce((a, b) => a | b, 0)
		.value();
};

export default sqlSetToInt;
