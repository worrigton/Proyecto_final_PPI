import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	input : {
		border          : `${theme.spacing(1 / 8)}px solid ${theme.palette.grey[300]}`,
		padding         : "1% 2%",
		height          : "100%",
		flexGrow        : 1,
		backgroundColor : theme.palette.common.white,

		"&:focus" : {
			outline : "none",
		},
	},
	underline : {
		"&&&:before" : {
			borderBottom : "none",
		},
		"&&:after" : {
			borderBottom : "none",
		},
	},
	loadingContainer : {
		"& .loading" : {
			color : theme.palette.grey[600],
		},
	},
}));

export default useStyles;
