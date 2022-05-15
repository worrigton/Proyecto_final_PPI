import {
	useState,
	useCallback,
} from "react";
import PropTypes     from "prop-types";
import { useRouter } from "next/router";
import { connect }   from "react-redux";

// Import own Components
import UserActions    from "~/Store/UserStore/actions";
import { bindAll }    from "~/Util";
import useAdminRoutes from "~/Components/Admin/useAdminRoutes";
import Header         from "./Header.jsx";

const HeaderContainer = ({ userActions }) => {
	// Handle toggling the user menu
	const [anchorEl, setAnchorEl] = useState(null);

	const handleOpen  = useCallback(({ currentTarget }) => setAnchorEl(currentTarget), []);
	const handleClose = useCallback(() => setAnchorEl(null), []);

	// Handle Routes
	const router = useRouter();
	const routes = useAdminRoutes();

	const toAdminHome = useCallback(() => router.push("/admin"), [router]);
	const logOut      = useCallback(() => {
		userActions.logoutUserOfType("admin");
	}, [userActions]);

	return (
		<Header
			delegations={{
				anchorEl,
				handleOpen,
				handleClose,
				routes,
				toAdminHome,
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
