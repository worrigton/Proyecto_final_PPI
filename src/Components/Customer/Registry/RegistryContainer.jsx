import { useEffect } from "react";
import { useRouter } from "next/router";
import PropTypes     from "prop-types";
import { connect }   from "react-redux";

// Import Own Components
import Registry from "./Registry.jsx";

const RegistryContainer = ({ loggedIn, stateLoaded, ...rest }) => {
	const router = useRouter();

	useEffect(() => {
		if (loggedIn) {
			router.push("/cliente/inicio");
		}
	}, [loggedIn, router, stateLoaded]);

	return <Registry {...rest} />;
};

RegistryContainer.propTypes = {
	loggedIn    : PropTypes.bool,
	stateLoaded : PropTypes.bool,
};

RegistryContainer.defaultProps = {
	loggedIn    : false,
	stateLoaded : false,
};

const mapStateToProps = ({ stateLoaded, userReducer : { customer } }) => ({
	stateLoaded,
	loggedIn : Boolean(customer),
});

export default connect(mapStateToProps, null)(RegistryContainer);
