import PropTypes from "prop-types";
import useStyles from "./styles";

// import own components

import { Typography } from "~/ToolKit";

const MessageBox = ({ message }) => {
	const classes = useStyles();
	return (
		<div className={classes.messageBox}>
			<Typography align="center" className={classes.message}>{message}</Typography>
		</div>
	);
};

MessageBox.propTypes = {
	message : PropTypes.string.isRequired,
};

export default MessageBox;
