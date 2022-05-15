import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	root : {
		width        : "100%",
		boxShadow    : theme.shadows[3],
		borderRadius : "8px",
	},
	container : {
		maxHeight : 440,
	},

	tableCell : {
		height       : theme.spacing(7.2),
		borderBottom : `1.5px solid ${theme.palette.grey[200]}`,
	},
	nodata : {
		padding : "3%",
		color   : theme.palette.grey[600],
	},
}));

export default useStyles;
