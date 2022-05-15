/* eslint-disable camelcase */
import { authHeader } from "~/Util";
const apiUrl = "/api/employees";

const EmployeeMethods = {
	registry : async (user) => {
		try {
			const requestOptions = {
				method  : "POST",
				headers : authHeader("admin"),
				body    : JSON.stringify({
					username : user.username,
					password : user.password,
					email    : user.email,
					type     : "EMPLOYEE",
					image    : user.image[1],
					employee : {
						first_name : user.first_name,
						last_name  : user.last_name,
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
	userDetails : async (employeeId) => {
		try {
			const requestOptions = {
				method  : "GET",
				headers : {
					"Content-Type" : "application/json",
				},
			};
			const response = await fetch(`${apiUrl}/details/${employeeId}`, requestOptions);
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
	userUpdate : async (data) => {
		try {
			const requestOptions = {
				method  : "PATCH",
				headers : authHeader("admin"),
				body    : JSON.stringify({
					id       : data.user_id,
					email    : data.email || undefined,
					password : data.password || undefined,
					username : data.username || undefined,
					image    : data.image[1] || undefined,
				}),
			};
			const requestOptions2 = {
				method  : "PATCH",
				headers : authHeader("admin"),
				body    : JSON.stringify({
					id         : data.id,
					first_name : data.first_name || undefined,
					last_name  : data.last_name || undefined,
				}),
			};
			let response = {
				ok : true,
			};
			if (data.email || data.image || data.password || data.image )
				response  = await fetch("/api/users/edit", requestOptions);

			const response2 = await fetch("/api/employees/edit", requestOptions2);

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
	addProvider : async (employee_id, provider_id) => {
		try {
			const requestOptions = {
				method  : "POST",
				headers : authHeader("admin"),
				body    : JSON.stringify({
					provider_id,
					employee_id,
				}),
			};
			const response = await fetch(`${apiUrl}/providers/link`, requestOptions);
			if (response?.ok) {
				return {
					body   : "agregado",
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
	deleteProvider : async (employee_id, provider_id) => {
		try {
			const requestOptions = {
				method  : "DELETE",
				headers : authHeader("admin"),
				body    : JSON.stringify({
					provider_id,
					employee_id,
				}),
			};
			const response = await fetch(`${apiUrl}/providers/unlink`, requestOptions);
			if (response?.ok) {
				return {
					body   : "agregado",
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
};

export default EmployeeMethods;
