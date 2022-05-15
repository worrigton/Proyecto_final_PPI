import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	container : {
		paddingTop                     : "3rem",
		paddingBottom                  : "3rem",
		minHeight                      : "100vh",
		[theme.breakpoints.down("xs")] : {
			paddingLeft  : "0",
			paddingRight : "0",
		},
		[theme.breakpoints.up("lg")] : {
			maxWidth : "90%",
		},
	},
	gridPadding : {
		padding : "1rem",
	},
	img : {
		[theme.breakpoints.down("xs")] : {
			width : "40%",
		},
		[theme.breakpoints.only("sm")] : {
			width : "70%",
		},
		[theme.breakpoints.up("md")] : {
			width : "100%",
		},
	},
	icon : {
		color : theme.palette.secondary.main,
	},
}));

export default useStyles;
