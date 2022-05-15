/* eslint-disable camelcase */
import { authHeader, fetcher } from "~/Util";

const apiUrl = "/api/products";

const ApiProductMethods = {
	likeProduct : async (product_details_id, user_id, type) => {
		const requestOptions = {
			method  : "POST",
			headers : authHeader(type),
			body    : JSON.stringify({
				product_details_id,
				user_id,
			}),
		};

		return fetcher("/api/products/like", requestOptions);
	},

	dislikeProduct : async (product_details_id, user_id, type) => {
		const requestOptions = {
			method  : "DELETE",
			headers : authHeader(type),
			body    : JSON.stringify({
				product_details_id,
				user_id,
			}),
		};

		return fetcher("/api/products/dislike", requestOptions);
	},
	productsPage : async (page, qs, type) => {
		try {
			const requestOptions = {
				method  : "GET",
				headers : authHeader(type),
			};

			let response = await fetch(`${apiUrl}/page/${page}?${qs}`, requestOptions);
			response = await response.json();
			if (response?.ok) {
				return {
					body   : await response.body.json(),
					status : true,
				};
			}
			else
				throw response;
		} catch (error) {
			const errorMessage = await error;
			return {
				body   : errorMessage,
				status : false,
			};
		}
	},
};

export default ApiProductMethods;
