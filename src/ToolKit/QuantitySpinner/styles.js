import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	inputNumber : {
		position        : "relative",
		height          : "35px",
		backgroundColor : theme.palette.dark.clearLight,
		overflow        : "hidden",
		borderRadius    : "20px",
		display         : "flex",
		justifyContent  : "center",
		alignItems      : "center",
		width           : "100%",
		border          : `1px solid ${theme.palette.dark.clearLight}`,

		"&input::-webkit-outer-spin-button,	input::-webkit-inner-spin-button" : {
			appearance : "none",
		},
	},

	inputNumberValue : {
		position     : "absolute",
		height       : "100%",
		borderRadius : "20px",
		textAlign    : "center",
		fontSize     : "1.2rem",
		display      : "flex",
		alignItems   : "center",
	},

	btnPlus : {
		height          : "28px",
		width           : "28px",
		backgroundColor : theme.palette.dark.clearLight,
		border          : `1px solid ${theme.palette.primary.main} !important`,
		color           : theme.palette.primary.main,
		fontSize        : "1.3rem",
		fontWeight      : "bold",
		cursor          : "pointer",
		borderRadius    : "50%",
		outline         : "none",
		zIndex          : 10,
		position        : "absolute",
		right           : "10px",
		"&:hover"       : {
			backgroundColor : theme.palette.background.white,
		},
	},

	btnMinus : {
		height          : "28px",
		width           : "28px",
		backgroundColor : theme.palette.dark.clearLight,
		border          : `1px solid ${theme.palette.primary.main} !important`,
		color           : theme.palette.primary.main,
		fontSize        : "1.3rem",
		fontWeight      : "bold",
		cursor          : "pointer",
		borderRadius    : "50px",
		outline         : "none",
		zIndex          : 100,
		position        : "absolute",
		left            : "10px",
		"&:hover"       : {
			backgroundColor : theme.palette.background.white,
		},
	},

}));

export default useStyles;
