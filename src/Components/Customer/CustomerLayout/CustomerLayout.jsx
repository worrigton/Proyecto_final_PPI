import PropTypes from "prop-types";

// Import Own Components
import HeaderMain from "~/Components/Customer/HeaderMain";
import Footer     from "~/Components/Customer/Footer";
import { Container } from "@material-ui/core";

import useStyles from "./styles";

const ConfigurationPage = ({ children }) => {
	const classes = useStyles();
	return (
		<>
			<HeaderMain />
			<Container className={classes.mainContainer} maxWidth="lg">
				{ children }
			</Container>
			<Footer />
		</>
	);
};

ConfigurationPage.propTypes = {
	children : PropTypes.oneOfType([PropTypes.array, PropTypes.element, PropTypes.node]),
};

ConfigurationPage.defaultProps = {
	children : <></>,
};

export default ConfigurationPage;
