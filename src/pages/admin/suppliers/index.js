/* eslint-disable camelcase */
import { getPage }             from "~/Server/controllers/providers/provider_controller";
import { reverseCompose as c } from "~/Util";
import AdminLayout             from "~/Components/Admin/AdminLayout";
import AdminPageTitle          from "~/Components/Admin/AdminPageTitle";
import SupliersTable           from "~/Components/Admin/SupliersTable";

const Suppliers = (props) => (
	<AdminLayout>
		<AdminPageTitle title="Proveedores" />

		<SupliersTable {...props} />
	</AdminLayout>
);

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


export default Suppliers;
