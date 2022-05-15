import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	container : {
		[theme.breakpoints.down("sm")] : {
			padding : "1rem 2rem 3rem 2rem",
		},
		padding    : "10rem 2rem 7rem 2rem",
		textAlign  : "center",
		background : `${theme.palette.background.white}!important`,
	},
	titlePadding : {
		padding : "3rem 0rem 3rem 0",
	},
}));

export default useStyles;
