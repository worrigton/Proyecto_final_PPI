import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	center : {
		justifyContent : "center",
		textAlign      : "center",
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
	left : {
		display        : "flex",
		justifyContent : "left!important",
		alignItems     : "center",
		color          : theme.palette.secondary.main,

		"& > *" : {
			margin : "1%",
		},
	},
	root : {
		width : "100%",
	},
	select2 : {
		"& .MuiInputBase-root" : {
			border : "none!important",
		},
	},
	hr : {
		margin : "0.5rem 0",
	},
	heading : {
		fontSize   : theme.typography.pxToRem(15),
		flexBasis  : "33.33%",
		flexShrink : 0,
	},
	secondaryHeading : {
		fontSize : theme.typography.pxToRem(15),
		color    : theme.palette.text.secondary,
	},
	spanFont : {
		fontSize : "1rem!important",
		margin   : "0.2rem",
	},
	margin : {
		margin : "0.2rem",
	},
	providerProductsTableContainer : {
		width   : "100%",
		padding : "0px !important",
		margin  : "0px !important",

		"& .limits" : {
			width : "100%",
		},

		"& .MuiContainer-root" : {
			padding  : "0px !important",
			maxWidth : "100% !important",
		},
	},
	btnEliminar : {
		width : "100%",
	},
}));

export default useStyles;
