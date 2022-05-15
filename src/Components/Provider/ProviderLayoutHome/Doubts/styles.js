import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	root : {
		maxWidth  : "100%",
		boxShadow : "none!important",
	},
	title : {
		textAlign : "justify",
	},
	container : {
		[theme.breakpoints.down("sm")] : {
			padding : "0 0 4rem 0",
		},
		[theme.breakpoints.up("md")] : {
			padding : "1.5rem 2rem 4rem 2rem",
		},
		textAlign  : "left",
		background : `${theme.palette.background.white}!important`,
	},
	titlePadding : {
		padding   : "1rem 0",
		textAlign : "center",
	},
	infoContainer : {
		marginBottom : "10vh",
	},
	iconClass : {
		height : "2.5rem !important",
		width  : "3rem !important",
		margin : "0 0 1rem 0",
	},
	heading : {
		fontSize   : theme.typography.pxToRem(15),
		flexBasis  : "85%",
		flexShrink : 0,
		textAlign  : "justify",
	},
	secondaryHeading : {
		fontSize : theme.typography.pxToRem(15),
		color    : theme.palette.text.secondary,
	},
	questionIcon : {
		fontSize : "8.5rem",
		color    : "#e8eaea",
	},
	questionContainer : {
		textAlign : "center",
		padding   : "2rem 0",
	},
	downCaretIcon : {
		color : theme.palette.primary.main,
	},
}));

export default useStyles;
