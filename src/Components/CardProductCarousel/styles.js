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
		borderRadius : "8px!important",
		border       : `solid 1px ${theme.palette.dark.clearLight} !important`,
		height       : "100px !important",
		width        : "100px !important",
	},
	message : {
		display                      : "flex",
		alignItems                   : "center",
		justifyContent               : "center",
		textAlign                    : "center",
		[theme.breakpoints.up("sm")] : {
			height : "250px",
		},
		[theme.breakpoints.down("xs")] : {
			height : "350px",
		},
	},
}));

export default useStyles;
