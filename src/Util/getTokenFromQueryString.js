/**
 * Get params with window global and parse them with qs
 *
 * @author Angel Castañeda <yael.alcalla@gmail.com>
 * @returns query string token
 *
 */
const getTokenFromQueryString = () => {
	if (typeof window !== "undefined") {
		const { href } = window.location;

		if (href.includes("?")) {
			const queryString = href.slice(href.indexOf("?") + 7, href.length);
			return queryString;
		}
	}
	return false;
};

export default getTokenFromQueryString;
