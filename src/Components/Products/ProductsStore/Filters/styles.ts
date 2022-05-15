import { makeStyles } from "@material-ui/core";
import { blue }       from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
	root : {
		"& .categoryTitle" : {
			margin   : `${theme.spacing(1)}px auto`,
			color    : theme.palette.common.black,
			fontSize : "3em",
		},

		"& .orderIconContainer" : {
			fontSize : "1.3em",

			"& .orderIcon" : {
				color      : theme.palette.grey[600],
				transform  : "rotate(180deg)",
				transition : theme.transitions.create("all", {
					duration : theme.transitions.duration.complex,
				}),
			},
			"& .orderIcon.down" : {
				transform : "rotate(0deg)",
			},
		},

		"& .blueLike" : {
			color : blue[500],
		},

		"& .labelAndController" : {
			marginTop : theme.spacing(1),

			"& .resize" : {
				fontSize : "1.3em",
			},
		},

		"& .subTitle" : {
			color    : theme.palette.grey[800],
			fontSize : "1.1em",
		},

		"& .caption" : {
			fontSize : "1em",
		},

		"& > *" : {
			width : "100%",
		},

		"& .selectContainer" : {
			marginTop : "1em",

			"& .select" : {
				height : theme.spacing(5),
				width  : "100%",
			},
		},

		"& .selectContainerMobile" : {
			marginTop   : "0.5em",
			"& .select" : {
				height : theme.spacing(5),
				width  : "100%",
			},
		},
		padding : ".5rem 0",
		width   : "100%",
	},
	orderSelect : {
		width : "85%",
	},
	padding : {
		padding : "2rem",
	},
	gridMargin : {
		marginTop : "1rem",
	},
	input : {
		padding : 0,
	},
	relevant : {
		transform  : "rotate(180deg)",
		transition : theme.transitions.create("transform", { duration : theme.transitions.duration.standard }),
	},
	relevantDisabled : {
		transform  : "rotate(0deg)",
		transition : theme.transitions.create("transform", { duration : theme.transitions.duration.standard }),
	},
	warningIcon : {
		color  : theme.palette.secondary.main,
		width  : "5rem!important",
		height : "5rem!important",
	},
	resetButton : {
		textAlign  : "left",
		display    : "flex",
		alignItems : "center",
		fontSize   : ".8rem",
		fontWeight : "bold",
	},
	resetButtonText : {
		color   : theme.palette.primary.light,
		padding : ".2rem",
	},
	resetButtonIcon : {
		height : "2rem !important",
		width  : "auto",
		margin : ".5rem",
	},
	spacer : {
		flexGrow : 1,
	},
	titleBackground : {
		background : `${theme.palette.primary.main} !important`,
	},
	modalTitle : {
		color : theme.palette.common.white,
	},
	filtersMobileContainer : {
		padding : "4px",
	},
	resultsLabel : {
		padding : "1.5rem 0 0",
	},
}));

export default useStyles;
