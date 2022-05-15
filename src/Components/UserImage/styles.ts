import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	root : {
		display        : "flex",
		justifyContent : "center",
		alignItems     : "center",
		padding        : "0.5rem",

		"& > *" : {
			cursor : "pointer",
		},
	},
	img : {
		padding : "0.4rem",
	},
}));

export default useStyles;
