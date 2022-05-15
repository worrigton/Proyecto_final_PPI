import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	gridPadding : {
		padding : "1rem",
	},
	formControl : {
		width : "100%",
	},
	paperPadding : {
		padding : "1rem",
	},
	input : {
		padding : "0 .2rem",
	},
	flex : {
		display    : "flex",
		alignItems : "center",
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
		padding   : "3rem 1rem",
		minHeight : "100vh",
	},
	hr : {
		margin : "1.5rem 0",
	},

}));

export default useStyles;
