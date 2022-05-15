import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	padding : {
		padding : "1rem",
	},
	marginY : {
		margin : "2rem 0",
	},
	container : {
		paddingTop : "20px",
		minHeight  : "100vh",
	},
	table : {
		minWidth : 650,
	},
	input : {
		"& > div" : {
			height : "36px!important",
		},
	},
	borderButton : {
		borderColor : "rgb(224 224 224)",
	},
	tabs : {
		textTransform : "capitalize !important",
	},
	indicators : {
		textTransform : "capitalize !important",
	},
}));

export default useStyles;
