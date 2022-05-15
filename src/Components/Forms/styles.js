import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
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
	padding : {
		padding : "1.5rem 0 1.5rem 0",
	},
	paperPadding : {
		padding : "1rem",
		margin  : "1rem 0rem",
	},
	paddingInput : {
		padding : "0 0.3rem",
	},
	button : {
		width : "100%!important",
	},
	span : {
		textTransform : "none",
	},
	select : {
		"& .MuiSelect-outlined.MuiSelect-outlined" : {
			padding : ".5rem !important",
		},
	},
	TermsAndConditions : {
		color : `${theme.palette.primary.main} !important`,
	},
}));

export default useStyles;
