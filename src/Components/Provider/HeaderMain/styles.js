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
		root : {
			margin : theme.spacing(1),
			color  : theme.palette.dark.main,
		},
		appBar : {
			backgroundColor : "white",
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
		button : {
			textAlign : "center",
			padding   : "2rem",
		},
		spacer : {
			flexGrow : 1,
		},
		drawerList : {
			minWidth     : "300px!important",
			top          : "59px!important",
			marginBottom : "60px",
		},
		Icon : {
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
		active : {
			fontWeight : "bold",
			color      : `${theme.palette.secondary.main} !important`,
		},
		headerLink : {
			fontWeight : "bold",
			margin     : "0 2rem 0 0 !important",
		},
	};
});

export default useStyles;
