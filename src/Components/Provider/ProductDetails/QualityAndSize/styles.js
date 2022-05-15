import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => {
	const centeredFlex = {
		display        : "flex",
		justifyContent : "center",
		alignItems     : "center",
	};

	return {
		root : {
			marginBottom : "10%",

			"& .title" : {
				padding    : "2% 0 3% 3%",
				fontSize   : "1.3em",
				fontWeight : "bold",
			},
		},
		alert : {
			[theme.breakpoints.down("sm")] : {
				marginBottom : "1%",
			},
		},
		actionsContainer : {
			padding      : "3%",
			marginBottom : "5%",
		},
		addVariantIcon : {
			display        : "flex",
			justifyContent : "center",
			alignItems     : "flex-start",
			"& button svg" : {
				color : ({ submitDisabled }) => submitDisabled
					? theme.palette.grey[600]
					: theme.palette.primary.main,
			},
		},
		variantsContainer : {
			padding : "3%",
		},
		needsRefrigeration : {
			...centeredFlex,
			justifyContent                 : "space-around",
			[theme.breakpoints.down("sm")] : {
				marginBottom : "8%",
			},
			"& svg" : {
				color    : ({ freeze }) => freeze ? "#3fb6ef" : theme.palette.grey[500],
				fontSize : "1.1em",
			},
		},
	};
});

export default useStyles;
