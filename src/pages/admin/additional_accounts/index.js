/* eslint-disable camelcase */
import { reverseCompose as c } from "~/Util";
import { getPage }             from "~/Server/controllers/users/employee_controller";

export const getServerSideProps = async ({ query }) => {
	const { search_query } = query;

	if (search_query) {
		query["filter"] = search_query;
	}

	try {
		const data = await getPage(query);

		if ( !("pagination" in data && "collection" in data) ) {
			throw "Invalid server response";
		}

		return {
			props : {
				...c(data, JSON.stringify, JSON.parse),
			},
		};
	} catch (err) {
		return {
			props : {},
		};
	}
};

export { default } from "~/Components/Admin/AdditionalAccounts";
