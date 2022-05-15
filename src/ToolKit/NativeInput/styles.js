import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
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
	inputContainer : ({ border, height }) => ({
		display         : "flex",
		flexFlow        : "row nowrap",
		alignItems      : "center",
		backgroundColor : theme.palette.common.white,

		height   : height || theme.spacing(6),
		border   : border || `${theme.spacing(1 / 8)}px solid ${theme.palette.grey[300]}`,
		fontSize : "1.3em",

		"& .adornment" : {
			display        : "flex",
			justifyContent : "center",
			alignItems     : "center",
			height         : "100%",
			width          : theme.spacing(5.1),
			color          : theme.palette.grey[700],
		},
		"& input" : {
			border           : "none",
			height           : "100%",
			flexGrow         : 1,
			fontSize         : "0.8em",
			"&::placeholder" : {
				color : theme.palette.grey[400],
			},
			"&:focus" : {
				outline : "none",
			},
		},
	}),
}));

export default useStyles;
