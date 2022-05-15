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
			width   : "100vw",
			height  : "100vh",

			...centeredFlex,
			alignItems : "flex-start",
		},
		recoveryPassword : {
			margin : "3rem 0 2rem 0",
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

			width                        : "70%",
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
		divider : {
			marginTop      : "15px",
			borderTop      : `1px solid ${theme.palette.dark.clearLight}`,
			width          : "100%",
			display        : "flex",
			justifyContent : "center",
		},
	};
});

export default useStyles;
