/* eslint-disable camelcase */

import { authHeader, fetcher } from "~/Util";

const apiUrl = "/api/customers";

const ApiCustomerMethods = {
	registry : async (user, billinProfile, address, intNumber) => {
		try {
			const requestOptions = {
				method  : "POST",
				headers : {
					"Content-Type" : "application/json",
				},
				body : JSON.stringify({
					type     : "CUSTOMER",
					username : user.username,
					password : user.pwd,
					email    : user.email,
					customer : {
						taxpayer_type   : billinProfile.taxRegimen || undefined,
						legal_name      : billinProfile.legalName || undefined,
						first_name      : user.firstName,
						last_name       : user.lastName,
						billing_profile : {
							name       : billinProfile.name,
							tax_regime : billinProfile.taxRegimen.id,
							rfc        : billinProfile.rfc,
							address    : {
								street       : address.address,
								ext_number   : address.extNumber,
								city         : address.city.name,
								neighborhood : address.neighborhood,
								state        : address.state.name,
								zip_code     : address.zipCode,
								country      : "México",
								int_number   : intNumber === "" ? null : intNumber,
								telephone    : address.telephone,
								references   : null,
								email        : billinProfile.email,
								flags        : "PREDETERMINED",
							},
						},
						customer_emails : {
							1 : "ACTIVE",
							2 : "ACTIVE",
							3 : "ACTIVE",
							4 : "ACTIVE",
							5 : "ACTIVE",
							6 : "ACTIVE",
						},
					},
				}),
			};
			const response = await fetch(`${apiUrl}/create`, requestOptions);
			if (response?.ok) {
				return {
					body   : "registrado",
					status : true,
				};
			}
			else
				throw response;
		} catch (error) {
			const errorMessage = await error.text() || "other";
			return {
				body   : errorMessage,
				status : false,
			};
		}
	},
	userDetails : async (customer_id, type = "customer", token) => {
		try {
			const requestOptions = {
				method  : "GET",
				headers : !token
					? authHeader(type)
					: ({
						Authorization : `Bearer ${token}`,
					}),
			};
			const response = await fetch(`${apiUrl}/details/${customer_id}`, requestOptions);
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
					id    : data.user_id,
					email : data.email || undefined,
					image : data.image[1] || undefined,
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
					last_name  : data.last_name  || undefined,
					telephone  : data.telephone  || undefined,
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
	userUpdatePassword : async (data, token, type = "customer") => {
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
					password     : data.password || undefined,
					old_password : data.old_password || undefined,
				}),
			};
			let response = {
				ok : true,
			};
			if (data.password)
				response  = await fetch("/api/users/edit", requestOptions);

			if (response?.ok) {
				return {
					body   : "Usuario correctamente editado",
					status : true,
				};
			}
			else {
				throw response;
			}
		} catch (error) {
			const errorMessage = await error.text();
			return {
				body   : errorMessage,
				status : false,
			};
		}
	},
	getCustomers : async (page, qs, type = "customer") => {
		try {
			const requestOptions = {
				method  : "GET",
				headers : authHeader(type),
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
	//CUSTOMER ADDRESS
	getCustomerAddress : async (page, qs, type = "customer", token) => {
		try {
			const requestOptions = {
				method  : "GET",
				headers : !token
					? authHeader(type)
					: ({
						Authorization : `Bearer ${token}`,
					}),
			};
			const response = await fetch(`${apiUrl}/addresses/page/${page}?${qs}`, requestOptions);
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
	createCustomerAddress : async (address, intNumber, id, type = "customer") => {
		try {
			const requestOptions = {
				method  : "POST",
				headers : authHeader(type),
				body    : JSON.stringify({
					customer_id : id,
					label       : address.label,
					flags       : address.checked ? "PREDETERMINED" : null,
					address     : {
						street       : address.address,
						ext_number   : address.extNumber,
						city         : address.city.name,
						neighborhood : address.neighborhood,
						state        : address.state.name,
						zip_code     : address.zipCode,
						country      : "México",
						int_number   : intNumber === "" ? null : intNumber,
						telephone    : address.telephone,
						references   : null,
					},
				}),
			};
			const response = await fetch(`${apiUrl}/addresses/create`, requestOptions);
			if (response?.ok) {
				return {
					body   : "Perfil de facturación agregado",
					status : true,
				};
			}
			else
				throw response;
		} catch (error) {
			const errorMessage = await error.text() || "other";
			return {
				body   : errorMessage,
				status : false,
			};
		}
	},
	updateAddress : async (address, type = "customer") => {
		try {
			const requestOptions = {
				method  : "PATCH",
				headers : authHeader(type),
				body    : JSON.stringify({
					...address,
				}),
			};
			const response = await fetch(`${apiUrl}/addresses/edit`, requestOptions);
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
	detailsCustomerAddress : async (address_id, type = "customer") => {
		try {
			const requestOptions = {
				method  : "GET",
				headers : authHeader(type),
			};
			const response = await fetch(`${apiUrl}/addresses/details/${address_id}`, requestOptions);
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
	//BILLING PROFILES
	getBillingProfiles : async (page, qs, token, type = "customer") => {
		try {
			const requestOptions = {
				method  : "GET",
				headers : !token
					? authHeader(type)
					: ({
						Authorization : `Bearer ${token}`,
					}),
			};
			const response = await fetch(`${apiUrl}/billing_profiles/page/${page}?${qs}`, requestOptions);
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
	createBillingProfiles : async (billinProfile, intNumber, id) => {
		try {
			const requestOptions = {
				method  : "POST",
				headers : authHeader("customer"),
				body    : JSON.stringify({
					customer_id : id,
					name        : billinProfile.label,
					tax_regime  : billinProfile.taxRegimen.id,
					rfc         : billinProfile.rfc,
					email       : billinProfile.email,
					flags       : billinProfile.checked ? "PREDETERMINED" : null,
					address     : {
						street       : billinProfile.address,
						ext_number   : billinProfile.extNumber,
						city         : billinProfile.city.name,
						neighborhood : billinProfile.neighborhood,
						state        : billinProfile.state.name,
						zip_code     : billinProfile.zipCode,
						country      : "México",
						int_number   : intNumber === "" ? null : intNumber,
						telephone    : billinProfile.telephone,
						references   : null,
					},
				}),
			};
			const response = await fetch(`${apiUrl}/billing_profiles/create`, requestOptions);
			if (response?.ok) {
				return {
					body   : "Perfil de facturación agregado",
					status : true,
				};
			}
			else
				throw response;
		} catch (error) {
			const errorMessage = await error.text() || "other";
			return {
				body   : errorMessage,
				status : false,
			};
		}
	},
	updateBillingProfiles : async (billinProfile) => {
		try {
			const requestOptions = {
				method  : "PATCH",
				headers : authHeader("customer"),
				body    : JSON.stringify({
					...billinProfile,
				}),
			};
			const response = await fetch(`${apiUrl}/billing_profiles/edit`, requestOptions);
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
	detailsBillingProfiles : async (customer_id, billing_id) => {
		try {
			const requestOptions = {
				method  : "GET",
				headers : authHeader("customer"),
			};
			const response = await fetch(`${apiUrl}/billing_profiles/details/${customer_id}`, requestOptions);
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
	//PRODUCTS
	topProducts : async (page, qs) => {
		try {
			const requestOptions = {
				method  : "GET",
				headers : authHeader("customer"),
			};

			let response = await fetch(`/api/products/page/${page}?${qs}`, requestOptions);
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
	likeProduct : async (page, qs) => {
		try {
			const requestOptions = {
				method  : "GET",
				headers : authHeader("customer"),
			};

			let response = await fetch(`/api/products/page/${page}?${qs}`, requestOptions);
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
	placeOrder : async (order) => {
		try {
			const requestOptions = {
				method  : "POST",
				headers : authHeader("customer"),
				body    : JSON.stringify({
					...order,
				}),
			};
			let response = await fetch("/api/orders/place", requestOptions);
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
	getOrderDetails : async (id) => {
		try {
			const requestOptions = {
				method  : "GET",
				headers : authHeader("customer"),
			};
			let response = await fetch(`/api/orders/details/${id}`, requestOptions);
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
	getOrder : async (page, qs, token, type = "customer") => {
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
					status : response.ok,
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
	//EMAILS
	getEmails : async (customer, token) => {
		try {
			const requestOptions = {
				method  : "GET",
				headers : ({
					Authorization : `Bearer ${token}`,
				}),
			};

			const response = await fetch(`${apiUrl}/emails/${customer}`, requestOptions);

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
	updateEmails : async (customer_id, configuration, token) => {
		try {
			const requestOptions = {
				method  : "PATCH",
				headers : ({
					Authorization : `Bearer ${token}`,
				}),
				body : JSON.stringify({
					customer_id,
					customer_emails : {
						...configuration,
					},
				}),
			};
			const response = await fetch(`${apiUrl}/emails/edit`, requestOptions);

			if (response?.ok) {
				return {
					body   : "se edito correctamente",
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
	qualify : async (assessed_user_id, user_id, rating, type) => {
		const apiUrl = "/api/users";
		try {
			const requestOptions = {
				method  : "POST",
				headers : authHeader(type),
				body    : JSON.stringify({
					user_id,
					rating,
					assessed_user_id,
				}),
			};
			const response = await fetch(`${apiUrl}/rate`, requestOptions);
			if (response?.ok) {
				return {
					body   : "Se ha calificado correctamente",
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
	delete : async (id, type = "admin") => {
		const apiUrl = "/api/users";
		try {
			const requestOptions = {
				method  : "DELETE",
				headers : authHeader(type),
				body    : JSON.stringify({
					id,
				}),
			};
			const response = await fetch(`${apiUrl}/delete`, requestOptions);
			if (response?.ok) {
				return {
					body   : "Se ha eliminado correctamente",
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
	getProductDetails : async (customerId, productId, type = "customer", token) => {
		const requestOptions = {
			method  : "GET",
			headers : !token
				? authHeader(type)
				: ({
					Authorization : `Bearer ${token}`,
				}),
		};

		return fetcher(`${apiUrl}/products/${customerId}/details/${productId}`, requestOptions);
	},
};

export default ApiCustomerMethods;
