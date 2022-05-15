import PropTypes   from "prop-types";
import { connect } from "react-redux";

// Import Own Components
import Registry from "./Registry.jsx";

const RegistryContainer = ({ loggedIn, stateLoaded, ...rest }) => <Registry {...rest} />;

RegistryContainer.propTypes = {
	loggedIn    : PropTypes.bool,
	stateLoaded : PropTypes.bool,
};

RegistryContainer.defaultProps = {
	loggedIn    : false,
	stateLoaded : false,
};

const mapStateToProps = ({ stateLoaded, provider }) => ({ stateLoaded, loggedIn : Boolean(provider) });

export default connect(mapStateToProps, null)(RegistryContainer);
