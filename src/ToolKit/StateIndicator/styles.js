import { makeStyles } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles(theme => {
	const createChipStyles = ({ color, backgroundColor, chipColor }) => ({
		color,
		backgroundColor,
		"& svg" : {
			color : chipColor ? chipColor : color,
		},
	});

	return {
		flag : {
			backgroundColor : theme.palette.primary.light,
			color           : theme.palette.common.white,
			"& svg"         : {
				transform : "scale(0.9)",
			},
		},
		finalized : createChipStyles({
			color           : theme.palette.common.white,
			backgroundColor : theme.palette.primary.main,
		}),
		newProduct : createChipStyles({
			color           : theme.palette.common.white,
			backgroundColor : theme.palette.primary.light,
		}),
		delivered : createChipStyles({
			color           : theme.palette.grey[500],
			backgroundColor : theme.palette.dark.clearLight,
		}),
		pending : createChipStyles({
			color           : theme.palette.common.black,
			backgroundColor : theme.palette.secondary.semiLight,
			chipColor       : red[700],
		}),
		notReady : createChipStyles({
			color           : theme.palette.common.black,
			backgroundColor : theme.palette.secondary.light,
			chipColor       : red[700],
		}),
		suggestedChange : createChipStyles({
			color           : theme.palette.common.white,
			backgroundColor : theme.palette.secondary.dark,
		}),
		revisionPending : createChipStyles({
			color           : theme.palette.common.white,
			backgroundColor : theme.palette.secondary.main,
		}),
	};
});

export default useStyles;
