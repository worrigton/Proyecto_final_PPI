import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	avatar : {
		border : `1px solid ${theme.palette.grey[300]}`,
	},
	center : {
		display        : "flex",
		justifyContent : "center",
		alignItems     : "center",
	},
	btn : {
		fontSize : "1.1em",
		minWidth : theme.spacing(25),
	},
}));

export default useStyles;
