import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	padding : {
		padding : "1rem",
	},
	title : {
		marginBottom : "1rem",
	},
	container : {
		padding   : 0,
		minHeight : "100vh",
	},
	input : {
		"& > div" : {
			height : "36px!important",
		},
	},
	borderButton : {
		borderColor : "rgb(224 224 224)",
	},
	tableRowClicker : {
		cursor : "pointer",
	},
	tabs : {
		textTransform : "capitalize !important",
	},
	tab : {
		textTransform : "capitalize !important",
	},
}));

export default useStyles;
