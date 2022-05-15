import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles(theme => ({
	span : ({ type }) => {
		const Span = (BgColor, Color) => ({
			padding        : "0.1rem 1rem 0.1rem 1rem",
			margin         : "0rem 0rem 0.5rem 0rem",
			fontSize       : ".8rem",
			borderRadius   : "20rem",
			background     : BgColor,
			color          : Color,
			width          : "max-content",
			display        : "flex",
			alignItems     : "center",
			justifyContent : "center",
		});
		let BgColor = "";
		let Color   = "";
		switch (type) {
			case "warning":
				BgColor = theme.palette.secondary.main;
				Color = theme.palette.background.white;
				break;
			case "alert":
				BgColor = theme.palette.warning.main;
				Color   = theme.palette.background.white;
				break;
			case "alertDark":
				BgColor = theme.palette.secondary.dark;
				Color   = theme.palette.background.white;
				break;
			case "sussess":
				BgColor = theme.palette.primary.main;
				Color   = theme.palette.background.white;
				break;
			case "warningLight":
				BgColor = theme.palette.secondary.semiLight,
				Color   = theme.palette.dark.main;
				break;
			case "warningClearLight":
				BgColor = theme.palette.secondary.clearLight;
				Color   = theme.palette.dark.main;
				break;
			default:
				BgColor = theme.palette.dark.clearLight;
				Color   = theme.palette.dark.main;
				break;
		}
		return Span(BgColor, Color);
	},
	icon : ({ iconColor }) => {
		const Icon = (Color) => ({
			marginRight : "0.5rem",
			color       : Color,
			height      : "0.8rem",
			width       : "0.8rem",
		});
		let Color   = "";
		switch (iconColor) {
			case "warning":
				Color = theme.palette.secondary.main;
				break;
			case "alert":
				Color = theme.palette.warning.main;
				break;
			case "sussess":
				Color = theme.palette.primary.main;
				break;
			case "dark":
				Color = theme.palette.dark.main;
				break;
			case "alertDark":
				Color = theme.palette.secondary.dark;
				break;
			default:
				Color   = theme.palette.background.white;
				break;
		}
		return Icon(Color);
	},
}));

export default useStyles;
