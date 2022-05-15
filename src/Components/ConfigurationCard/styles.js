import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	gridPadding : {
		padding : "1rem",
	},
	paperPadding : {
		padding : "0.5rem",
		height  : "100%",
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
		textDecoration : "none !important",
		color          : theme.palette.dark.main,
	},
	container : {
		height     : "100vh",
		paddingTop : "5rem",
	},
}));

export default useStyles;
