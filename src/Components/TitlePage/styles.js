import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	gridPadding : {
		padding : "1.2rem 0 1.5rem 0",
	},
	paperPadding : {
		padding : "0.5rem",
	},
	a : {
		textDecoration : "none!important",
		color          : theme.palette.dark.main,
		display        : "flex",
		alignItems     : "center",
	},
	buttom : {
		float : "right",
	},
	hr : {
		width  : "100%",
		margin : "1.2rem 0 1.2rem 0",
	},
}));

export default useStyles;
