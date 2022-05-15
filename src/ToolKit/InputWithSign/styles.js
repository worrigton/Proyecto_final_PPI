import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	root : {
		display : "flex",

		"& .inputWithSignContainer" : {
			display        : "flex",
			justifyContent : "center",
			alignItems     : "center",
			border         : `${theme.spacing(1 / 8)}px solid ${theme.palette.grey[300]}`,
			borderRadius   : "4px",

			"& input" : {
				border   : "none",
				padding  : "4% 4% 4% 7%",
				fontSize : "1.1em",
				width    : "80%",

				"&:focus" : {
					outline : "none",
				},
			},

			"& span" : {
				height         : "100% !important",
				width          : "20%",
				display        : "flex",
				justifyContent : "center",
				alignItems     : "center",
				borderLeft     : `${theme.spacing(1 / 8)}px solid ${theme.palette.grey[300]}`,
			},
		},
	},
}));

export default useStyles;
