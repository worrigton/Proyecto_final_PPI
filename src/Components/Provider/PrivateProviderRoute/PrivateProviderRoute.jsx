import PropTypes from "prop-types";

// Import Own Components
import { PrivateRoute } from "~/Util";

const PrivateProviderRoute = ({ children }) => (
	<PrivateRoute redirectTo="/proveedor" type="provider">
		{children}
	</PrivateRoute>
);

PrivateProviderRoute.propTypes = {
	children : PropTypes.node.isRequired,
};

export default PrivateProviderRoute;
