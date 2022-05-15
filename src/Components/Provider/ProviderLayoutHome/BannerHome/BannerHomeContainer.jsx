import {
	useState,
	useCallback,
} from "react";
import PropTypes     from "prop-types";
import { connect }   from "react-redux";
import { useRouter } from "next/router";

// Import own Components
import { bindAll } from "~/Util";
import UserActions from "~/Store/UserStore/actions";
import BannerHome  from "./BannerHome.jsx";

const BannerHomeContainer = ({ userActions, loggedIn }) => {
	const router = useRouter();
	// Handle toggling the user menu
	const [anchorEl, setAnchorEl] = useState(null);
	const [login, setLogin]       = useState(false);

	const handleOpen  = useCallback(({ currentTarget }) => setAnchorEl(currentTarget), []);
	const handleClose = useCallback(() => setAnchorEl(null), []);

	const toRouter = useCallback(url =>() => {
		router.push(url);
		setAnchorEl(null);
	}, [router]);

	const logOut = useCallback(() => {
		userActions.logoutUserOfType("provider");
		router.push("/proveedor");
	}, [router, userActions]);

	return (
		<BannerHome
			delegations={{
				anchorEl,
				login,
				setLogin,
				handleOpen,
				handleClose,
				logOut,
				toRouter,
			}}
			loggedIn={loggedIn}
		/>
	);
};

BannerHomeContainer.propTypes = {
	userActions : PropTypes.object.isRequired,
	loggedIn    : PropTypes.bool,
};

const mapDispatchToProps = bindAll({ UserActions });

export default connect(null, mapDispatchToProps)(BannerHomeContainer);
