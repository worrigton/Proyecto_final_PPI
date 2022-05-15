import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	paddingGrid : {
		margin  : 0,
		padding : theme.spacing(2),
	},
	OtherSellers : {
		padding : "1rem 1rem 1.5rem 1rem",
	},
	OtherSellersContainer : {
		display        : "flex",
		flexDirection  : "column",
		justifyContent : "center",
		alignItems     : "center",
		padding        : theme.spacing(2),
		height         : "170px",
		background     : "#ffffff",
		width          : "170px",
		borderRadius   : "8px",
		border         : "1px solid #f3f3f3",
	},
	SelectedProvider : {
		backgroundColor : "#f3f3f3 !important",
	},
	price : {
		color      : theme.palette.secondary.main,
		fontSize   : "1.2rem",
		fontWeight : "500",
	},
	itemCarousel : {
		width : "300px",
	},
	carousel : {
		width : "100% !important",
	},
}));

export default useStyles;
