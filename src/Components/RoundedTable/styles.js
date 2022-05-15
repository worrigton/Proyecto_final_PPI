import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	table : {
		width : "fit-content",
	},
	hr : {
		border : `1px solid ${theme.palette.dark.clearLight}`,
		width  : "100%",
	},
}));

export default useStyles;
