import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	root : {
		minHeight    : "calc(100vh - 190px)",
		paddingTop   : "20px",
		marginBottom : "4rem",
	},
	paper : {
		paddingBottom : "3rem",
	},
	title : {
		margin : "15px 0px",
	},
	subtitle : {
		margin : "10px 0px",
	},
	headerConfirmation : {
		margin       : "0",
		padding      : "0.7rem 0",
		width        : "100%",
		borderBottom : `1px solid ${theme.palette.dark.clearLight}`,
	},
	container : {
		paddingTop : "20px",
		minHeight  : "100vh",
	},
	addressIcon : {
		background   : theme.palette.dark.clearLight,
		height       : "4rem !important",
		width        : "4rem !important",
		color        : theme.palette.grey[600],
		padding      : "5px",
		border       : `1px solid ${theme.palette.dark.light}`,
		borderRadius : "2px",
		marginTop    : "20px",
	},
	carouselImage : {
		height : "100px",
	},
	details : {
		padding : theme.spacing(1),
	},
	buttonPagar : {
		margin : "0.4rem 0",
		width  : "60%",
	},
	buttonContinuar : {
		margin : "0.4rem 0",
		width  : "60%",
	},
	carouselItem : {
		width  : "200px !important",
		height : "230px !important",
	},
	carousel : {
		width  : "100%",
		height : "auto",
	},
	textRight : {
		textAlign : "right",
	},
	textCenter : {
		textAlign : "center",
	},
}));

export default useStyles;
