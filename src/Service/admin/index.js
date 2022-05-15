/* eslint-disable camelcase */
import {
	fetcher,
	authHeader,
	userId,
} from "~/Util";

const AdminMethods = {
	getPendingApprovals : async () => {
		const requestOptions = {
			method  : "GET",
			headers : authHeader("admin"),
		};

		return fetcher("/api/products/change_history/approvals", requestOptions);
	},
	getProducts : async () => {
		const requestOptions = {
			method  : "GET",
			headers : authHeader("admin"),
		};

		return fetcher(`/api/users/${userId()}/products`, requestOptions);
	},
	getProductData : async ({ token, id }) => {
		const requestOptions = {
			method  : "GET",
			headers : {
				Authorization : `Bearer ${token}`,
			},
		};

		return fetcher(`/api/products/change_history/details/${id}`, requestOptions);
	},
};

export default AdminMethods;
