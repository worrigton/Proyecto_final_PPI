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
import Header      from "./Header.jsx";

const HeaderContainer = ({ userActions }) => {
	// Handle toggling the user menu
	const router = useRouter();
	const [anchorEl, setAnchorEl] = useState(null);

	const handleOpen  = useCallback(({ currentTarget }) => setAnchorEl(currentTarget), []);
	const handleClose = useCallback(() => setAnchorEl(null), []);

	const toRouter = useCallback(url =>() => {
		router.push(url);
		setAnchorEl(null);
	}, [router]);

	return (
		<Header
			delegations={{
				anchorEl,
				handleOpen,
				handleClose,
				// logOut,
				toRouter,
			}}
		/>
	);
};

HeaderContainer.propTypes = {
	userActions : PropTypes.object.isRequired,
};

const mapDispatchToProps = bindAll({ UserActions });

export default connect(null, mapDispatchToProps)(HeaderContainer);
