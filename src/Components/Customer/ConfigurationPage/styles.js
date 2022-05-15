import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	gridPadding : {
		padding : "1rem",
	},
	paperPadding : {
		padding : "0.5rem",
	},
	img : {
		width  : "50px",
		height : "50px",
	},
	a : {
		textDecoration : "none!important",
		color          : theme.palette.dark.main,
	},
	container : {
		minHeight     : "95vh",
		paddingTop    : "20px",
		paddingBottom : "5rem",
	},
	alignCenter : {
		display        : "flex",
		justifyContent : "center",
		alignItems     : "center",
		height         : "100%",
	},
}));

export default useStyles;
