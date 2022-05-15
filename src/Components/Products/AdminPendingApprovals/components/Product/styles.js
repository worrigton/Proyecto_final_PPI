import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => {
	const borderColor = `${theme.spacing(1 / 8)}px solid ${theme.palette.grey[300]}`;

	return {
		product : {
			width           : "100%",
			maxWidth        : theme.spacing(64),
			display         : "flex",
			justifyContent  : "center",
			backgroundColor : theme.palette.common.white,
			border          : borderColor,
			position        : "relative",
			maxHeight       : theme.spacing(37),
			transition      : theme.transitions.create("all", {
				duration : theme.transitions.duration.short,
			}),

			"& > div" : {
				width : "50%",
			},
		},
		productName : {
			fontSize : "2em",
		},
		withColumnStyles : {
			height        : "100%",
			maxHeight     : "100%",
			flexDirection : "column",

			"& > div" : {
				width : "100%",
			},
		},
		imageContainer : {
			display        : "flex",
			justifyContent : "center",
			alignItems     : "center",

			"& > img" : {
				maxWidth : "100%",
			},
		},
		dataContainer : withColumnStyles => ({
			borderLeft : withColumnStyles ? "none" : borderColor,
		}),
		data : {
			margin        : `${theme.spacing(1)}px ${theme.spacing(2)}px`,
			display       : "flex",
			flexDirection : "column",

			"& > *" : {
				marginBottom : theme.spacing(1.7),
			},
		},
		spacer : withColumnStyles => ({
			height : theme.spacing(withColumnStyles ? 2 : 5),
		}),
		flag : {
			position     : "absolute",
			right        : 0,
			top          : theme.spacing(1.5),
			borderRadius : "8px",
		},
	};
});

export default useStyles;
