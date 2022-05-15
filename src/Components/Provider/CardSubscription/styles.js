import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	root : {
		maxWidth : 250,
		minWidth : 210,
		margin   : "1rem",
	},
	card : {
		minHeight  : 480,
		"& :focus" : {
			outline   : `auto ${theme.palette.secondary.main}`,
			boxShadow : "0px 0px 1px 0px #000000, 0px 9px 36px 7px #f7931e47",
		},
	},
	active : {
		outline   : `auto ${theme.palette.secondary.main}`,
		boxShadow : "0px 0px 1px 0px #000000, 0px 9px 36px 7px #f7931e47",
	},
	media : {
		height     : 230,
		background : "#d2e777",
		postion    : "relative",
	},
	numProducts : {
		background   : "linear-gradient( 135deg, #93d575 10%, #62c774 100%)",
		position     : "absolute",
		top          : "0",
		left         : "-10px",
		right        : "-10px",
		height       : "5.5rem",
		borderRadius : "0 0 50% 50%",
		padding      : "1rem",
		textAlign    : "center",
	},
	pricingPrice : {
		position   : "relative",
		top        : "5rem",
		padding    : "1rem",
		textAlign  : "center",
		color      : "white",
		textShadow : "-2px 1px 9px #0000004d",
	},
	price : {
		display    : "inline-block",
		position   : "relative",
		fontWeight : "700",
		fontSize   : "4.5rem",
	},
	pricingCurrency : {
		fontSize      : "0.5em",
		verticalAlign : "super",
	},
	pricingPeriod : {
		fontSize : "1.5rem",
	},
	CardContent : {
		minHeight : "250px!important",
	},
	list : {
		padding    : "0",
		alignItems : "flex-start",
	},
	icon : {
		marginRight : "4px",
		marginTop   : "4px",
		color       : theme.palette.primary.main,
		height      : "1.2rem!important",
		width       : "1.2rem!important",
	},
	pricingPriceTwo : {
		padding   : "1rem",
		textAlign : "center",
	},
	priceTwo : {
		display    : "inline-block",
		position   : "relative",
		fontWeight : "700",
		fontSize   : "4.5rem",
	},
	pricingCurrencyTwo : {
		fontSize      : "0.5em",
		verticalAlign : "super",
	},
	pricingPeriodTwo : {
		fontSize : "1.5rem",
	},
	button : {
		width     : "100%",
		marginTop : "1rem",
	},
	discount : {
		textDecoration : "line-through",
	},
}));

export default useStyles;
