import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => {
	const centeredFlex = {
		display        : "flex",
		justifyContent : "center",
		alignItems     : "center",
	};

	return {
		root : {
			margin       : 0,
			padding      : "1rem 0.5rem",
			width        : "100vw",
			marginBottom : "1rem",

			...centeredFlex,
			alignItems : "flex-start",
		},
		imageContainer : {
			...centeredFlex,
			"& img" : {
				maxWidth     : "100%",
				marginBottom : "15%",
			},
		},
		mainSection : {
			marginTop : "10%",

			...centeredFlex,
			flexDirection : "column",

			width                        : "60%",
			[theme.breakpoints.up("md")] : {
				width : "33%",
			},
			[theme.breakpoints.up("lg")] : {
				width : "25%",
			},

			"& form" : {
				display       : "flex",
				flexDirection : "column",
				width         : "100%",
			},
		},
		button : {
			margin : "1% 0",
		},
		loading : {
			...centeredFlex,
			margin : "1%",
		},
		backButton : {
			position : "fixed",
			top      : theme.spacing(1),
			left     : theme.spacing(2),
		},
		dividerR : {
			paddingRight : "0.2rem",
		},
		dividerL : {
			paddingLeft : "0.2rem",
		},
	};
});

export default useStyles;
