import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	title : ({ color }) => ({
		zIndex        : 1000,
		textAlign     : "center",
		fontSize      : "4.2vh",
		textTransform : "inherit",
		fontWeight    : 600,
		color         : color ? theme.palette.dark.main : theme.palette.background.white,
		padding       : "1rem",
		"& p"         : {
			marginBlockStart  : "0em",
			marginBlockEnd    : "0em",
			marginInlineStart : "0px",
			marginInlineEnd   : "0px",
		},
	}),
	subTitle : ({ color }) => ({
		zIndex        : 1000,
		textAlign     : "center",
		color         : color ? theme.palette.dark.main : theme.palette.background.white,
		fontSize      : "2.5vh",
		textTransform : "inherit",
		padding       : "1rem 0 2rem 0",
	}),
	parallaxContainerFlex : ({ shadow }) => ({
		width           : "100%",
		height          : "100%",
		display         : "flex",
		position        : "absolute",
		alignItems      : "center",
		flexDirection   : "column",
		justifyContent  : "center",
		backgroundColor : shadow ? "rgba(0, 0, 0, 0.34)" : "",
	}),
	parallaxContainer : ({ height, background, alignment, backgroundSize, paradax }) => ({
		position             : "relative",
		height               : height,
		background           : `url( ${background} ) ${alignment}`,
		backgroundSize       : backgroundSize,
		backgroundAttachment : paradax,
	}),
	button : {
		padding    : "0.8rem 2rem",
		fontWeight : "bold",
		fontSize   : "1.2em",
	},
}));

export default useStyles;
