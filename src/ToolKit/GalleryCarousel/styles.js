import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	btnUp : {
		height : "48px",
		width  : "48px",
	},
	imageGallery : {
		margin        : "0 auto",
		display       : "flex",
		flexDirection : "column",
		height        : "270px",
		overflow      : "hidden",
	},
	thumbnailImage : {
		height    : "100%",
		transform : " translate( -0%, -0%)",
	},
	thumbnails : {
		display        : "flex",
		justifyContent : "center",
		height         : "80px",
		width          : "80px",
		border         : `1px solid ${theme.palette.dark.light}`,
		borderRadius   : "8px",
		margin         : theme.spacing(.5),
		overflow       : "hidden",
	},
	selectedImage : {
		display        : "flex",
		justifyContent : "center",
		padding        : theme.spacing(2),
		overflow       : "hidden",
		maxHeight      : "350px",
	},
	mainImage : {
		height : "100%",
	},
	boxImg : {
		width     : "100%",
		textAlign : "center",
		"& img "  : {
			height                         : "100%",
			objectFit                      : "contain",
			maxWidth                       : "100vw",
			objectPosition                 : "center center",
			[theme.breakpoints.down("sm")] : {
				width : "100%",
			},
		},
	},
}));


export default useStyles;
