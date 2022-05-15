import escapeStringRegexp from "escape-string-regexp";

/**
 * Converts an input string into a Date object if it is valid.
 *
 * @author  Cesar Herrera.
 * @version 0.10.0
 *
 * @param  {string} stringDate - String to be validated and parsed to a string.
 * @return {Date} returns the parsed date.
 */
const parseDate = (stringDate) => {
	let sanitizedDate = stringDate ? escapeStringRegexp(stringDate) : undefined;

	if (sanitizedDate) {
		if (sanitizedDate.match(/^\d+$/i)) {
			sanitizedDate = new Date(parseInt(sanitizedDate));
		}
		else {
			sanitizedDate = new Date(sanitizedDate);
		}

		if (isNaN(sanitizedDate)) {
			throw new TypeError("'stringDate' does not have a valid Date format.");
		}
	}
	return sanitizedDate;
};

export default parseDate;
