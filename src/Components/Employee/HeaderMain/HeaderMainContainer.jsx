import {
	useState,
	useCallback,
} from "react";
import PropTypes     from "prop-types";
import { useRouter } from "next/router";
import { connect }   from "react-redux";

// Import own Components
import UserActions       from "~/Store/UserStore/actions";
import { bindAll }       from "~/Util";
import useEmployeeRoutes from "~/Components/Employee/useEmployeeRoutes";
import HeaderMain        from "./HeaderMain.jsx";

const HeaderContainer = ({ userActions }) => {
	// Handle toggling the user menu
	const [anchorEl, setAnchorEl] = useState(null);

	const handleOpen  = useCallback(({ currentTarget }) => setAnchorEl(currentTarget), []);
	const handleClose = useCallback(() => setAnchorEl(null), []);

	// Handle Routes
	const router = useRouter();
	const routes = useEmployeeRoutes();

	const toEmployeeHome = useCallback(() => router.push("/employee"), [router]);

	const logOut = useCallback(() => {
		userActions.logoutUserOfType("employee");
	}, [userActions]);

	return (
		<HeaderMain
			delegations={{
				anchorEl,
				routes,
				handleOpen,
				handleClose,
				toEmployeeHome,
				logOut,
			}}
		/>
	);
};

HeaderContainer.propTypes = {
	userActions : PropTypes.object.isRequired,
};

const mapDispatchToProps = bindAll({ UserActions });

export default connect(null, mapDispatchToProps)(HeaderContainer);
