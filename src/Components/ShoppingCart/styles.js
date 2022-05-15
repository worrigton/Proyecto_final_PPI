import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	container : {
		paddingTop : "20px",
		minHeight  : "100vh",
	},
	cartImage : {
		height : "60px",
	},
	titleResume : {
		marginTop    : theme.spacing(2),
		marginBottom : theme.spacing(2),
	},
	price : {
		color    : theme.palette.secondary.main,
		fontSize : "1rem",
	},
	cartImageContainer : {
		padding : theme.spacing(1),
	},
	textGrey : {
		color : theme.palette.dark.light,
	},
	widthFull : {
		width : "100%",
	},
	iconNoProducts : {
		height : "2rem !important",
		width  : "2rem !important",
		margin : "1rem",
		color  : "#f9aa58",
	},
	noProducts : {
		display        : "flex",
		alignItems     : "center",
		justifyContent : "center",
	},
	discountStyle : {
		textDecoration : "line-through",
		color          : theme.palette.dark.light,
		fontSize       : ".8rem",
		height         : "10px",
	},
	discount : {
		color    : theme.palette.dark.light,
		fontSize : ".8rem",
		height   : "10px",
	},
	spacer : {
		flexGrow : 1,
	},
	containerButton : {
		marginTop : "1rem",
	},
}));

export default useStyles;
