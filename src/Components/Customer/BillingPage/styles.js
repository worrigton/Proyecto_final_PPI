import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	gridPadding : {
		padding : "1rem",
	},
	paperPadding : {
		padding : "0.5rem",
	},
	flex : {
		display    : "flex",
		alignItems : "center",
	},
	img : {
		width  : "50px",
		height : "50px",
	},
	a : {
		textDecoration : "none!important",
		color          : theme.palette.dark.main,
	},
	container : {
		paddingTop : "20px",
		minHeight  : "100vh",
	},
	pagination : {
		"& .Mui-selected" : {
			color : `${theme.palette.background.white}!important`,
		},
	},
}));

export default useStyles;
