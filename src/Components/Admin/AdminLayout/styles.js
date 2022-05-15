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
		toolbar           : theme.mixins.toolbar,
		adminPagesContent : withLeftMargin => {
			const stylesForLeftMarginIfNeeded = withLeftMargin ? {
				width : `calc(85% - ${drawerWidth}px) `,

				[theme.breakpoints.up("md")] : {
					width : `calc(94% - ${drawerWidth}px) `,
				},

				[theme.breakpoints.up("lg")] : {
					width : `calc(87% - ${drawerWidth}px) `,
				},

				[theme.breakpoints.down("sm")] : {
					width : `calc(98% - ${drawerWidth}px) `,
				},
			} : {};

			return {
				flexGrow   : 1,
				marginLeft : `${drawerWidth}px`,
				padding    : "1% 6% 1% 7%",
				width      : `calc(100% - ${drawerWidth}px) `,

				...stylesForLeftMarginIfNeeded,
			};
		},
	};
});

export default useStyles;
