import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	loading : {
		zIndex         : 999,
		width          : "100%",
		margin         : "auto",
		background     : "#fff",
		display        : "flex",
		justifyContent : "center",
		alignItems     : "center",
		position       : "fixed",
		top            : 0,
		left           : 0,
		right          : 0,
		bottom         : 0,
		overflow       : "hidden",
		// "&:before" : {
		// 	content         : "",
		// 	display         : "block",
		// 	position        : "fixed",
		// 	top             : 0,
		// 	left            : 0,
		// 	width           : "100%",
		// 	height          : "100%",
		// 	backgroundColor : "rgba(3, 3, 3, 0.644)",
		// },
	},
	iconContainer : {
		display        : "flex",
		justifyContent : "center",
		alignItems     : "center",
		flexDirection  : "column",
		fontSize       : "3rem",
		color          : theme.palette.primary.main,
		margin         : "auto",
	},
	rotate : {
		animation : "$rotation 2s infinite linear",
		margin    : "1rem",
	},
	"@keyframes rotation" : {
		"0%" : {
			transform : "rotate(0deg)",
		},
		"100%" : {
			transform : "rotate(359deg)",
		},
	},
}));

export default useStyles;
