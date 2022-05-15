import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	gridPadding : {
		padding : "0.8rem",
	},
	container : {
		paddingTop : "20px",
		minHeight  : "100vh",
	},
	productStoreContainer : {
		[theme.breakpoints.up("md")] : {
			paddingTop : "20px",
		},
		paddingTop : "0px",
	},
	pagination : {
		"& .MuiTablePagination-actions" : {
			margin : "0",
		},
	},
}));

export default useStyles;
