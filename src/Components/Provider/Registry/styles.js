import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	gridPadding : {
		padding : ".5rem",
	},
	paperPadding : {
		padding : ".5rem",
	},
	container : {
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
		display    : "block",
		paddingTop : "3rem",
	},
	instructions : {
		marginTop    : theme.spacing(1),
		marginBottom : theme.spacing(1),
	},
}));

export default useStyles;
