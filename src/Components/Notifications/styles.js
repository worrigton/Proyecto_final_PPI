import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	appBar : {
		position : "relative",
		height   : "64px",
	},
	title : {
		marginLeft : theme.spacing(2),
		textAlign  : "center",
		flex       : 1,
	},
	Icon : {
		color  : "white",
		height : "1.6rem",
		width  : "2rem",
	},
	Icon2 : {
		color  : theme.palette.secondary.clearLight,
		height : "1.6rem",
		width  : "2rem",
	},
	toolbar : theme.mixins.toolbar,
	menu    : {
		width : "25rem",
	},
	menu2 : {
		width : "100%",
	},
	clicker : {
		position : "relative",
	},
	marginPaper : {
		marginTop : "40px",
	},
	alert : {
		margin    : "0.5rem",
		textAlign : "center",
	},
}));

export default useStyles;
