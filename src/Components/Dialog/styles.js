import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	root : {
		margin  : 0,
		padding : theme.spacing(2),
		color   : theme.palette.grey[600],

		"& h6" : {
			fontSize : "1.3em",
		},
	},
	closeButton : {
		position : "absolute",
		right    : theme.spacing(1),
		top      : theme.spacing(1),
		color    : theme.palette.grey[500],
	},
	actions : {
		display        : "flex",
		justifyContent : "flex-end",
		alignItems     : "center",

		"& button" : {
			margin       : "2%",
			height       : theme.spacing(4),
			borderRadius : "8px",
		},
	},
	optional : {
		color         : theme.palette.secondary.main,
		marginRight   : "auto !important",
		textTransform : "none",
	},
}));


export default useStyles;
