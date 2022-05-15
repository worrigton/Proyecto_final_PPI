import PropTypes from "prop-types";
import { Container } from "@material-ui/core";

// Import Own Components
import HeaderMain from "~/Components/Provider/HeaderMain";
import Footer     from "~/Components/Customer/Footer";
import useStyles from "./styles";

const ProviderLayout = ({ children }) => {
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

ProviderLayout.propTypes = {
	children : PropTypes.oneOfType([PropTypes.array, PropTypes.element, PropTypes.node]),
};

ProviderLayout.defaultProps = {
	children : <></>,
};

export default ProviderLayout;
