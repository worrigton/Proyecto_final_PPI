import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	pendingRevisionContainer : {
		"& .in-revision-title" : {
			display    : "flex",
			alignItems : "center",

			"& .text" : {
				marginLeft : "2.1%",
			},

			"& .check-circle" : {
				color    : theme.palette.primary.main,
				fontSize : "0.9em",
			},
		},

		"& .info" : {
			color    : theme.palette.grey[500],
			fontSize : "1.4em",
			margin   : "6% auto 15% auto",
		},

		"& button" : {
			width        : `${theme.spacing(21)}px !important`,
			fontSize     : "1.1em",
			borderRadius : "4px",
		},
	},
}));

export default useStyles;
