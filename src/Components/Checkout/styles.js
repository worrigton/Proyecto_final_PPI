import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	root : {
		margin : theme.spacing(1),
	},
	container : {
		paddingTop : "20px",
		minHeight  : "100vh",
	},
	addressIcon : {
		height : "3rem !important",
		width  : "3rem !important",
		color  : theme.palette.grey[600],
	},
}));

export default useStyles;
