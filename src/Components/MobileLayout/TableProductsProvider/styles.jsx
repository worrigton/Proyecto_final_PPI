import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	tabs : {
		paddingLeft : theme.spacing(1),
	},
	tab : {
		minWidth      : "auto",
		textTransform : "capitalize",
		fontWeight    : "bold",
		margin        : `${theme.spacing(0.2)}px ${theme.spacing(1)}px`,
		fontSize      : "1.05em",
	},
	indicator : {
		height : theme.spacing(1 / 2),
	},
	padding : {
		padding    : ".8rem!important",
		display    : "flex",
		alignItems : "center",
		"& img"    : {
			borderRadius : "4px",
			height       : "40px",
			marginRight  : "10px",
		},
	},
	spacer : {
		flexGrow : 1,
	},
	container : {
		paddingTop : "0.5rem",
		minHeight  : "100vh",
		width      : "100%",
	},
	divider : {
		width        : "100%",
		borderRadius : "8px",
	},
	paddingY : {
		paddingTop    : "1rem",
		paddingBottom : "1rem",
	},
	paddingX : {
		paddingLeft  : "1rem",
		paddingRight : "1rem",
	},
	header : {
		minHeight  : theme.spacing(5),
		padding    : "0.5rem 2rem",
		background : theme.palette.dark.clearLight,
	},
	body : {
		minHeight : theme.spacing(5),
		padding   : "0.5rem 2rem",
	},
	description : {
		paddingLeft : "0.5rem",
	},
	flex : {
		display    : "flex",
		alignItems : "flex-start",
		padding    : "0.5rem 0",
	},
	flex2 : {
		display        : "flex",
		alignItems     : "flex-start",
		padding        : "0.5rem 0",
		justifyContent : "center",
	},
	left : {
		paddingLeft                    : "1.6rem",
		[theme.breakpoints.down("sm")] : {
			paddingLeft : "0rem",
		},
	},
	right : {
		textAlign                      : "right",
		[theme.breakpoints.down("sm")] : {
			textAlign : "left",
		},
	},
	select2 : {
		"& .MuiAutocomplete-input" : {
			width : "100%",
		},
		width : "100%",
	},
	button : {
		width     : "12rem",
		marginTop : "0.5rem",
	},
	margin2 : {
		margin : theme.spacing(2),
	},
	imgPreview : {
		width : "200px",
	},
	pagination : {
		"& .Mui-selected" : {
			color : `${theme.palette.background.white}!important`,
		},
	},
	avatar : {
		width  : "60px",
		border : "1px solid #eeeeee",
		height : "60px",
	},
	input : {
		borderRadius    : "4px",
		position        : "relative",
		backgroundColor : theme.palette.background.paper,
		border          : "1px solid #ced4da",
		fontSize        : 16,
		padding         : "10px 26px 10px 12px",
		transition      : theme.transitions.create(["border-color", "box-shadow"]),
	},
	searchBar : {
		padding : `${theme.spacing(3)}px ${theme.spacing(2)}px`,
	},
	orderBy : {
		display    : "flex",
		alignItems : "center",
		margin     : `0 ${theme.spacing(1)}px 0 2%`,
		height     : theme.spacing(5),
		fontSize   : "1.2em",
		width      : "6rem",
	},
	orderBySelect : {
		"& > *" : {
			width : `${theme.spacing(26)}px !important`,
		},

		width : `${theme.spacing(25)}px !important`,
	},
	loading : {
		color : theme.palette.grey[700],
	},
	mr : {
		marginRight : "1rem",
	},
	formControl : {
		width : "100%",
	},
	searchInput : {
		"& input" : {
			minWidth : "20vw",
		},
	},
}));

export default useStyles;
