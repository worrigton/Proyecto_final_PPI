import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => {
	const onMobile = theme.breakpoints.down("sm");

	return {
		root : {
			minHeight      : "100vh",
			display        : "flex",
			justifyContent : "center",

			[onMobile] : {
				height        : "auto",
				flexDirection : "column",
			},
		},
		dataContainer : {
			alignSelf : "center",
			marginTop : "-10%",

			[onMobile] : {
				fontSize : theme.spacing(1.5),
				margin   : "5% auto 13% auto",
			},

			"& .mainDiv" : {
				paddingLeft : "38%",

				[onMobile] : {
					padding : "5%",
				},
			},
		},
		imageContainer : {
			marginTop : "-3%",
			width     : "100%",
			alignSelf : "center",

			[onMobile] : {
				display        : "flex",
				justifyContent : "center",
				alignItems     : "center",
			},

			"& img" : {
				width      : "32%",
				marginLeft : "20%",

				[onMobile] : {
					margin : "0 0 5% 0",
					width  : "50%",
				},
			},
		},
	};
});

export default useStyles;
