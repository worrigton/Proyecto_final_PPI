import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	root : {
		display        : "flex",
		justifyContent : "center",
		alignItems     : "center",

		margin : `-${theme.spacing(2)}px ${theme.spacing(2)}px ${theme.spacing(2)}px ${theme.spacing(2)}px`,

		"& .content" : {
			border       : `0.1em solid ${theme.palette.grey[300]}`,
			borderRadius : "8px",

			"& .actions" : {
				borderLeft : `0.1em solid ${theme.palette.grey[300]}`,
			},

			"& *, & *:hover" : {
				boxShadow : "none",
				height    : theme.spacing(4),
			},

			"& .deleteAll" : {
				display        : "flex",
				justifyContent : "center",
				alignItems     : "center",
				borderRadius   : "4px",
				marginRight    : "1em",
				border         : `0.1em solid ${theme.palette.grey[300]}`,

				width  : "1.2em !important",
				height : "1.2em !important",

				boxShadow : theme.shadows[2],

				"& .icon" : {
					width  : "0.8em",
					height : "0.15em",

					backgroundColor : theme.palette.primary.main,
				},
			},
		},

		"& .spacer" : {
			flexGrow : 1,
		},
	},
}));

export default useStyles;
