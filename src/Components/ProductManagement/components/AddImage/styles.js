import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	root : {
		height       : (size = 1) => theme.spacing(size * 21),
		width        : (size = 1) => theme.spacing(size * 21),
		borderRadius : "8px",
		border       : `${theme.spacing(1 / 8)}px solid ${theme.palette.grey[300]}`,

		display        : "flex",
		justifyContent : "center",
		alignItems     : "center",
		flexDirection  : "column",

		"& > *" : {
			margin : theme.spacing(1),
		},

		"& span" : {
			fontSize : "1.1em",
		},
	},
}));

export default useStyles;
