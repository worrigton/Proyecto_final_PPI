import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	starsContainer : {
		display        : "flex",
		justifyContent : "center",
		alignItems     : "center",
		color          : theme.palette.secondary.main,

		"& > *" : {
			margin : "1%",
		},
	},
}));

export default useStyles;
