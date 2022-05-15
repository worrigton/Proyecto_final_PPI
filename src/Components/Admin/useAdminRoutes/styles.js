import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	icon : {
		display        : "flex",
		justifyContent : "center",
		alignItems     : "center",
		transform      : "scale(1.3)",
	},
	label : {
		color : theme.palette.grey[700],
	},
}));

export default useStyles;
