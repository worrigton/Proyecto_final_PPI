/* eslint-disable camelcase */
import { reverseCompose as c } from "~/Util";
import { getPage }             from "~/Server/controllers/customers/customer_controller";
import AdminLayout             from "~/Components/Admin/AdminLayout";
import AdminPageTitle          from "~/Components/Admin/AdminPageTitle";
import ClientsTable            from "~/Components/Admin/ClientsTable";

const Clients = (props) => (
	<AdminLayout>
		<AdminPageTitle title="Clientes" />

		<ClientsTable {...props} />
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

export default Clients;
