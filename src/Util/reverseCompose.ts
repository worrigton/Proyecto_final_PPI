/**
 * Apply an argument to the following functions in a sequancial order
 * @param arg 
 * @param fns 
 * @example
 * // This expression is the same as Number(String(Number(String(2))));
 * // Returns 2
 * appliedReverseComponse(2, String, Number, String, Number);
 */
const appliedReverseComponse = (arg: any, ...fns) => {
	let result = arg;

	for (const fn of fns) {
		result = fn(result);
	}

	return result;
};

export default appliedReverseComponse;
