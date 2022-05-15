import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	textColor : ({ color : requestedColor }) => {
		const color = (() => {
			switch (requestedColor) {
				case "white":     return theme.palette.common.white;
				case "secondary": return theme.palette.secondary.main;
				case "primary":   return theme.palette.primary.main;
				case "grey":      return theme.palette.grey[700];
				case "grey2":     return theme.palette.grey[500];
				default:          return theme.palette.dark.main;
			}
		})();

		return { color };
	},
	title : ({ fontWeight }) => ({
		fontWeight,
		lineHeight                   : "120%",
		[theme.breakpoints.up("lg")] : {
			fontSize : "6em",
		},
		[theme.breakpoints.up("md")] : {
			fontSize : "4.5em",
		},
		[theme.breakpoints.down("sm")] : {
			fontSize : "3.5em",
		},
	}),
	header1 : ({ fontWeight }) => ({
		fontWeight                   : fontWeight || "bold",
		lineHeight                   : "100%",
		[theme.breakpoints.up("lg")] : {
			fontSize : "2.5rem",
		},
		[theme.breakpoints.up("md")] : {
			fontSize : "2rem",
		},
		[theme.breakpoints.down("sm")] : {
			fontSize : "1.8rem",
		},
	}),
	header2 : ({ fontWeight }) => ({
		fontWeight                   : fontWeight || "bold",
		[theme.breakpoints.up("lg")] : {
			fontSize : "2rem",
		},
		[theme.breakpoints.up("md")] : {
			fontSize : "1.8rem",
		},
		[theme.breakpoints.down("sm")] : {
			fontSize : "1.5rem",
		},
	}),
	header3 : ({ fontWeight }) => ({
		fontWeight,
		fontSize : "1.7rem",
	}),
	header4 : ({ fontWeight }) => ({
		fontWeight,
	}),
	body2 : ({ fontWeight }) => ({
		fontWeight,
	}),
	caption : ({ fontWeight }) => ({
		fontWeight,
	}),
	paragraph : ({ fontWeight }) => ({
		fontWeight,
		fontSize : "1rem",
	}),
}));

export default useStyles;
