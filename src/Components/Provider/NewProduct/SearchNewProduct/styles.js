import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => {
	const onMobile = theme.breakpoints.down("sm");

	return {
		searchNewProductContainer : {
			"& .subtitle" : {
				fontSize     : "2em",
				color        : theme.palette.grey[600],
				marginBottom : "2%",

				[onMobile] : {
					fontSize : "1.8em",
				},
			},

			"& .info" : {
				color    : theme.palette.grey[500],
				fontSize : "1.3em",

				"& button" : {
					color      : theme.palette.grey[600],
					fontSize   : "1em",
					fontWeight : "bold",
					"&:active" : {
						color : theme.palette.primary.main,
					},
				},
			},

			"& .subtitle, & .info" : {
				[onMobile] : {
					fontSize     : "1.4em",
					textAlign    : "center",
					marginBottom : "10%",
				},
			},
		},
		input : {
			margin : "5% auto",

			[onMobile] : {
				margin : "8% auto",
			},

			height       : theme.spacing(6.25),
			border       : "none",
			borderRadius : "25px",
			boxShadow    : theme.shadows[2],
			padding      : `0 0 0 ${theme.spacing(2.5)}px`,
		},
		searchbar : {
			backgroundColor : "red",
		},
		dataDisplay : {
			height     : `${theme.spacing(7)}px !important`,
			display    : "flex",
			alignItems : "center",

			"& span" : {
				marginLeft : theme.spacing(2),
				fontWeight : "bold",
			},
		},
		errorImage : {
			width : "120%",
		},
	};
});

export default useStyles;
