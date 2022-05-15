import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	mainContainer : {
		[theme.breakpoints.up("md")] : {
			marginTop : "100px",
		},
		marginTop : "80px",
	},
}));

export default useStyles;
