import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	container : {
		padding                        : "2rem 0 7rem",
		minHeight                      : "100vh",
		[theme.breakpoints.down("xs")] : {
			paddingLeft  : "0",
			paddingRight : "0",
		},
	},
	gridPadding : {
		[theme.breakpoints.up("md")] : {
			padding : "0",
		},
		[theme.breakpoints.down("sm")] : {
			padding : "1rem",
		},
	},
}));

export default useStyles;
