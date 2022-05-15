import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	tabs : {
		paddingLeft : theme.spacing(1),
	},
	tab : {
		minWidth      : "auto",
		textTransform : "capitalize",
		fontWeight    : "bold",
		margin        : `${theme.spacing(0.2)}px ${theme.spacing(1)}px`,
		fontSize      : "1.05em",
	},
	indicator : {
		height : theme.spacing(1 / 2),
	},
	padding : {
		padding    : ".8rem!important",
		display    : "flex",
		alignItems : "center",
		"& img"    : {
			borderRadius : "8px",
			height       : "40px",
			marginRight  : "10px",
		},
	},
	spacer : {
		flexGrow : 1,
	},
}));

export default useStyles;
