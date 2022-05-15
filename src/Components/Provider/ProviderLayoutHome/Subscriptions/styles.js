import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	root : {
		paddingTop : "20px",
		maxWidth   : "100%",
		boxShadow  : "none!important",
	},
	container : {
		[theme.breakpoints.down("sm")] : {
			padding : "0 0 4rem 0",
		},
		[theme.breakpoints.up("md")] : {
			padding : "3rem 2rem 2rem 2rem",
		},
		textAlign  : "left",
		background : `${theme.palette.background.white}!important`,
	},
	titlePadding : {
		padding   : "2rem 0.5rem",
		textAlign : "center",
	},
	iconClass : {
		height : "2.5rem !important",
		width  : "3rem !important",
		margin : "0 0 1rem 0",
	},
}));

export default useStyles;
