import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	paddingGrid : {
		margin  : 0,
		padding : theme.spacing(2),
	},
	frezeeActive : {
		marginBottom : theme.spacing(2),
		color        : theme.palette.dark.light,
	},
	frezeeInactive : {
		marginBottom : theme.spacing(2),
		color        : theme.palette.secondary.main,
	},
	margin : {
		marginBottom : theme.spacing(2),
		padding      : "0px",
	},
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
	ratingContainer : {
		background   : theme.palette.background.default,
		padding      : "1rem",
		marginTop    : theme.spacing(2),
		marginBottom : theme.spacing(2),
	},
	controlsQuantityContainer : {
		border  : `1px solid ${theme.palette.dark.clearLight}`,
		margin  : "10px 0px",
		padding : "0px 10px",
	},
	outlineContainer : {
		margin       : "10px 0px",
		borderRadius : "8px",
	},
	button : {
		width : "100%!important",
	},
	price : {
		color        : theme.palette.secondary.main,
		marginTop    : theme.spacing(2),
		marginBottom : theme.spacing(2),
	},
	thumbnail : {
		height : "50px",
		width  : "auto",
	},
	vendor : {
		color : theme.palette.secondary.main,
	},
	tabContainer : {
		padding : theme.spacing(2),
	},
	OtherSellers : {
		padding : theme.spacing(2),
		height  : "10rem",
	},
	OtherSellersContainer : {
		display        : "flex",
		flexDirection  : "column",
		justifyContent : "center",
		alignItems     : "center",
		padding        : theme.spacing(2),
		height         : "130px",
		background     : theme.palette.background.default,
	},
	selectedVariants : {
		margin : "10px 0px !important",
	},
	dark : {
		background : theme.palette.dark.clearLight,
		padding    : "0.2rem 0.5rem",
	},
	light : {
		padding : "0.2rem 0.5rem",
	},
	marginTopSVG : {
		marginTop : ".3rem",
	},
	inputNumber : {
		position       : "relative",
		height         : "45px",
		overflow       : "hidden",
		borderRadius   : "4px",
		margin         : "2px",
		display        : "flex",
		justifyContent : "center",
		alignItems     : "center",
		width          : "100%",
		padding        : "10px",

		"&input::-webkit-outer-spin-button,	input::-webkit-inner-spin-button" : {
			appearance : "none",
		},
	},

	favoriteButton : {
		color  : theme.palette.primary.main,
		height : "55px",
		width  : "55px",
	},

	inputNumberValue : {
		position     : "absolute",
		height       : "100%",
		borderRadius : "4px",
		textAlign    : "center",
		fontSize     : "1.2rem",
		display      : "flex",
		alignItems   : "center",
	},

	btnPlus : {
		height          : "30px",
		width           : "30px",
		backgroundColor : theme.palette.background.white,
		border          : `1px solid ${theme.palette.primary.main} !important`,
		color           : theme.palette.primary.main,
		fontSize        : "1.3rem",
		fontWeight      : "bold",
		cursor          : "pointer",
		borderRadius    : "50%",
		outline         : "none",
		zIndex          : 10,
		position        : "absolute",
		right           : "10px",
		"&:hover"       : {
			backgroundColor : "#f3f3f3",
		},
	},

	btnMinus : {
		height          : "30px",
		width           : "30px",
		backgroundColor : theme.palette.background.white,
		border          : `1px solid ${theme.palette.primary.main} !important`,
		color           : theme.palette.primary.main,
		fontSize        : "1.3rem",
		fontWeight      : "bold",
		cursor          : "pointer",
		borderRadius    : "50%",
		outline         : "none",
		zIndex          : 100,
		position        : "absolute",
		left            : "10px",
		"&:hover"       : {
			backgroundColor : "#f3f3f3",
		},
	},
	icon : {
		width  : "1.5rem",
		height : ".8rem!important",
	},
	padding : {
		padding : "1rem",
	},
	selectVariantQuality : {
		width : "100%",
	},
}));


export default useStyles;
