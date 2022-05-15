import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	titleGrid : {
		padding : "1rem",
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
	content : {
		padding : "1rem",
	},
	cardTable : {
		borderRadius : "50%",
	},
}));

export default useStyles;
