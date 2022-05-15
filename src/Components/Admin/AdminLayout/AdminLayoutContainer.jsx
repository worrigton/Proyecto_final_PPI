import { useEffect } from "react";
import { useRouter } from "next/router";
import PropTypes     from "prop-types";
import { connect }   from "react-redux";

// Import Own Components
import AdminLayout from "./AdminLayout.jsx";

const AdminLayoutContainer = ({ loggedIn, stateLoaded, ...rest }) => {
	const router = useRouter();

	useEffect(() => {
		if (stateLoaded && !loggedIn) {
			router.push("/admin/login");
		}
	}, [loggedIn, router, stateLoaded]);

	return <AdminLayout {...rest} />;
};

AdminLayoutContainer.propTypes = {
	loggedIn    : PropTypes.bool,
	stateLoaded : PropTypes.bool,
};

AdminLayoutContainer.defaultProps = {
	loggedIn    : false,
	stateLoaded : false,
};

const mapStateToProps = ({ stateLoaded, userReducer : { admin } }) => ({ stateLoaded, loggedIn : Boolean(admin) });

export default connect(mapStateToProps, null)(AdminLayoutContainer);
