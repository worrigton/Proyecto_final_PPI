import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	root : {
		width        : "100%",
		textAlign    : "center",
		cursor       : "pointer",
		marginBottom : "0.5rem",
	},
	cardContent : {
		padding : "0.5rem!important",
	},
	media : {
		objectFit    : "contain",
		border       : `1px solid ${theme.palette.dark.clearLight}`,
		borderRadius : "4px",
	},
	hoverImage : {
		position       : "absolute",
		top            : 0,
		bottom         : 0,
		left           : 0,
		right          : 0,
		zIndex         : 2,
		display        : "flex",
		alignItems     : "center",
		justifyContent : "center",
		"&:hover"      : {
			backgroundColor : "#f7f7f780",
			transition      : "0.3s",
			"& > svg"       : {
				display : "block",
			},
		},
		"& > svg" : {
			color           : theme.palette.secondary.main,
			width           : "4rem",
			height          : "4rem",
			backgroundColor : "white",
			borderRadius    : "8px",
			display         : "none",
		},
	},
	mediaContainer : {
		position : "relative",
	},
}));

export default useStyles;
