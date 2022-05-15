import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	icon : {
		color    : theme.palette.primary.main,
		fontSize : "1.2em",
	},
	minDialog : {
		[theme.breakpoints.up("sm")] : {
			minWidth : "600px",
		},
	},
	padding : {
		padding : "0.5rem",
	},
	needsRefrigeration : {
		"& svg" : {
			fontSize : "1.1em",
			height   : "1.5rem!important",
			width    : "1.5rem!important",
		},
	},
	addVarietiesLabel : {
		textAlign : "center",
	},
}));

export default useStyles;
