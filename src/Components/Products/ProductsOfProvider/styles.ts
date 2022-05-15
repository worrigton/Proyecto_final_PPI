import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	root : {
		borderRadius      : "8px !important",
		minHeight         : "100vh",
		padding           : "0",
		"& .backButton *" : {
			fontSize : "1.1em",
			color    : theme.palette.grey[700],
		},

		"& .title" : {
			marginBottom : "1rem",
			"& button"   : {
				height       : theme.spacing(4),
				borderRadius : "8px",
			},
		},
	},
	avatar : {
		border : `1px solid ${theme.palette.grey[200]}`,
		width  : theme.spacing(4),
		height : theme.spacing(4),
	},
	center : {
		display        : "flex",
		justifyContent : "center",
		alignItems     : "center",
	},

	providerInfo : {
		marginBottom   : "3%",
		display        : "flex",
		justifyContent : "flex-start",
		alignItems     : "center",
		padding        : "1rem",
		minHeight      : theme.spacing(17),

		"& .imageContainer" : {
			display        : "flex",
			justifyContent : "center",
			alignItems     : "center",
			marginRight    : "1%",
			height         : "100%",

			"& .avatar" : {
				width  : theme.spacing(10),
				height : theme.spacing(10),
			},
		},

		"& .info" : {
			display       : "flex",
			flexDirection : "column",
			alignItems    : "center",
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
	formControl : {
		width : "100%",
	},
}));

export default useStyles;
