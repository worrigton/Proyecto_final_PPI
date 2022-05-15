import PropTypes from "prop-types";

// Import Own Components
import { PrivateRoute } from "~/Util";

const PrivateCustomerRoute = ({ children }) => (
	<PrivateRoute redirectTo="/" type="customer">
		{children}
	</PrivateRoute>
);

PrivateCustomerRoute.propTypes = {
	children : PropTypes.node.isRequired,
};

export default PrivateCustomerRoute;
