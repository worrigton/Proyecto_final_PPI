import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles(theme => ({
	link : ({ color, hover }) => {
		const link = (color, hover) => ({
			padding        : theme.spacing(1),
			textDecoration : "none",
			color          : `${color}!important`,
			"&:hover"      : {
				color : `${hover}!important`,
			},
		});

		const Hover = (() => {
			switch (hover) {
				case "white":     return theme.palette.background.white;
				case "grey":      return theme.palette.grey[700];
				case "primary":   return theme.palette.primary.main;
				case "dark":      return theme.palette.dark.main;
				default:          return theme.palette.secondary.main;
			}
		})();

		const Color = (() => {
			switch (color) {
				case "white":     return theme.palette.background.white;
				case "secondary": return theme.palette.secondary.main;
				case "primary":   return theme.palette.primary.main;
				case "grey":      return theme.palette.grey[700];
				default:          return theme.palette.dark.main;
			}
		})();

		return link(Color, Hover);
	},

}));

export default useStyles;
