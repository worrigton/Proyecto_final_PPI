import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	center : {
		display        : "flex",
		justifyContent : "center",
		alignItems     : "center",
		width          : "100%",
		height         : "100%",
	},
	favoriteButton : {
		height : "55px",
		width  : "55px",
	},
	suggestButton : {
		margin  : 0,
		padding : 0,
	},
	productInfo : {
		marginBottom : "6%",
		padding      : "2% 2.9%",

		"& .productTitle" : {
			display    : "flex",
			alignItems : "center",

			"& .nameAndSuggestion" : {
				flexGrow : 1,

				"& .productName" : {
					fontSize : "2.6em",
				},

				"& button" : {
					color      : theme.palette.secondary.main,
					fontSize   : "1.1em",
					fontWeight : "bold",

					margin : "1.5% auto",
				},
			},
		},
		"& .imagesContainer" : {
			padding : "2% 5%",

			"& .imagesPosition" : {
				margin   : "2% 5%",
				position : "relative",
			},
		},

		"& .productDataInTabs" : {
			"& .productData" : {
				padding : "2%",
			},
		},
	},
	bold : {
		fontWeight : "bold",
	},
}));

export default useStyles;
