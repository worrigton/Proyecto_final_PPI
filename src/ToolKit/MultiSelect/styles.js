import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles(theme => ({
	select : {
		width     : "100%",
		"& input" : {
			padding : ".5rem 1rem!important",
		},
		"& div > .MuiInputBase-root" : {
			border       : "1px solid rgb(196, 196, 196)!important",
			borderRadius : "4px",
			minHeight    : "35px",
			marginTop    : ".2rem",
		},
	},
	form : {
		marginBottom : "9.6px",
	},
}));

export default useStyles;
