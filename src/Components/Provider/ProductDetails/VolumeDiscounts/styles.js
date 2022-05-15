import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	root : {
		marginBottom : "6%",

		"& .title" : {
			padding    : "2% 0 3% 3%",
			fontSize   : "1.3em",
			fontWeight : "bold",
		},

		"& .headers" : {
			display        : "flex",
			justifyContent : "center",
			alignItems     : "center",

			"& span" : {
				margin     : "3% 3%",
				fontSize   : "1.1em",
				fontWeight : "bold",
			},
		},

		"& .actionsContainer" : {
			display        : "flex",
			justifyContent : "center",
			alignItems     : "center",

			"& .spacer" : {
				flexGrow : 1,
			},
			"& .addProfile" : {
				margin : "3%",
			},
		},
	},
	grow : {
		flexGrow : 1,
	},
}));

export default useStyles;
