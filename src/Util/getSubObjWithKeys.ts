/**
 * Generates a new object composed by the selected properties defined in the original object
 * 
 * @author Montserrat Delgado Alvarez <mdanatg@gmail.com>
 * @param obj
 * @param keys
 */
const getSubObjWithKeys = (obj: object, keys: string[] = []): any => {
	if (!Array.isArray(keys)) {
		throw "[getKeysFromObj] 'keys' must be an array";
	}

	return Object
		.entries(obj)
		.reduce((acc, [key, value]) => {
			// If the "key" is part of the "keys" arr, add it to the output obj
			if (keys.indexOf(key) >= 0) {
				return {
					...acc,
					[key] : value,
				};
			}

			return acc;
		}, {});
};

export default getSubObjWithKeys;
