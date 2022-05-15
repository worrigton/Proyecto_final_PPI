import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	loadingContainer : {
		width   : theme.spacing(20),
		height  : "100%",
		display : "flex",

		"& > *" : {
			width          : "100%",
			display        : "flex",
			justifyContent : "center",
			alignItems     : "center",
		},

		"& .loadingIcon svg" : {
			color : theme.palette.grey[600],
		},

		"& .searchIcon" : {
			color    : "white",
			height   : "101%",
			width    : "100%",
			fontSize : "1.4em",

			backgroundColor         : theme.palette.primary.main,
			borderTopRightRadius    : theme.spacing(6),
			borderBottomRightRadius : theme.spacing(6),
		},
	},
}));

export default useStyles;
