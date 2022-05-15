import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => {
	const onDesktop = theme.breakpoints.up("md");

	return {
		variantInput : {
			display       : "flex",
			flexDirection : "column",

			"& .variant-info" : {
				display        : "flex",
				justifyContent : "center",
				alignItems     : "center",

				"& .info" : {
					display        : "flex",
					justifyContent : "flex-start",
				},

				"& > div" : {
					flexGrow : 1,
				},
			},

			"& .inputContainer" : {
				display        : "flex",
				justifyContent : "center",
				alignItems     : "center",

				"& > div" : {
					flexGrow : 1,
				},

				"& button" : {
					marginLeft : "2%",
				},
			},

			"& button" : {
				fontSize : "1em",
			},

			"& button .icon" : {
				fontSize : "0.8em",

				[onDesktop] : {
					opacity : 0,

					transition : theme.transitions.create("all", {
						easing   : theme.transitions.easing.easeInOut,
						duration : theme.transitions.duration.short,
					}),
				},
			},

			"&:hover" : {
				"& button .icon" : {
					[onDesktop] : {
						opacity : 1,
					},
				},
			},
		},
		freeze : {
			color : "#3fb6ef",
		},
	};
});

export default useStyles;
