import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	root : {
		padding : theme.spacing(2),
		margin  : theme.spacing(1),
	},
	titleSection : {
		padding : theme.spacing(1),
	},
	titleSection2 : {
		padding      : theme.spacing(1),
		marginBottom : "3px",
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
		margin  : theme.spacing(1),
		display : "flex",
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
		marginLeft   : theme.spacing(1),
	},
	span : {
		margin : "0 !important",
	},
	buttonAcciones : {
		marginTop    : theme.spacing(2),
		marginBottom : theme.spacing(2),
	},
	marginChips : {
		margin : "5px !important",
	},
	marginY : {
		margin : "0.5rem 0rem",
	},
	warning : {
		color : "#e8a02e",
	},
	success : {
		color : "#22b573",
	},
	error : {
		color : "#a91207",
	},
	pending : {
		color : "#e5e54b",
	},
	labelWithIcons : {
		display    : "flex",
		alignItems : "center",
	},
	closeButton : {
	  position : "absolute",
	  right    : theme.spacing(1),
	  top      : theme.spacing(1),
	  color    : theme.palette.grey[500],
	},
}));

export default useStyles;
