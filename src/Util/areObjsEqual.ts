/**
 * Compare if two objects have the same keys with the same values
 * this only works for 1 layer no sub objects
 * @author Montserrat Delgado Alvarez <mdanatg@gmail.com>
 * @param obj1
 * @param obj2
 * @example
 * // Returns true
 * areObjsEqual({ name : "Thomas" }, { name : "Thomas" });
 * 
 * // Returns false (Has sub objects)
 * areObjsEqual({ name : "Thomas", userData : {} }, { name : "Thomas", userData : {} });
 */
const areObjsEqual = (obj1: object, obj2: object): boolean => {
	const obj1Props = Object.getOwnPropertyNames(obj1);
	const obj2Props = Object.getOwnPropertyNames(obj2);

	if (obj1Props.length != obj2Props.length) {
		return false;
	}

	for (let i = 0; i < obj1Props.length; i++) {
		const propName = obj1Props[i];

		if (obj1[propName] !== obj2[propName]) {
			return false;
		}
	}

	return true;
};

export default areObjsEqual;
