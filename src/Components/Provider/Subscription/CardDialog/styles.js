import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	root : {
		height         : "100%",
		display        : "flex",
		flexDirection  : "column",
		alignItems     : "center",
		justifyContent : "center",
	},
	avatar : {
		width  : theme.spacing(17),
		height : theme.spacing(17),
	},
	data : {
		textAlign : "center",
		color     : theme.palette.grey[600],
		fontSize  : "1em",
	},
	appBar : {
		position : "relative",
	},
	title : {
		marginLeft : theme.spacing(2),
		flex       : 1,
	},
	Icon : {
		color : "white",
	},
	gridPadding : {
		padding   : "2rem",
		textAlign : "center",
	},
}));

export default useStyles;
