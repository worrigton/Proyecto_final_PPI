import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	textarea : {
		fontFamily : theme.typography.fontFamily,
		fontSize   : "1em",
		padding    : "1% 1.5%",
		boxSizing  : "border-box",
		maxWidth   : "100%",
		width      : "100% !important",
		minHeight  : theme.spacing(20),
		height     : theme.spacing(20),
		maxHeight  : theme.spacing(40),

		border       : `${theme.spacing(1 / 8)}px solid ${theme.palette.grey[300]}`,
		borderRadius : "4px",
		margin       : "1% auto",

		"&:focus" : {
			outline : `${theme.palette.primary.main} auto ${theme.spacing(1 / 4)}px`,
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
			maxHeight : theme.spacing(4.5),
		},
	},
	categories : {
		margin : "2% -1%",
	},
	images : {
		display   : "flex",
		flexWrap  : "no-wrap",
		overflowX : "auto",
		overflowY : "hidden",
		margin    : "5% 0",

		"& > *" : {
			margin : `auto ${theme.spacing(1)}px`,
		},
	},
	productImage : {
		"& .button" : {
			color : theme.palette.primary.main,
		},
	},
}));

export default useStyles;
