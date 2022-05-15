import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	gridPadding : {
		paddingRight : "3rem",
	},
	paperPadding : {
		padding : "0.5rem",
	},
	a : {
		textDecoration : "none!important",
		color          : theme.palette.dark.main,
	},
	buttom : {
		float : "right",
	},
	description : {
		textAlign : "justify",
		padding   : "1rem 1 1rem 1rem 1rem",
	},
	hr : {
		border : `0.5px solid ${theme.palette.dark.clearLight}`,
		width  : "100%",
	},
}));

export default useStyles;
