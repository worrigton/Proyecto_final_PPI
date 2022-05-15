import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	inputContainer : {
		padding : theme.spacing(1),
	},
	textField : {
		"& .MuiOutlinedInput-input" : {
			padding : ".5rem 0.5rem!important",
		},
		"& input" : {
			// height  : "initial",
			padding : ".5rem 1rem!important",
		},
		"& svg" : {
			height : "1rem",
			color  : theme.palette.grey[700],
		},
	},
	root : ({ grow }) => ({
		display       : "flex",
		flexDirection : "column",
		marginBottom  : theme.spacing(1.2),

		flexGrow : grow || "auto",

		"& label" : {
			textTransform : "capitalize",
			margin        : `${theme.spacing(0.5)}px 0`,
			alignSelf     : "flex-start",
			fontSize      : "1em",
			color         : theme.palette.grey[700],
		},
		"& *" : {
			fontFamily : theme.typography.fontFamily,
		},
	}),
}));

export default useStyles;
