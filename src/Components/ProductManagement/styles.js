import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	limitContent : {
		width : "100%",

		"& > *" : {
			margin : "3% auto",
		},
	},
	actions : {
		display : "flex",

		"& .spacer" : {
			flexGrow : 1,
		},

		"& button" : {
			fontSize     : "1.1em",
			width        : theme.spacing(24),
			borderRadius : "4px",
		},
	},
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
	images : {
		display   : "flex",
		flexWrap  : "no-wrap",
		overflowX : "auto",
		overflowY : "hidden",

		"& > *" : {
			margin : `auto ${theme.spacing(1)}px`,
		},
	},
	btnMargin : {
		margin : ".3rem",
	},
}));

export default useStyles;
