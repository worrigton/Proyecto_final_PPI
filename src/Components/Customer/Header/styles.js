import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	root : {
		position : "relative",
		flexGrow : 1,
		zIndex   : theme.zIndex.drawer + 2,
	},
	appBar : {
		backgroundColor : `${theme.palette.background.white} !important`,
		// position        : "relative!important",
		boxShadow       : "none!important",
	},
	spacer : {
		flexGrow : 1,
	},
	userName : {
		overflow   : "hidden",
		whiteSpace : "nowrap",
		padding    : "2%",
	},
	toolbar : {
		padding : theme.spacing(0.5),
	},
	img : {
		height : "64px",
	},
	divContainerdisplay : {
		display        : "flex",
		justifyContent : "center",
		alignItems     : "center",
	},
	divContainerdisplayMenu : {
		display        : "flex",
		justifyContent : "flex-end",
		alignItems     : "center",
		height         : "64px",
		width          : "100%",
		marginRight    : "1rem",
	},
	divContainerButtons : {
		display        : "flex",
		justifyContent : "flex-end",
		alignItems     : "center",
	},
	nav : {
		margin     : "0 1rem 0 1rem",
		fontWeight : "bold",
	},
	sessionButton : {
		marginRight : theme.spacing(1),
		fontWeight  : "bold",
		border      : "1.5px solid #000000",

		"&:hover" : {
			backgroundColor : "#e6e7e8 !important",
		},
	},
	papperContainer : {
		width     : "400px",
		marginTop : "2rem",
	},
}));

export default useStyles;
