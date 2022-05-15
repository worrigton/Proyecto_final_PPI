import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	root : {
		display        : "flex",
		justifyContent : "center",
		minHeight      : "100vh",

		"& .limits" : {
			"& .backButton" : {
				margin   : "5% auto 2% 0",
				fontSize : "1.1em",

				"& *" : {
					color : theme.palette.grey[700],
				},
			},

			"& .content" : {
				display        : "flex",
				justifyContent : "center",
			},

			"& .submitBtnContainer" : {
				display        : "flex",
				justifyContent : "center",
				alignItems     : "center",

				"& button" : {
					borderRadius : "4px",
					width        : theme.spacing(22),
					margin       : "3% auto 13% auto",

					[theme.breakpoints.down("sm")] : {
						margin : "5% auto 15% auto",
					},
				},
			},
		},
	},
	grow : {
		flexGrow : 1,
	},
}));

export default useStyles;
