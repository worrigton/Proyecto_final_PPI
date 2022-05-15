import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => {
	const centeredFlex = {
		display        : "flex",
		justifyContent : "center",
		alignItems     : "center",
	};

	return {
		root : {
			margin  : 0,
			padding : 0,
			width   : ({ uiType }) => (uiType === "popper" || uiType === "modal") ? "auto" : "100vw",
			height  : ({ uiType }) => (uiType === "popper" || uiType === "modal") ? "auto" : "100vh",

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
			marginTop : ({ uiType }) => uiType === "popper" ? "0" : "10%",
			padding   : ({ uiType }) => uiType === "popper" ? "2rem" : "0",

			...centeredFlex,
			flexDirection : "column",
			width         : "100%",

			[theme.breakpoints.up("md")] : {
				width : ({ uiType }) => (uiType === "popper" || uiType === "modal") ? "100%" : "33%",
			},
			[theme.breakpoints.up("lg")] : {
				width : ({ uiType }) => (uiType === "popper" || uiType === "modal") ? "100%" : "25%",
			},

			"& form" : {
				display       : "flex",
				flexDirection : "column",
				width         : "100%",
			},
		},
		button : {
			marginTop : "10%",
		},
		loading : {
			...centeredFlex,
			margin : "10%",
		},
		backButton : {
			position : "fixed",
			top      : theme.spacing(1),
			left     : theme.spacing(2),
		},
		clicker : {
			marginTop : "1rem",
		},
		title : {
			textAlign  : "center",
			fontWeight : "bold",
		},
	};
});

export default useStyles;
