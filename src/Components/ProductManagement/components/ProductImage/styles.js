import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	root : {
		position     : "relative",
		height       : (size = 1) => theme.spacing(size * 21),
		width        : (size = 1) => theme.spacing(size * 21),
		borderRadius : "8px",
		border       : `${theme.spacing(1 / 7)}px solid ${theme.palette.grey[300]}`,

		display        : "flex",
		justifyContent : "center",
		alignItems     : "center",

		"& img" : {
			margin : theme.spacing(1 / 8),
			width  : (size = 1) => theme.spacing(size * 21) - 2,
		},

		"& button" : {
			position : "absolute",
			top      : theme.spacing(1 / 8),
			right    : theme.spacing(1 / 8),
			zIndex   : 1,
			color    : theme.palette.grey[600],
			fontSize : "0.8em",

			opacity : 0,

			transition : theme.transitions.create("all", {
				easing   : theme.transitions.easing.easeInOut,
				duration : theme.transitions.duration.short,
			}),
		},

		"&:hover" : {
			"& button" : {
				opacity : 1,
			},
		},
	},
}));

export default useStyles;
