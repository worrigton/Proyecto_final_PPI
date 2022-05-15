/* eslint-disable no-console */
/* eslint-disable camelcase */
import { authHeader } from "~/Util";

const apiUrl = "/api/orders";

const saleOrderMethods = {
	updateStatus : async (id, action, provider_id) => {
		try {
			const requestOptions = {
				method  : "PATCH",
				headers : authHeader("provider"),
				body    : JSON.stringify({
					id,
					provider_id,
					action,
				}),
			};
			return fetch(`${apiUrl}/sale_orders/change_status`, requestOptions);
		} catch (error) {
			console.log(error);
		}
	},
	updateStatusNotification : async (saleOrderId, provider_id, token) => {
		try {
			const requestOptions = {
				method  : "PATCH",
				headers : ({
					Authorization : `Bearer ${token}`,
				}),
				body : JSON.stringify({
					id     : saleOrderId,
					action : "NOTIFICATION",
					provider_id,
				}),
			};
			return fetch(`${apiUrl}/sale_orders/change_status`, requestOptions);
		} catch (error) {
			console.log(error);
		}
	},
	getSaleOrder : async (id, providerId) => {
		try	{
			const requestOptions = {
				method  : "GET",
				headers : authHeader("provider"),
			};
			return fetch(`${apiUrl}/details/${id}?provider_id=${providerId}`, requestOptions);
		} catch (error) {
			console.log(error);
		}
	},
	updloadFileToSaleOrder : async (fileData) => {
		let tokenType;
		switch (fileData.file_type) {
			case "BILL":
				tokenType = "provider";
				break;
			case "PAY_ORDER":
				tokenType = "admin";
				break;
			case "VOUCHER":
				tokenType = "customer";
				break;
			default:
				break;
		}
		try {
			const requestOptions = {
				method  : "POST",
				headers : authHeader(tokenType),
				body    : JSON.stringify(fileData),
			};
			return fetch(`${apiUrl}/sale_orders/upload_file`, requestOptions);
		} catch (error) {
			console.log(error);
		}
	},
	cancelSaleOrder : async (id, action, note, provider_id) => {
		try {
			const requestOptions = {
				method  : "PATCH",
				headers : authHeader("customer"),
				body    : JSON.stringify({
					id,
					note,
					action,
					provider_id,
				}),
			};
			return fetch(`${apiUrl}/sale_orders/change_status`, requestOptions);
		} catch (error) {
			console.log(error);
		}
	},
};

export default saleOrderMethods;
