import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	root : {
		display  : "flex",
		flexWrap : "wrap",
		width    : "100%",
		"& > *"  : {
			marginBottom : theme.spacing(1),
		},

		"& .input" : {
			maxWidth : "200px !important",
		},
		[theme.breakpoints.between(0, 360)] : {
			"& .input" : {
				width : "100vw !important",
			},
			fontSize : "x-small",
		},
		[theme.breakpoints.between(360, 420)] : {
			"& .input" : {
				maxWidth : "125px !important",
			},
			fontSize : "x-small",
		},
		[theme.breakpoints.between(420, 520)] : {
			"& .input" : {
				maxWidth : "150px !important",
			},
			fontSize : "small",
		},
		[theme.breakpoints.between(520, 630)] : {
			"& .input" : {
				maxWidth : "200px !important",
			},
		},
		[theme.breakpoints.between(630, 720)] : {
			"& .input" : {
				maxWidth : "250px !important",
			},
		},
	},
	flexGrow : {
		width                               : "200px !important",
		[theme.breakpoints.between(0, 360)] : {
			width : "100vw !important",
		},
		[theme.breakpoints.between(360, 420)] : {
			width : "125px !important",
		},
		[theme.breakpoints.between(420, 520)] : {
			width : "150px !important",
		},
		[theme.breakpoints.between(520, 630)] : {
			width : "200px !important",
		},
		[theme.breakpoints.between(630, 720)] : {
			width : "250px !important",
		},
	},
	icon : {
		color    : theme.palette.primary.main,
		fontSize : "1.2em",
	},
}));

export default useStyles;
