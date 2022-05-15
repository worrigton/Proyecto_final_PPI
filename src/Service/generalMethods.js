/* eslint-disable camelcase */
import {
	fetcher,
	authHeader,
} from "~/Util";

const ApiMethods = {
	login : async (username, password) => {

		const requestOptions = {
			method : "POST",
			body   : JSON.stringify({
				user : username,
				password,
			}),
		};

		return fetcher("/api/auth/login", requestOptions);
	},
	changePasswordRequest : async (email) => {
		const requestOptions = {
			method : "POST",
			body   : JSON.stringify(email),
		};

		return fetcher("/api/auth/recuperar-contraseña", requestOptions);
	},
	changePasswordConfirm : async (body) => {
		const requestOptions = {
			method : "POST",
			body   : JSON.stringify(body),
		};

		return fetcher("/api/auth/change_password", requestOptions);
	},
	getFilteredData : async (url, withToken, type = "admin") => {
		const requestOptions = {
			method  : "GET",
			headers : withToken ? authHeader(type) : {},
		};

		return fetcher(url, requestOptions);
	},
	getState : async (page, params) => {
		const numPage = page || 1;
		const qs      = params || "";

		const requestOptions = {
			method  : "GET",
			headers : {
				"Content-Type" : "application/json",
			},
		};
		return fetcher(`/api/info/states/page/${numPage}?${qs}`, requestOptions);
	},
	getCities : async (page, params) => {
		const numPage = page || 1;
		const qs      = params || "";

		const requestOptions = {
			method  : "GET",
			headers : {
				"Content-Type" : "application/json",
			},
		};
		return fetcher(`/api/info/cities/page/${numPage}?${qs}`, requestOptions);
	},
	getCategories : async (page, params) => {
		const numPage = page || 1;
		const qs      = params || "";

		const requestOptions = {
			method  : "GET",
			headers : {
				"Content-Type" : "application/json",
			},
		};
		return fetcher(`/api/products/categories/page/${numPage}?${qs}`, requestOptions);
	},
	createFeature : async (name) => {
		const requestOptions = {
			method : "POST",
			body   : JSON.stringify({
				name,
			}),
		};

		return fetcher("/api/products/features/create", requestOptions);
	},
	createCategory : async (name) => {
		const requestOptions = {
			method : "POST",
			body   : JSON.stringify({
				name,
			}),
		};

		return fetcher("/api/products/categories/create", requestOptions);
	},
	productManagement : async ({
		user_id,
		name,
		description,
		category_id,
		images,
		image_ids,
		features,
		product_details_id,
		type,
	}, mode) => {
		const requestOptions = {
			method  : mode === "edit" ? "PATCH" : "POST",
			headers : authHeader(type),
			body    : JSON.stringify({
				user_id,
				name,
				description,
				category_id,
				images,
				image_ids,
				features,
				product_details_id,
			}),
		};
		return fetcher(`/api/products/${mode}`, requestOptions);
	},
	aproveProduct : async (id) => {
		const requestOptions = {
			method  : "PATCH",
			headers : authHeader("admin"),
			body    : JSON.stringify({
				id,
			}),
		};
		return fetcher("/api/products/change_history/approve", requestOptions);
	},
	rejectProduct : async (product_details_id) => {
		const requestOptions = {
			method  : "PATCH",
			headers : authHeader("admin"),
			body    : JSON.stringify({
				product_details_id,
			}),
		};
		return fetcher("/api/products/change_history/reject", requestOptions);
	},
	getSubscriptions : async () => {
		const requestOptions = {
			method  : "GET",
			headers : {
				"Content-Type" : "application/json",
			},
		};
		return fetcher("/api/info/subscriptions/page/1", requestOptions);
	},
	userUpdate : async (data, token, type = "customer") => {
		try {
			const requestOptions = {
				method  : "PATCH",
				headers : !token
					? authHeader(type)
					: ({
						Authorization : `Bearer ${token}`,
					}),
				body : JSON.stringify({
					id           : data.user_id,
					email        : data.email || undefined,
					password     : data.password || undefined,
					old_Password : data.old_password || undefined,
					image        : data.image[1] || undefined,
				}),
			};
			const response = await fetch("/api/user/edit", requestOptions);
			if (response?.ok) {
				return {
					body   : await response.json(),
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

export default ApiMethods;
