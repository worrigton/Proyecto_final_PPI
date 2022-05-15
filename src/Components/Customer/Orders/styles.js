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
			borderRadius : "8px",
			height       : "40px",
			marginRight  : "10px",
		},
	},
	spacer : {
		flexGrow : 1,
	},
	container : {
		paddingTop : "20px",
		minHeight  : "100vh",
	},
	divider : {
		width : "100%",
	},
	paddingY : {
		padding : "1rem 0",
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
}));

export default useStyles;
