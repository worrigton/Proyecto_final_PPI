import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	paddingGrid : {
		marginTop : "20px",
		padding   : theme.spacing(2),
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
	outlineContainer : {
		border       : `1px solid ${theme.palette.background.default}`,
		borderRadius : "8px",
		margin       : "10px 0px",
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
		height : "150px",
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
		border         : "3px solid #cccccc",
		margin         : "1rem !important",
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
}));


export default useStyles;
