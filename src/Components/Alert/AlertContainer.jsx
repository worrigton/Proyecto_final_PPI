/* eslint-disable react-hooks/exhaustive-deps */
import {
	useState,
	useEffect,
	useCallback,
	useRef,
} from "react";
import PropTypes from "prop-types";

// Import Own Components
import { bindAll }     from "~/Util";
import withStateLoaded from "~/Store/withStateLoaded";
import AlertActions    from "./store/actions";
import Alert           from "./Alert.jsx";

const AlertContainer = ({ incomingAlert, alertActions }) => {
	const queue = useRef([]);

	const [open, setOpen]                 = useState(false);
	const [currentAlert, setCurrentAlert] = useState();

	const processQueue = useCallback(() => {
		if (queue.current.length > 0) {
			setOpen(true);
			setCurrentAlert(queue.current.shift());
		} else {
			alertActions.clearAlert();
		}
	}, []);

	useEffect(() => {
		if (incomingAlert) {
			queue.current.push({
				...incomingAlert,
				key : new Date().getTime(),
			});

			if (!open) {
				processQueue();
			}
		}
	}, [incomingAlert]);

	const handleClose = useCallback((evnt, reason) => {
		if (reason === "clickaway") return;

		setOpen(false);
	}, []);

	return (
		<Alert
			open={open}
			handleClose={handleClose}
			handleExited={processQueue}
			currentAlert={currentAlert}
		/>
	);
};

const mapStatetoProps    = ({ alertReducer : { incomingAlert } }) => ({ incomingAlert });
const mapDispatchToProps = bindAll({ AlertActions });

AlertContainer.propTypes = {
	incomingAlert : PropTypes.shape({
		open       : PropTypes.bool,
		message    : PropTypes.string,
		duration   : PropTypes.number,
		transition : PropTypes.string,
		type       : PropTypes.oneOf(["success", "error", "warning", "info"]),
	}),
	alertActions : PropTypes.object.isRequired,
};

AlertContainer.defaultProps = {
	incomingAlert : null,
};

export default withStateLoaded(mapStatetoProps, mapDispatchToProps)(AlertContainer);
