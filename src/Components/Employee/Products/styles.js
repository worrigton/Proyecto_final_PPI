import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	root : {
		display        : "flex",
		justifyContent : "center",
		minhHeight     : "100vh",
	},
	avatar : {
		border : `1px solid ${theme.palette.grey[200]}`,
		width  : theme.spacing(7),
		height : theme.spacing(7),
	},
	center : {
		display        : "flex",
		justifyContent : "center",
		alignItems     : "center",
	},
	icon : {
		color    : theme.palette.primary.main,
		fontSize : "1.2em",
	},
	providerInfo : {
		marginBottom   : "3%",
		display        : "flex",
		justifyContent : "flex-start",
		alignItems     : "center",
		height         : theme.spacing(17),

		"& .imageContainer" : {
			display        : "flex",
			justifyContent : "center",
			alignItems     : "center",
			marginRight    : "1%",
			height         : "100%",
			width          : "20%",

			"& .avatar" : {
				width  : theme.spacing(10),
				height : theme.spacing(10),
			},
		},

		"& .info" : {
			display       : "flex",
			flexDirection : "column",
			alignItems    : "flex-start",
			height        : "100%",

			"& > *" : {
				margin : "1%",
			},

			"& h4" : {
				fontWeight : "bold",
				fontSize   : "1.3em",
			},

			"& .rating" : {
				fontSize : "1.4em",
			},
		},
	},
}));

export default useStyles;
