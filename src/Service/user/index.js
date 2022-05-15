/* eslint-disable camelcase */
// Import Own Components
import { authHeader }        from "~/Util";
import { processFetchError } from "~/Util/ApiHelpers";

const apiUrl = "/api/users";

const ApiUsersMethods = {
	delete : async (userId, type, token) => {
		const requestOptions = {
			method  : "DELETE",
			headers : !token
				? authHeader(type)
				: ({
					Authorization  : `Bearer ${token}`,
					"Content-Type" : "application/json",
				}),
			body : JSON.stringify({
				id : userId,
			}),
		};
		const response = await fetch(`${apiUrl}/delete`, requestOptions);
		await processFetchError(response);
	},
};

export default ApiUsersMethods;
