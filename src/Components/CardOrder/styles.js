import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	root : {
		width        : "100%",
		textAlign    : "center",
		cursor       : "pointer",
		marginBottom : "0.5rem",
	},
	cardContent : {
		width   : "100%",
		padding : "0.5rem!important",
	},
	img : {
		objectFit    : "contain",
		borderRadius : "50% !important",
		border       : `solid 1px ${theme.palette.dark.clearLight} !important`,
		height       : "100px !important",
		width        : "100px !important",
	},
}));

export default useStyles;
