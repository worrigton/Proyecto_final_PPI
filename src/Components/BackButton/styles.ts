import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
	root : {
		display       : "flex",
		flexDirection : "column",

		"& > *" : {
			alignSelf    : "flex-start",
			marginBottom : "1%",
		},

		"& h2" : {
			fontSize     : "2.2em",
			marginBottom : "3%",
		},
	},
	backButton : {
		display        : "flex",
		justifyContent : "center",
		fontSize       : "1.2em",
		alignItems     : "center",
		padding        : "0",
		color          : "#777777",
		marginBottom   : "1rem",
	},
	title : {
		flexGrow : 1,
		fontSize : "2.1em",
		margin   : "0",
	},
});

export default useStyles;
