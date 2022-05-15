import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => {
	const drawerWidth = theme.spacing(30);

	return {
		drawer : {
			width      : drawerWidth,
			flexShrink : 0,
			border     : "none",
			zIndex     : 0,

			"& span" : {
				fontWeight : "bold",
			},
		},
		drawerPaper : {
			width  : drawerWidth,
			border : "none",
			zIndex : 0,
		},
		toolbar : theme.mixins.toolbar,
		imgLogo : {
			height  : "54px",
			padding : "0 1.5rem 0 0",
		},
		imgLogoXs : {
			height  : "54px",
			padding : 0,
		},
		padding : {
			padding : "0 1.5rem 0 0",
		},
		search : {
			height       : "30px",
			borderStyle  : "none",
			borderRadius : "8px",
			padding      : "0 0.5rem 0 0.5rem",
			flexGrow     : 1,
			outline      : "none",
		},
		spacer : {
			flexGrow : 1,
		},
		drawerList : {
			minWidth     : "300px!important",
			top          : "59px!important",
			marginBottom : "60px",
		},
		secondaryToolbar : {
			background : "white",
			height     : "35px!important",
			minHeight  : "35px!important",
			position   : "relative",
		},
		Icon : {
			color  : "white",
			height : "1.6rem",
			width  : "2rem",
		},
		Icon2 : {
			height : "1rem",
			width  : "1.5rem",
		},
		menu : {
			"& .MuiListItem-button:hover" : {
				textDecoration  : "none",
				backgroundColor : theme.palette.primary.main,
				color           : "white",
			},
			"& .MuiList-root" : {
				height : "20rem",
			},
		},
		alignCenter : {
			display        : "flex",
			justifyContent : "center",
			alignItems     : "center",
		},
	};
});

export default useStyles;
