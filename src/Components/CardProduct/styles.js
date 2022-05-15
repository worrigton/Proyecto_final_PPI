import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	root : {
		width        : "100%",
		textAlign    : "center",
		cursor       : "pointer",
		marginBottom : "0.5rem",
		padding      : "0px !important",
	},
	cardProduct : {
		borderRadius : "8px",
	},
	cardContent : {
		padding : "0.5rem!important",
	},
	media : {
		objectFit : "contain",
		minHeight : "210px",
	},
	imageBorder : {
		border       : `1px solid ${theme.palette.dark.clearLight}`,
		borderRadius : "8px",
	},
	otherClass : {
		objectFit : "none !important",
	},
	hr : {
		border : `1px solid ${theme.palette.dark.clearLight}`,
		width  : "100%",
	},
	productName : {
		height       : "auto",
		whiteSpace   : "nowrap",
		textOverflow : "ellipsis",
		overflow     : "hidden",
	},
}));

export default useStyles;
