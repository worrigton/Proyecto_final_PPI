import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	center : {
		display        : "flex",
		justifyContent : "center",
		alignItems     : "center",
	},
	btn : {
		fontSize : "1.1em",
		minWidth : theme.spacing(25),
	},
	spacer : {
		flexGrow : 1,
	},
	img : {
		width        : "10rem",
		borderRadius : "8px",
	},
	inputPadding : {
		padding : "0.5rem",
	},
	clicker : {
		textAlign : "right",
		width     : "100%",
	},
}));

export default useStyles;
