import PropTypes from "prop-types";

// Import Own Components
import { PrivateRoute } from "~/Util";

const PrivateEmployeeRoute = ({ children }) => (
	<PrivateRoute redirectTo="/employee/login" type="employee">
		{children}
	</PrivateRoute>
);

PrivateEmployeeRoute.propTypes = {
	children : PropTypes.node.isRequired,
};

export default PrivateEmployeeRoute;
