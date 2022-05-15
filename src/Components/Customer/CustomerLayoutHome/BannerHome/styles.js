import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	backgroundImage : ({ mainArtCrop }) => ({
		[theme.breakpoints.down("sm")] : {
			backgroundImage    : `url(${mainArtCrop})`,
			backgroundPosition : "50vw 5vh",
			backgroundSize     : "100%",
			backgroundRepeat   : "no-repeat",
			minHeight          : "100vh",
		},
	}),

	background : ({ mainArt }) => ({
		[theme.breakpoints.up("md")] : {
			marginTop       : "6vh",
			backgroundImage : `url(${mainArt})`,
			display         : "flex",
			justifyContent  : "center",
			alignItems      : "center",
		},
		background         : theme.palette.background.white,
		minHeight          : "55vw",
		backgroundSize     : "cover",
		backgroundPosition : "right",
		backgroundRepeat   : "no-repeat",
	}),
	logoImage : {
		maxWidth                     : "30vw",
		[theme.breakpoints.up("md")] : {
			margin : "5vh 0 0 0",
		},
	},
	widthFull : {
		width    : "100%",
		position : "relative",
	},
	fullWidthcover : {
		width          : "100%",
		objectFit      : "cover",
		objectPosition : "50% 50%",
		textAlign      : "center",
	},
	container : {
		[theme.breakpoints.down("sm")] : {
			display        : "flex",
			flexDirection  : "column",
			justifyContent : "space-between",
		},
		[theme.breakpoints.up("lg")] : {
			padding : "15vh 1.5rem 3rem 1.5rem",
		},
		[theme.breakpoints.only("md")] : {
			padding : "15vh 1.5rem 3rem 1.5rem",
		},
		padding : "2rem 0.5rem 2rem 0.5rem",
		width   : "100%",
	},
	title : {
		[theme.breakpoints.down("xs")] : {
			textAlign : "center",
		},
	},
	textPadding : {
		fontWeight : "600",
	},
	icon : {
		height : "1rem",
	},
	fitContent : {
		margin                         : "7vh 0",
		width                          : "fit-content",
		[theme.breakpoints.down("xs")] : {
			display        : "flex",
			justifyContent : "center",
			width          : "100%",
		},
	},
	button : {
		padding : "0.5rem 2rem",
	},
	linkContainer : {
		margin : "3vh 0",
	},
	simpleLink : {
		color : "#000000",
	},
	sessionButton : {
		marginRight : theme.spacing(1),
		fontSize    : "1rem",
		fontWeight  : "bold",
		border      : "1.5px solid #000000",
		height      : "fit-content",

		"&:hover" : {
			backgroundColor : "#e6e7e8 !important",
		},
	},
	modal : {
		display        : "flex",
		alignItems     : "center",
		justifyContent : "center",
		padding        : "0px",
	},
	paper : {
		width           : "90%",
		backgroundColor : theme.palette.background.paper,
		boxShadow       : theme.shadows[5],
		padding         : theme.spacing(2, 2, 3),
		borderRadius    : "8px",
	},
	accountButton : {
		marginRight : theme.spacing(1),
		fontSize    : "1rem",
		fontWeight  : "bold",
		height      : "fit-content",
	},
}));

export default useStyles;
