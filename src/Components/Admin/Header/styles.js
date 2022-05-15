import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	root : {
		position : "relative",
		flexGrow : 1,
		zIndex   : theme.zIndex.drawer + 2,
	},
	appBar : {
		backgroundColor : `${theme.palette.dark.main} !important`,
	},
	spacer : {
		flexGrow : 1,
	},
	userName : {
		overflow     : "hidden",
		textOverflow : "ellipsis",
		whiteSpace   : "nowrap",
		padding      : theme.spacing(1.5),
		width        : theme.spacing(17),
		color        : `${theme.palette.common.white} !important`,
		textAlign    : "left",
	},
	toolbar : {
		padding : `${theme.spacing(0.5)}px ${theme.spacing(3.5)}px`,
	},
}));

export default useStyles;
