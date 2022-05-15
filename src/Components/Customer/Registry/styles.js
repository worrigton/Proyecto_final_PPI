import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	gridPadding : {
		padding : ".5rem",
	},
	paperPadding : {
		padding : ".5rem",
	},
	container : {
		marginTop     : "80px",
		paddingTop    : "20px",
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
	instructions : {
		marginTop    : theme.spacing(1),
		marginBottom : theme.spacing(1),
	},
	spacer : {
		flexGrow : 1,
	},
	imgLogo : {
		height  : "54px",
		padding : 0,
	},
}));

export default useStyles;
