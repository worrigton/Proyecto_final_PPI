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
	paddingY : {
		padding : "1rem 0",
	},
	header : {
		minHeight  : theme.spacing(5),
		padding    : "0.5rem 2rem",
		background : theme.palette.dark.clearLight,
	},
	body : {
		minHeight : theme.spacing(5),
		padding   : "0.5rem 2rem",
	},
	description : {
		paddingLeft : "0.5rem",
	},
	flex : {
		display    : "flex",
		alignItems : "flex-start",
		padding    : "0.5rem 0",
	},
	flex2 : {
		display        : "flex",
		alignItems     : "flex-start",
		padding        : "0.5rem 0",
		justifyContent : "center",
	},
	left2 : {
		paddingLeft                    : "1.6rem",
		[theme.breakpoints.down("sm")] : {
			paddingLeft : "0rem",
		},
	},
	right : {
		textAlign                      : "right",
		[theme.breakpoints.down("sm")] : {
			textAlign : "left",
		},
	},
	button : {
		width     : "9rem",
		marginTop : "0.5rem",
	},
	margin2 : {
		margin : theme.spacing(2),
	},
	imgPreview : {
		width : "150px",
	},
	divider : {
		width : "100%",
	},
	pagination : {
		"& .Mui-selected" : {
			color : `${theme.palette.background.white}!important`,
		},
	},
	rating : {
		display : "flex",
	},
	ratingQty : {
		marginLeft : "8px",
	},
}));

export default useStyles;
