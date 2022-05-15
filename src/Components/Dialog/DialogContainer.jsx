import {
	useState,
	useEffect,
	useCallback,
} from "react";
import PropTypes     from "prop-types";
import { connect }   from "react-redux";

// Import Own Components
import { bindAll }   from "~/Util";
import DialogActions from "./store/actions";
import Dialog        from "./Dialog.jsx";

const DialogContainer = ({ dialogActions }) => {
	useEffect(() => () => {
		dialogActions.closeDialog();
	}, [dialogActions]);

	const [actions, setActions] = useState({
		okClick       : null,
		optionalClick : null,
		disabled      : false,
	});

	const disable  = useCallback(value => setActions(prevState => ({ ...prevState, disabled : value })), []);
	const done     = useCallback(() => dialogActions.closeDialog(), [dialogActions]);

	return (
		<Dialog
			delegations={{
				actions,
				setActions,
				disable,
				done,
			}}
		/>
	);
};

DialogContainer.propTypes = {
	dialogActions : PropTypes.object.isRequired,
};

const mapDispatchToProps = bindAll({ DialogActions });

export default connect(null, mapDispatchToProps)(DialogContainer);
