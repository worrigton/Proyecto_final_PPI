/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import PropTypes     from "prop-types";
import { connect }   from "react-redux";

// Import Own Components
import DialogActions   from "~/Components/Dialog/store/actions";
import { bindAll }     from "~/Util";
import PendingRevision from "./PendingRevision.jsx";

const PendingRevisionContainer = ({ dialogActions }) => {
	useEffect(() => {
		dialogActions.closeDialog();
	}, []);

	return (
		<PendingRevision />
	);
};

PendingRevisionContainer.propTypes = {
	dialogActions : PropTypes.object.isRequired,
};

const mapDispatchToProps = bindAll({ DialogActions });

export default connect(null, mapDispatchToProps)(PendingRevisionContainer);
