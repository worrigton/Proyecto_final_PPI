import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	root : {
		padding      : theme.spacing(2),
		margin       : theme.spacing(1),
		marginBottom : "2.2rem",
	},
	titleSection : {
		padding : theme.spacing(1),
	},
	separator : {
		marginTop    : theme.spacing(2),
		marginBottom : theme.spacing(2),
	},
	container : {
		paddingTop : "20px",
		minHeight  : "100vh",
	},
	addressIcon : {
		height : "3rem !important",
		width  : "3rem !important",
		color  : theme.palette.grey[600],
	},
	cartImage : {
		height : "60px",
	},
	titleResume : {
		margin : theme.spacing(2),
	},
	textOrange : {
		color : `${theme.palette.secondary.main} !important`,
	},
	cartImageContainer : {
		padding : theme.spacing(1),
	},
	textGray : {
		color   : `${theme.palette.dark.light} !important`,
		display : "flex",
	},
	textRight : {
		textAlign : "right",
	},
	buttonComprobante : {
		marginTop    : theme.spacing(1),
		marginBottom : theme.spacing(1),
	},
	span : {
		fontSize : "1rem !important",
	},
	buttonAcciones : {
		marginTop    : theme.spacing(2),
		marginBottom : theme.spacing(2),
	},
}));

export default useStyles;
