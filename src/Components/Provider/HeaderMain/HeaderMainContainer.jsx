import {
	useState,
	useCallback,
} from "react";
import PropTypes     from "prop-types";
import { useRouter } from "next/router";
import { connect }   from "react-redux";
import { Hidden }    from "@material-ui/core";

// Import own Components
import UserActions       from "~/Store/UserStore/actions";
import { bindAll }       from "~/Util";
import useProviderRoutes from "~/Components/Provider/useProviderRoutes";
import HeaderMain        from "./HeaderMain.jsx";
import HeaderMainMobile  from "./HeaderMainMobile.jsx";

const HeaderMainContainer = ({ userActions }) => {
	// Handle toggling the user menu
	const [anchorEl, setAnchorEl]       = useState(null);
	const [anchorElCtg, setAnchorElCtg] = useState(null);
	const [anchorElLct, setAnchorElLct] = useState(null);
	const [drawer, setDrawer]           = useState(false);

	const handleOpen     = useCallback(({ currentTarget }) => setAnchorEl(currentTarget), []);
	const handleClose    = useCallback(() => setAnchorEl(null), []);
	const handleOpenCtg  = useCallback(({ currentTarget }) => setAnchorElCtg(currentTarget), []);
	const handleCloseCtg = useCallback(() => setAnchorElCtg(null), []);
	const handleOpenLct  = useCallback(({ currentTarget }) => setAnchorElLct(currentTarget), []);
	const handleCloseLct = useCallback(() => setAnchorElLct(null), []);

	const toggleDrawer = useCallback(open => (event) => {
		if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
			return;
		  }
		  setDrawer(open);
	}, []);

	// Handle Routes
	const router = useRouter();
	const routes = useProviderRoutes();

	const toProviderHome = useCallback(() => router.push("/proveedor/inicio"), [router]);
	const logOut         = useCallback(() => userActions.logoutUserOfType("provider"), [userActions]);

	return (
		<>
			<Hidden smDown>
				<HeaderMain
					delegations={{
						routes,
						handleOpen,
						handleClose,
						handleOpenCtg,
						handleCloseCtg,
						handleOpenLct,
						handleCloseLct,
						toProviderHome,
						logOut,
						anchorEl,
						anchorElCtg,
						anchorElLct,
					}}
				/>

			</Hidden>
			<Hidden mdUp>
				<HeaderMainMobile
					delegations={{
						routes,
						handleClose,
						toggleDrawer,
						toProviderHome,
						logOut,
						drawer,
					}}
				/>

			</Hidden>
		</>

	);
};

HeaderMainContainer.propTypes = {
	userActions : PropTypes.object.isRequired,
};

const mapDispatchToProps = bindAll({ UserActions });

export default connect(null, mapDispatchToProps)(HeaderMainContainer);
