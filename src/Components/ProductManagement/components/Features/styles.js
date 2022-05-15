import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	features : {
		"& > *" : {
			marginBottom : theme.spacing(1),
		},

		"& .feat-title" : {
			fontSize   : "1.1em",
			fontWeight : "bold",
		},

		"& .delete-feat" : {
			display        : "flex",
			justifyContent : "flex-end",

			"& button" : {
				color      : theme.palette.secondary.main,
				fontWeight : "600",
			},
		},

		"& button.add-feature-button" : {
			width        : "100%",
			borderRadius : "8px",
		},
	},
	loading : {
		color : theme.palette.grey[700],
	},
	input : {
		"& .inputContainer" : {
			border       : `${theme.spacing(1 / 8)}px solid ${theme.palette.grey[400]}`,
			borderRadius : "4px",
			maxHeight    : theme.spacing(4.5),
		},
		"& input" : {
			marginLeft : theme.spacing(2),
			maxHeight  : theme.spacing(4.5),
		},
	},
	action : {
		marginTop : "2%",
	},
}));

export default useStyles;
