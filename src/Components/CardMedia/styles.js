import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	root : {
		maxWidth                       : "100%",
		boxShadow                      : "none!important",
		[theme.breakpoints.down("xs")] : {
			margin : "0 0 2rem 0",
		},
	},
	media : {
		objectFit : "contain",
	},
	container : {
		padding    : "5rem 2rem 4rem 2rem",
		textAlign  : "center",
		background : `${theme.palette.background.white}!important`,
	},
	AffiliateClasses : {
		display                        : "flex",
		[theme.breakpoints.down("sm")] : {
			alignItems : "center",
			margin     : "0 0 5em 0",
			"& img"    : {
				width : "30%",
			},
		},
		[theme.breakpoints.up("md")] : {
			"& img" : {
				width : "30%",
			},
		},
	},
	BodyClasses : {
		[theme.breakpoints.down("sm")] : {
			fontSize : ".8rem",
		},
	},
	TitleClasses : {
		[theme.breakpoints.up("md")] : {
			fontSize : "1.5rem",
		},
	},
	cardActions : {
		padding : "1rem",
	},
	cardContent : {
		padding : "1 rem",
	},
}));

export default useStyles;
