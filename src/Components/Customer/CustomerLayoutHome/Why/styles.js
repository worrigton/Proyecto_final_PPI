import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	container : {
		padding    : "4vh 5vw 5vh 5vw",
		textAlign  : "center",
		background : `${theme.palette.background.white}!important`,
	},
	titlePadding : {
		padding : "3rem 0rem 3rem 0",
	},
}));

export default useStyles;
