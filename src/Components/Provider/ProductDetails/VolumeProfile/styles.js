import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	root : {
		display       : "flex",
		flexDirection : "column",
	},
	deleteContainer : {
		display        : "flex",
		justifyContent : "center",
		alignItems     : "center",
		margin         : position => `${position === 0 ? "auto" : "2%"} 3% -2% auto`,

		"& button" : {
			color : theme.palette.secondary.main,
		},
	},
	volumeProfile : {
		display : "flex",
		margin  : "3%",

		"& .weightsSeparator" : {
			margin   : "0 1%",
			fontSize : "2em",
		},

		"& .discount" : {
			border       : `${theme.spacing(1 / 8)}px solid ${theme.palette.grey[300]}`,
			borderRadius : theme.spacing(1 / 2),

			"&:focus" : {
				outline : "none",
			},
		},
	},
	grow : {
		flexGrow : 1,
		minWidth : theme.spacing(2),
	},
	weight : {
		width : "20%",

		"& span" : {
			width : "40% !important",
		},

		[theme.breakpoints.down("sm")] : {
			width : "30%",
		},
	},
	discount : {
		width : "20%",

		"& span" : {
			width : "50% !important",
		},
	},
}));

export default useStyles;
