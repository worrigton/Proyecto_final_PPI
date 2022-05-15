import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	orderSelect : {
		width : "85%",
	},
	padding : {
		padding : "2rem",
	},
	gridMargin : {
		marginTop : "1rem",
	},
	input : {
		padding : 0,
	},
	relevant : {
		transform  : "rotate(180deg)",
		transition : theme.transitions.create("transform", { duration : theme.transitions.duration.standard }),
	},
	relevantDisabled : {
		transform  : "rotate(0deg)",
		transition : theme.transitions.create("transform", { duration : theme.transitions.duration.standard }),
	},
	warningIcon : {
		color  : theme.palette.secondary.main,
		width  : "5rem!important",
		height : "5rem!important",
	},
	resetButton : {
		width  : "10rem",
		margin : "1rem",
	},
	spacer : {
		flexGrow : 1,
	},
	titleBackground : {
		background : `${theme.palette.primary.main} !important`,
	},
	modalTitle : {
		color : theme.palette.background.white,
	},
}));

export default useStyles;
