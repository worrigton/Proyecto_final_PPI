import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	footer : {
		backgroundColor : `${theme.palette.background.white} !important`,
		padding         : "0.5rem",
		borderTop       : "solid 1px",
		borderColor     : `${theme.palette.dark.clearLight} !important`,
	},
	divCenter : {
		display        : "flex",
		alignItems     : "center",
		justifyContent : "center",
		textAlign      : "center",
		padding        : "0.5rem 1rem 0.5rem 1rem",
	},
	spacer : {
		flexGrow : 1,
	},
}));

export default useStyles;
