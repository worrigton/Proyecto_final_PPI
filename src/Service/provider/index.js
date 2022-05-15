/* eslint-disable camelcase */
// Import Own Components
import { authHeader, fetcher } from "~/Util";

const apiUrl = "/api/providers";

const ApiProviderMethods = {
	registry : async (user, storeAddress, provider, intNumber, subscription, intent, coupon) => {
		try {
			const requestOptions = {
				method  : "POST",
				headers : {
					"Content-Type" : "application/json",
				},
				body : JSON.stringify({
					username : user.username,
					password : user.pwd,
					email    : user.email,
					type     : "PROVIDER",
					provider : {
						first_name  : user.firstName,
						last_name   : user.lastName,
						legal_name  : provider.legalName,
						trade_name  : provider.tradeName,
						store_email : provider.storeEmail,
						rfc         : provider.rfc,
						address     : {
							street       : storeAddress.address,
							ext_number   : storeAddress.extNumber,
							city         : storeAddress.city.name,
							neighborhood : storeAddress.neighborhood,
							state        : storeAddress.state.name,
							zip_code     : storeAddress.zipCode,
							country      : "México",
							int_number   : intNumber === "" ? null : intNumber,
							telephone    : storeAddress.telephone,
							references   : null,
						},
						subscription : {
							subscription_id : subscription.id,
							type            : "CARD",
							price           : subscription.price,
							paymentMethod   : intent.payment_method,
							coupon          : coupon,
						},
						regions : [{
							state_id : storeAddress.state.id,
						}],
					},
				}),
			};
			const response = await fetch(`${apiUrl}/payment`, requestOptions);
			if (response?.ok) {
				return {
					body   : "registrado",
					status : true,
				};
			}
			else
				throw response;
		} catch (error) {
			const errorMessage = await error.text();
			return {
				body   : errorMessage,
				status : false,
			};
		}
	},

	userDetails : async (providerId, type = "provider", token) => {
		try {
			const requestOptions = {
				method  : "GET",
				headers : !token
					? authHeader(type)
					: ({
						Authorization : `Bearer ${token}`,
					}),
			};
			const response = await fetch(`${apiUrl}/details/${providerId}`, requestOptions);
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
	userUpdate : async (data, type = "provider", token) => {
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
			const requestOptions2 = {
				method  : "PATCH",
				headers : !token
					? authHeader(type)
					: ({
						Authorization : `Bearer ${token}`,
					}),
				body : JSON.stringify({
					id         : data.id,
					first_name : data.first_name || undefined,
					last_name  : data.last_name || undefined,
				}),
			};
			let response = {
				ok : true,
			};
			if (data.email || data.image || data.password)
				response  = await fetch("/api/users/edit", requestOptions);

			const response2 = await fetch(`${apiUrl}/edit`, requestOptions2);

			if (response?.ok && response2?.ok) {
				return {
					body   : "Usuario correctamente editado",
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

	providerUpdate : async (providerId, data, regions, regionPrevent, type = "provider") => {
		try {
			const arrayRegions = regions.reduce((acc, { id }) => [ ...acc,  { "state_id" : id } ], []);
			const requestOptions = {
				method  : "PATCH",
				headers : authHeader(type),
				body    : JSON.stringify({
					id             : providerId,
					first_name     : data.first_name,
					last_name      : data.last_name,
					legal_name     : data.legal_name,
					trade_name     : data.trade_name,
					store_email    : data.store_email,
					rfc            : data.rfc,
					address        : data.address,
					regions        : regionPrevent ? arrayRegions : undefined,
					titular_acount : data.titular_acount,
					number_acount  : data.number_acount,
					clabe_acount   : data.clabe_acount,
				}),
			};
			const response = await fetch(`${apiUrl}/edit`, requestOptions);
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
	getProviderById : async (id, type = "provider", token)=>{
		try {
			const requestOptions = {
				method  : "GET",
				headers : !token
					? authHeader(type)
					: ({
						Authorization : `Bearer ${token}`,
					}),
			};
			const response = await fetch(`${apiUrl}/details/${id}`, requestOptions);
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
	getProviders : async (page, qs, type = "provider", token) => {
		try {
			const requestOptions = {
				method  : "GET",
				headers : !token
					? authHeader(type)
					: ({
						Authorization : `Bearer ${token}`,
					}),
			};
			const response = await fetch(`${apiUrl}/page/${page}?${qs}`, requestOptions);
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

	getProductDetails : async (providerId, productId, type = "provider", token) => {
		const requestOptions = {
			method  : "GET",
			headers : !token
				? authHeader(type)
				: ({
					Authorization : `Bearer ${token}`,
				}),
		};

		return fetcher(`${apiUrl}/products/${providerId}/details/${productId}`, requestOptions);
	},

	suggestChange : async ({
		name,
		images,
		user_id,
		features,
		image_ids,
		category_id,
		description,
		product_details_id,
	}) => {
		const requestOptions = {
			method  : "PATCH",
			headers : authHeader("provider"),
			body    : JSON.stringify({
				name,
				images,
				user_id,
				features,
				image_ids,
				category_id,
				description,
				product_details_id,
			}),
		};

		return fetcher("/api/products/edit", requestOptions);
	},
	likeProduct : async (product_details_id, user_id, type = "provider", token) => {
		const requestOptions = {
			method  : "POST",
			headers : !token
				? authHeader(type)
				: ({
					Authorization : `Bearer ${token}`,
				}),
			body : JSON.stringify({
				product_details_id,
				user_id,
			}),
		};

		return fetcher("/api/products/like", requestOptions);
	},
	editProductPrice : async (product_id, provider_id, type = "provider", price) => {
		const headers = authHeader(type);
		const requestOptions = {
			method  : "PATCH",
			headers : headers,
			body    : JSON.stringify({
				product_id,
				provider_id,
				price,
			}),
		};
		return fetcher(`/api/providers/products/${provider_id}/edit`, requestOptions);
	},
	dislikeProduct : async (product_details_id, user_id, type = "provider", token) => {
		const requestOptions = {
			method  : "DELETE",
			headers : !token
				? authHeader(type)
				: ({
					Authorization : `Bearer ${token}`,
				}),
			body : JSON.stringify({
				product_details_id,
				user_id,
			}),
		};

		return fetcher("/api/products/dislike", requestOptions);
	},
	configProduct : async ({
		token,
		product_details_id,
		provider_id,
		products,
		volumen_profiles,
	}) => {
		const requestOptions = {
			method  : "POST",
			headers : {
				Authorization : `Bearer ${token}`,
			},
			body : JSON.stringify({
				product_details_id,
				provider_id,
				products,
				volumen_profiles,
			}),
		};

		return fetcher(`/api/providers/products/${provider_id}/config`, requestOptions);
	},
	//ORDERS
	getOrder : async (page, qs, token, type = "provider") => {
		try {
			const requestOptions = {
				method  : "GET",
				headers : !token
					? authHeader(type)
					: ({
						Authorization : `Bearer ${token}`,
					}),
			};
			let response = await fetch(
				`/api/orders/sale_orders/page/${page}?${qs}`,
				requestOptions
			);
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
	activeProduct : async ({
		provider_id,
		product_details_id,
		type = "provider",
		token,
	}) => {
		const requestOptions = {
			method  : "PATCH",
			headers : !token
				? authHeader(type)
				: ({
					Authorization : `Bearer ${token}`,
				}),
			body : JSON.stringify({
				product_details_id,
			}),
		};

		return fetch(`/api/providers/products/${provider_id}/active`, requestOptions);
	},
	//HistoryPayments
	historyPayments : async (page, qs, token) => {
		try {
			const requestOptions = {
				method  : "GET",
				headers : ({
					Authorization : `Bearer ${token}`,
				}),
			};

			const response = await fetch(`${apiUrl}/history_payments/page/${page}?${qs}`,
				requestOptions);

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
	//Subscription
	changeSubscription : async (qs, token) => {
		try {
			const requestOptions = {
				method  : "PATCH",
				headers : ({
					Authorization : `Bearer ${token}`,
				}),
				body : JSON.stringify({
					...qs,
				}),
			};

			const response = await fetch(`${apiUrl}/subscriptions/change_subscription`,
				requestOptions);
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
	addNote : async (providerId, note, type) => {
		try {
			const requestOptions = {
				method  : "PATCH",
				headers : authHeader(type),
				body    : JSON.stringify({
					id   : providerId,
					note : note,
				}),
			};
			const response = await fetch(`${apiUrl}/edit`, requestOptions);
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
	generatePaymentToken : async (coupon) => {
		try {
			const requestOptions = {
				method : "GET",
			};
			let response;
			if (coupon) {
				response = await fetch(`${apiUrl}/payment_token?code=${coupon}`, requestOptions);
			} else {
				response = await fetch(`${apiUrl}/payment_token`, requestOptions);
			}
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
	validateCoupon : async ($id) => {
		try {
			const requestOptions = {
				method : "GET",
			};
			const response = await fetch(`${apiUrl}/validate_coupon/${$id}`, requestOptions);
			if (response?.ok) {
				return {
					body   : await response.json(),
					status : true,
				};
			}
			throw {
				status  : 500,
				label   : "NOT_FOUND",
				message : "Coupon does´nt exist",
			};
		} catch (error) {
			const errorMessage = await error;
			return {
				body   : errorMessage,
				status : false,
			};
		}
	},
};

export default ApiProviderMethods;
