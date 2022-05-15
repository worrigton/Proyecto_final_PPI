/**
 * Capitalizes a string
 * @author Yael Mártin A. Alcalá León <yael.alcalla@gmail.com>
 * @param str
 */
const capitalize = (str: string) => str[0].toUpperCase() + (str.substring(1, str.length) || "").toLowerCase();

export default capitalize;
