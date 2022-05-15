import PropTypes from "prop-types";
import { Paper } from "@material-ui/core";

// Import Own Components
import useStyles from "./styles";

const TablePaper = ({ children }) => {
	const classes = useStyles();

	return (
		<Paper
			square
			className={classes.root}
		>
			{ children }
		</Paper>
	);
};

TablePaper.propTypes = {
	children : PropTypes.any.isRequired,
};

export default TablePaper;
