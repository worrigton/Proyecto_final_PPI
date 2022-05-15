import PropTypes             from "prop-types";
import { Snackbar }          from "@material-ui/core";
import { Alert as MuiAlert } from "@material-ui/lab";

// Import Own Components
import useStyles from "./styles";

const Alert = ({
	open,
	handleClose,
	handleExited,
	currentAlert,
}) => {
	const classes = useStyles();

	return (
		<div>
			{ currentAlert && (
				<Snackbar
					key={currentAlert.key}
					anchorOrigin={{
						vertical   : "bottom",
						horizontal : "right",
					}}
					open={open}
					autoHideDuration={currentAlert.duration}
					onClose={handleClose}
					onExited={handleExited}
					ContentProps={{
						"aria-describedby" : "message-id",
					}}
					className={classes.bringToFront}
				>
					<MuiAlert
						elevation={6}
						variant="filled"
						onClose={handleClose}
						severity={currentAlert.type}
					>
						{ currentAlert.message }
					</MuiAlert>
				</Snackbar>
			) }
		</div>
	);
};

Alert.propTypes = {
	open         : PropTypes.bool,
	handleClose  : PropTypes.func.isRequired,
	handleExited : PropTypes.func.isRequired,
	currentAlert : PropTypes.object,
};

Alert.defaultProps = {
	open         : false,
	currentAlert : null,
};

export default Alert;
