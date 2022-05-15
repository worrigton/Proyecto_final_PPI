import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	gridPadding : {
		paddingRight : "3rem",
	},
	paperPadding : {
		padding : "1.5rem",
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
	description : {
		textAlign : "justify",
		padding   : "1rem 1 1rem 1rem 1rem",
	},
	container : {
		paddingTop    : "120px",
		paddingBottom : "3rem",
		minHeight     : "100vh",
	},
	hr : {
		border : `0.5px solid ${theme.palette.dark.clearLight}`,
		width  : "100%",
	},
	formControl : {
		display : "block",
	},
	gridButton : {
		textAlign : "right",
		padding   : "2rem 0",
	},
}));

export default useStyles;
