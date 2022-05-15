import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	center : {
		display        : "flex",
		justifyContent : "center",
		alignItems     : "center",
	},
	btn : {
		fontSize : "1.1em",
		minWidth : theme.spacing(25),
	},
	spacer : {
		flexGrow : 1,
	},
	img : {
		"& .MuiCardMedia-img" : {
			borderRadius : "8px!important",
			border       : `solid 1px ${theme.palette.dark.clearLight} !important`,
			width        : "8rem!important",
			height       : "8rem!important",
		},
	},
	paper : {
		minHeight : "1Orem",
		padding   : "1rem",
	},
	separator : {
		margin : "1rem 0",
	},
}));

export default useStyles;
