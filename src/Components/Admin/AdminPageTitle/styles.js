import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	root : {
		display    : "flex",
		alignItems : "center",
		margin     : `${theme.spacing(6.5)}px auto ${theme.spacing(3)}px 0`,
	},
	title : hasButton => ({
		flexGrow : 1,
		fontSize : "2.1em",
		margin   : hasButton ? "0" : "4% auto",
	}),
}));

export default useStyles;
