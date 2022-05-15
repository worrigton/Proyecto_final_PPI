import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	root : {
		padding : "1rem",
	},
	qualitySizeContainer : {
		padding      : ".5rem",
		border       : `1px solid ${theme.palette.dark.clearLight}`,
		borderRadius : "4px",
		textAlign    : "center",
		margin       : "1px",
	},
	qualitySizeLabel : {
		paddingTop    : ".5rem",
		paddingBottom : ".5rem",
		borderRadius  : "4px",
		textAlign     : "left",
		margin        : "1px",
	},
	publishButton : {
		width  : "100%",
		margin : "10px 0 10px 0",
	},
	publishPreviewContainer : {
		background : theme.palette.dark.clearLight,
		padding    : "3rem",
	},
}));

export default useStyles;
