import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	paddingGridRight : {
		[theme.breakpoints.up("lg")] : {
			paddingLeft : theme.spacing(2),
		},
		padding : 0,
		margin  : 0,
	},
	paddingGridLeft : {
		[theme.breakpoints.up("lg")] : {
			paddingRight : theme.spacing(2),
		},
		margin : 0,
	},
	margin : {
		marginBottom : "1.5rem",
	},
}));

export default useStyles;
