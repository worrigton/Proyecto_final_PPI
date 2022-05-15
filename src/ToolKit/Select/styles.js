import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	root : {
		display        : "flex",
		flexDirection  : "row",
		justifyContent : "center",
		alignItems     : "center",

		color    : theme.palette.grey[700],
		fontSize : "1.2em",
		cursor   : "pointer",
		height   : theme.spacing(5),
		width    : theme.spacing(12),

		border : `${theme.spacing(1 / 8)}px solid ${theme.palette.grey[300]}`,

		"& svg" : {
			marginBottom : theme.spacing(1 / 2),
		},
	},
}));

export default useStyles;
