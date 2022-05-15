import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	searchBar : {
		padding : `${theme.spacing(3)}px ${theme.spacing(2)}px`,
	},
	orderBy : {
		display    : "flex",
		alignItems : "center",
		margin     : `0 ${theme.spacing(1)}px 0 2%`,
		height     : theme.spacing(5),
		fontSize   : "1.2em",
		width      : "6rem",
	},
	orderBySelect : {
		"& > *" : {
			width : `${theme.spacing(26)}px !important`,
		},

		width : `${theme.spacing(25)}px !important`,
	},
	spacer : {
		width : "25%",
	},
	loading : {
		color : theme.palette.grey[700],
	},
	mr : {
		marginRight : "1rem",
	},
}));

export default useStyles;
