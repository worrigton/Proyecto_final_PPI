import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	img : {
		width          : "50px",
		height         : "50px",
		display        : "flex",
		justifyContent : "center",
		alignItems     : "center",
		alignContent   : "center",
		color          : theme.palette.dark.light,
		background     : theme.palette.dark.clearLight,
		margin         : ".1rem",
	},
	paperPadding : {
		paddingLeft : "1rem",
	},
	spam : {
		marginLeft : "1rem",
	},
	directionContainer : {
		borderBottom : `1px solid ${theme.palette.dark.clearLight}`,
		padding      : "1rem",
	},
}));

export default useStyles;
