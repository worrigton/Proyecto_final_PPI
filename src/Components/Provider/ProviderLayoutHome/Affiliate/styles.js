import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	root : {
		maxWidth  : "100%",
		boxShadow : "none!important",
	},
	container : {
		[theme.breakpoints.down("sm")] : {
			padding : "0 0 6rem 0",
		},
		[theme.breakpoints.up("md")] : {
			padding : "3rem 2rem 6rem 2rem",
		},
		textAlign  : "left",
		background : `${theme.palette.background.white}!important`,
	},
	titlePadding : {
		padding : "3rem 0rem 4rem 0",
	},
	iconClass : {
		height : "2.5rem !important",
		width  : "3rem !important",
		margin : "0 0 1rem 0",
	},
}));

export default useStyles;
