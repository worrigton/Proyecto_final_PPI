import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	warningIcon : {
		color  : theme.palette.secondary.main,
		width  : "5rem !important",
		height : "5rem !important",
	},
	resetButton : {
		width  : "10rem",
		margin : "1rem",
    },
    center : {
        margin         : theme.spacing(2),
        display        : "flex",
        flexDirection  : "column",
        justifyContent : "center",
        alignItems     : "center",
	},
	message : {
		textAlign : "center",
		margin    : "0.5rem 0",
	},
	resetButtonIcon : {
		height : "1.5rem !important",
		width  : "auto",
		margin : ".35rem",
	},
}));

export default useStyles;
