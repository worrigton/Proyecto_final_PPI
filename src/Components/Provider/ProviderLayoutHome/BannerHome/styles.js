import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	background : ({ mainArt }) => ({
		// [theme.breakpoints.down("xs")] : {
		// 	backgroundImage    : `url(${mainArt})`,
		// 	backgroundPosition : "top",
		// 	backgroundSize     : "initial",
		// },
		// backgroundPosition : "50% bottom",
		// backgroundSize     : "cover",
		// backgroundRepeat   : "no-repeat",
		backgroundImage : `url(${mainArt})`,
		minHeight       : "100vh",

		[theme.breakpoints.down("sm")] : {
			backgroundPosition : "85% 0%",
		},
		[theme.breakpoints.up("sm")] : {
			backgroundPosition : "50% bottom",
			backgroundSize     : "cover",
			backgroundRepeat   : "no-repeat",
		},
	}),
	header : {
		height         : "54px",
		display        : "flex",
		justifyContent : "center",
		alignItems     : "center",
		padding        : "1rem",
	},
	bodyContainer : {
		[theme.breakpoints.down("sm")] : {
			marginTop : "-20vh",
		},
	},
	padding : {
		padding      : "0 2rem",
		marginBottom : "15vh",
	},
	logo : {
		height                         : "75px",
		[theme.breakpoints.down("xs")] : {
			height : "45px",
		},
		marginRight : "1rem",
	},
	titleMain : {
		marginBottom : ".9rem",
		// [theme.breakpoints.down("sm")] : {
		// 	textAlign : "center",
		// },
	},
	subtitleMain : {
		display                        : "flex",
		paddingBottom                  : "10%",
		paddingRight                   : "5%",
		[theme.breakpoints.down("sm")] : {
			fontSize : "1em",
		},
		[theme.breakpoints.up("md")] : {
			fontSize : "1.6em",
		},
	},
	btn : {
		[theme.breakpoints.up("sm")] : {
			margin : "0 25%",
		},
		color      : "white",
		width      : "100%",
		padding    : "0.5rem",
		fontSize   : "1.1rem",
		fontWeight : "bold",
	},
	spacer : {
		flexGrow : 1,
	},
	p : {
		color  : "white",
		cursor : "pointer",
	},
	logIn : {
		color : "white",
	},
	nav : {
		margin     : "0 2.5rem",
		fontWeight : "bold",
		color      : "white !important",

		"&:hover" : {
			color : "#e6e7e8 !important",
		},
	},
	sessionButton : {
		marginRight : theme.spacing(1),
		fontWeight  : "bold",

		"&:hover" : {
			backgroundColor : "#e6e7e8 !important",
		},

		[theme.breakpoints.down("sm")] : {
			backgroundColor : "transparent",
			border          : "1px solid white",
			color           : "white",
			margin          : "0px",

			"&:hover" : {
				backgroundColor : "rgb(231 232 230 / 30%) !important",
			},
		},
	},
	papperContainer : {
		width     : "400px",
		marginTop : "2rem",
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
}));

export default useStyles;
