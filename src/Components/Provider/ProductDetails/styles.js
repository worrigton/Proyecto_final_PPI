import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	root : {
		display        : "flex",
		justifyContent : "center",
		"& .limits"    : {
			width : "60%",

			[theme.breakpoints.down("sm")] : {
				width : "92%",
			},

			[theme.breakpoints.up("md")] : {
				width : "100%",
			},

			[theme.breakpoints.up("lg")] : {
				width : "100%",
			},

			"& .backButton" : {
				fontSize : "1.0em",
				"& *"    : {
					color : theme.palette.grey[700],
				},
			},

			"& .content" : {
				display          : "flex",
				justifyContent   : "center",
				"& .mainContent" : {
					width : "100%",
				},
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
