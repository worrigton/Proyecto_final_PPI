/* eslint-disable no-console */
/* eslint-disable no-empty */
import PropTypes from "prop-types";

// Import own components
import { getBuyOrderDetails } from "~/Server/controllers/orders/buy_orders_controller";
import { getCustomer }        from "~/Server/controllers/customers/customer_controller";
import OrderDetails           from "~/Components/Admin/Orders/Details";

const ProviderOrderDetails = ({ data, customer }) => (
	<OrderDetails {...{ orderData : data, customer }} />
);

export const getServerSideProps = async ({ query }) => {
	let data = [];
	let customer = [];
	try {
		data = await getBuyOrderDetails(query.id, query.provider_id);
		customer = await getCustomer(data.customer.id);
	} catch (error) {
		console.log(error);
	}

	return {
		props : {
			data     : JSON.parse(JSON.stringify(data)),
			customer : JSON.parse(JSON.stringify(customer)),
		},
	};
};

ProviderOrderDetails.propTypes = {
	data     : PropTypes.object.isRequired,
	customer : PropTypes.object.isRequired,
};

export default ProviderOrderDetails;
