/* eslint-disable no-console */
/* eslint-disable no-empty */
import PropTypes from "prop-types";

// Import own components
import { getBuyOrderDetails } from "~/Server/controllers/orders/buy_orders_controller";
import { getCustomer }        from "~/Server/controllers/customers/customer_controller";
import OrderDetails           from "~/Components/Provider/Orders/Details";

const ProviderOrderDetails = ({ orderData, customer, providerId }) => (
	<OrderDetails {...{ orderData, customer, providerId }} />
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
			orderData  : JSON.parse(JSON.stringify(data)),
			customer   : JSON.parse(JSON.stringify(customer)),
			providerId : query.provider_id,
		},
	};
};

ProviderOrderDetails.propTypes = {
	orderData  : PropTypes.object.isRequired,
	customer   : PropTypes.object.isRequired,
	providerId : PropTypes.number.isRequired,
};

export default ProviderOrderDetails;
