/**
 * Capitalizes a string
 * @author Montserrat Delgado Alvarez <mdanatg@gmail.com>
 * @param str
 */
const capitalize = (str: string) => str[0].toUpperCase() + (str.substring(1, str.length) || "").toLowerCase();

export default capitalize;
