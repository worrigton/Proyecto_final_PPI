import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	root : {
		paddingTop : "20px",
	},
	padding : {
		padding : ".5rem",
	},
	paperHeader : {
		width        : "100%",
		height       : "15rem",
		padding      : "1rem",
		borderRadius : "8px",
	},
	paperFooter : {
		width   : "100%",
		height  : "13rem",
		padding : "0.8rem",
	},
	button : {
		width : "100%",
	},
	pagination : {
		"& .Mui-selected" : {
			color : `${theme.palette.background.white}!important`,
		},
	},
}));

export default useStyles;
