import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	gridPadding : {
		padding : "1rem",
	},
	inputPadding : {
		padding : ".5rem",
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
		paddingTop    : "20px",
		paddingBottom : "3rem",
		minHeight     : "100vh",
	},
	hr : {
		margin : "1.5rem 0 1.5rem 0",
	},
	formControl : {
		display : "block",
	},
	alignCenter : {
		display        : "flex",
		justifyContent : "center",
		alignItems     : "center",
		paddingRight   : "0.5rem",
	},
	spacer : {
		flexGrow : 1,
	},
	paddingNone : {
		padding : 0,
	},
}));

export default useStyles;
