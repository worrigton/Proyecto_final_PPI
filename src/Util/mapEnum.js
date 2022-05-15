/**
 * Makes an inversed copy of the input map turns keys into values and viceversa.
 *
 * @author  Daniel A. Plascencia R.
 * @version 1.0.0
 *
 * @param {{
 *     ":key_1" : ':value1',
 *     ":key_2" : ':value2',
 *     ":key_N" : ':valueN'
 * }} myEnum - Input enum or map values must be integers or strings.
 * @return {{
 *     ":value_1" : ':key1',
 *     ":value_2" : ':key2',
 *     ":value_N" : ':keyN'
 * }} As output returns the inverse of the input.
*/
const mapEnum = myEnum => Object.keys(myEnum).reduce((map, key) => {
	map[myEnum[key]] = key;
	return map;
}, {});

export default mapEnum;
