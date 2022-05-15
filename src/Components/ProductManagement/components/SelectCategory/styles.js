import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	loading : {
		color : theme.palette.grey[700],
	},
	input : {
		"& .inputContainer" : {
			border       : `${theme.spacing(1 / 8)}px solid ${theme.palette.grey[400]}`,
			borderRadius : "8px",
			maxHeight    : theme.spacing(4.5),
		},
		"& input" : {
			maxHeight : theme.spacing(4.5),
		},
	},
	showCategory : {
		"& .categoryLabelAndAction" : {
			display : "flex",

			"& span" : {
				fontWeight : "600",
			},

			"& .spacer" : {
				flexGrow : 1,
			},

			"& button" : {
				marginBottom : "1%",
				color        : theme.palette.secondary.main,
				fontWeight   : "600",
			},
		},
	},
	divider : {
		margin : "3% auto",
	},
}));

export default useStyles;
