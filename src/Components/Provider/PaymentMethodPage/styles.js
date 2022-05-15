import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	gridPadding : {
		padding : ".5rem",
	},
	formControl : {
		width   : "100%",
		padding : "1rem",
	},
	paperPadding : {
		padding : ".5rem",
	},
	inputPadding : {
		padding : "0.3rem",
	},
	flex : {
		display    : "flex",
		alignItems : "center",
	},
	img : {
		width  : "50px",
		height : "50px",
	},
	a : {
		textDecoration : "none!important",
		color          : theme.palette.dark.main,
	},
	container : {
		padding   : "20px 1rem",
		minHeight : "100vh",
	},
	hr : {
		margin : "1.5rem 0",
	},
	hr2 : {
		margin : "0.5rem 0",
	},
	icon : {
		height : "1.5rem",
		width  : "1.5rem",
		color  : theme.palette.grey[600],
	},

}));

export default useStyles;
