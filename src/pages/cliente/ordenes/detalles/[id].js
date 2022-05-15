/* eslint-disable no-console */
import PropTypes from "prop-types";

// Import own components
import { getBuyOrderDetails } from "~/Server/controllers/orders/buy_orders_controller";
import { getProvider }        from "~/Server/controllers/providers/provider_controller";
import OrderDetails           from "~/Components/Customer/Orders/Details";

const CustomerOrderDetails = ({ data, provider }) => (
	<OrderDetails {...{ data, provider }} />
);

export const getServerSideProps = async ({ query }) => {
	let data = [];
	let provider = [];
	try {
		data         = await getBuyOrderDetails(query.id, query.provider_id);
		provider     = await getProvider(query.provider_id);
	} catch (error) {
		console.log(error);
	}

	return {
		props : {
			data     : JSON.parse(JSON.stringify(data)),
			provider : JSON.parse(JSON.stringify(provider)),
		},
	};
};

CustomerOrderDetails.propTypes = {
	data     : PropTypes.object.isRequired,
	provider : PropTypes.object.isRequired,
};

export default CustomerOrderDetails;
