import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	messageBox : {
		alignItems      : "flex-start",
		color           : "#383d41",
		backgroundColor : "#f1f2f1",
		borderColor     : "#d6d8db",
		position        : "relative",
		padding         : ".75rem 1.25rem",
		marginBottom    : "1rem",
		border          : "1px solid transparent",
	},
	message : {
		fontSize : ".9rem",
	},
}));

export default useStyles;
