import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	container : {
		minHeight : 700,
		maxHeight : 1000,
		width     : "100%",
	},
	tableCell : {
		height       : theme.spacing(7.2),
		borderBottom : `1.5px solid ${theme.palette.grey[200]}`,
	},
	cursorPointer : {
		cursor : "pointer",
	},
}));

export default useStyles;
