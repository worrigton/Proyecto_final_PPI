import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	root : {
		height         : "100%",
		display        : "flex",
		flexDirection  : "column",
		alignItems     : "center",
		justifyContent : "center",
	},
	avatar : {
		width  : theme.spacing(17),
		height : theme.spacing(17),
	},
	data : {
		textAlign : "center",
		color     : theme.palette.grey[600],
		fontSize  : "1em",
	},
}));

export default useStyles;
