import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	gridPadding : {
		padding : ".5rem",
	},
	inputPadding : {
		paddingRight : ".5rem",
	},
	buttonPadding : {
		paddingRight : "0.5rem",
	},
	paperPadding : {
		padding : ".5rem",
	},
	flex : {
		display    : "flex",
		alignItems : "center",
	},
	img : {
		width  : "35px",
		height : "35px",
	},
	a : {
		textDecoration : "none!important",
		color          : theme.palette.dark.main,
	},
	description : {
		textAlign : "justify",
		padding   : "1rem 1 1rem 1rem 1rem",
	},
	container : {
		paddingTop    : "3rem",
		paddingBottom : "3rem",
		minHeight     : "100vh",
	},
	hr : {
		border : `0.5px solid ${theme.palette.dark.clearLight}`,
		width  : "100%",
	},
	hrMargin : {
		border : `0.5px solid ${theme.palette.dark.clearLight}`,
		width  : "100%",
		margin : "1.5rem 0 1.5rem 0",
	},
	formControl : {
		display : "block",
	},
}));

export default useStyles;
