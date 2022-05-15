import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	products : {
		padding : "1rem 0 3rem 0",
	},
	message : {
		display                      : "flex",
		alignItems                   : "center",
		justifyContent               : "center",
		textAlign                    : "center",
		border                       : "solid 1px",
		borderColor                  : "#e4e0e0",
		[theme.breakpoints.up("sm")] : {
			height : "250px",
		},
		[theme.breakpoints.down("xs")] : {
			height : "350px",
		},
	},
	product : {
		margin   : "0 0.5rem",
		maxWidth : "250px",
	},
}));

export default useStyles;
