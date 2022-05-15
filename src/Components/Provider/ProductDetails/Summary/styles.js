import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	root : {
		margin : `0 ${theme.spacing(3)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,

		"& .max" : {
			color : theme.palette.secondary.main,
		},

		"& .padding" : {
			padding : "5%",
		},

		"& .buttonContainer" : {
			display        : "flex",
			justifyContent : "center",
			alignItems     : "center",

			"& button" : {
				width        : "80%",
				borderRadius : "4px",
				height       : theme.spacing(5),
				margin       : "5% auto",
			},
		},
	},
}));

export default useStyles;
