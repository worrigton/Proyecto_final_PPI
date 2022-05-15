import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	root : {
		padding : theme.spacing(5),
	},
	textCenter : {
		textAlign : "center",
		margin    : "10px 10px",
	},
	btnModal : {
		margin : ".3rem",
	},
}));

export default useStyles;
