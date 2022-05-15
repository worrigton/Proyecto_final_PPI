import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles(theme => ({
	select : {
		width     : "100%",
		"& input" : {
			padding : ".5rem 1rem!important",
		},
		"& div > .MuiInputBase-root" : {
			border       : "1px solid rgb(196, 196, 196)",
			borderRadius : "4px",
			minHeight    : "35px",
			marginTop    : ".2rem",
		},
		".MuiIconButton-root" : {
			height : "auto !important",
			width  : "auto !important",

			"& hover" : {
				height : "auto !important",
				width  : "auto !important",
			},
		},
	},
	form : {
		marginBottom : "9.6px",
	},

}));

export default useStyles;
