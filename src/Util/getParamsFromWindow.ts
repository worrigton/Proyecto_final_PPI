import qs from "qs";

/**
 * Get params with window global and parse them with qs
 * 
 * @author Montserrat Delgado Alvarez <mdanatg@gmail.com>
 * @returns query string params in json
 * 
 */
const getParamsFromWindow = (): any => {
    if (typeof window !== "undefined") {
        const { href } = window.location;

        if (href.includes("?")) {
            const queryString = href.slice(href.indexOf("?") + 1, href.length);

            if (queryString) {
                return qs.parse(queryString);
            }
        }
    }

    return {};
};

export default getParamsFromWindow;
