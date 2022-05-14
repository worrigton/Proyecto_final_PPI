import {
	createMuiTheme,
	responsiveFontSizes,
} from "@material-ui/core/styles";
import { esES } from "@material-ui/core/locale";

// Create a theme instance.
let theme = createMuiTheme({
	palette : {
		primary : {
			light : "#62c775",
			main  : "#22B573",
		},
		secondary : {
			main       : "#F7931E",
			dark       : "#FF8983",
			light      : "#FFEA8A",
			semiLight  : "#ffc581",
			clearLight : "#FFEABA",
		},
		warning : {
			main : "#D4145A",
		},
		dark : {
			text       : "#616161",
			main       : "#303030",
			regular    : "#6F7170",
			light      : "#A2A2A2",
			clearLight : "#E6E6E6",
		},
		background : {
			default : "#f6f7f9",
			light   : "#fefefe",
			white   : "#ffffff",
		},
	},
	typography : {
		fontFamily : [
			"-apple-system",
			"BlinkMacSystemFont",
			"'Segoe UI'",
			"Roboto",
			"'Helvetica Neue'",
			"Arial",
			"sans-serif",
			"'Apple Color Emoji'",
			"'Segoe UI Emoji'",
			"'Segoe UI Symbol'",
			"'Open Sans'",
			"Montserrat",
		].join(","),
	},
}, esES);

theme = responsiveFontSizes(theme);

export default theme;
