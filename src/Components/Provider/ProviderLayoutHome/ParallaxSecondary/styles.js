import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	containerParallax : {
		backgroundColor : `${theme.palette.background.white} !important`,
		padding         : "2rem 0 6rem 0",
	},
	containerTitle : {
		padding   : "2rem 0.5rem 5rem 0.5rem",
		textAlign : "center",
	},
	iconButtonClass : {
		height    : "2.5rem !important",
		width     : "3rem !important",
		margin    : "0",
		"&:hover" : {
			color      : "khaki",
			transition : "all 0.2s ease",
		},
	},
}));

export default useStyles;
