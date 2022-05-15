import fetch from "isomorphic-unfetch";

/**
 * Makes a isomorphic-unfetch request and returns a json object if succeeded, else a false
 * 
 * @author Montserrat Delgado Alvarez <mdanatg@gmail.com>
 * @param url
 * @param options
 */
const fetcher = async (url: RequestInfo, options?: RequestInit): Promise<any | false> => {
	const response = await fetch(url, options);

	return response.ok
		? response.json()
		: false;
};

export default fetcher;
