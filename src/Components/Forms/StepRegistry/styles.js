import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	stepper : {
		[theme.breakpoints.up("md")] : {
			padding : "0",
		},
		[theme.breakpoints.down("sm")] : {
			padding : "1rem 0",
		},
		background : "none",
	},
	stepText : {
		"& .MuiStepIcon-text" : {
			fill    : "rgba(255, 255, 255, 0.87)!important",
			display : "none!important",
		},
		"& .MuiStepIcon-root" : {
			color : "#e6e6e6",
		},
		"& .MuiStepIcon-active" : {
			color : "rgba(0, 0, 0, 0.38)",
			//color : "#22B573",
		},
		"& .MuiSvgIcon-root" : {
			width : ".45em",
		},
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
	button : {
		marginRight : "0.5rem",
	},
}));

export default useStyles;
