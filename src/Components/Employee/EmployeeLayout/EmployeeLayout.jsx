import PropTypes      from "prop-types";

// Import Own Components
import HeaderMain           from "~/Components/Employee/HeaderMain";
import Footer               from "~/Components/Customer/Footer";
import PrivateEmployeeRoute from "~/Components/Employee/PrivateEmployeeRoute";
import useStyles            from "./styles";

const EmployeeLayout = ({ children }) => {
	const classes = useStyles();
	return (
		<PrivateEmployeeRoute>
			<HeaderMain />
			<div className = {classes.container}>
				{ children }
			</div>
			<Footer />
		</PrivateEmployeeRoute>
	);
};

EmployeeLayout.propTypes = {
	children : PropTypes.oneOfType([PropTypes.array, PropTypes.element, PropTypes.node]),
};

EmployeeLayout.defaultProps = {
	children : <></>,
};

export default EmployeeLayout;
