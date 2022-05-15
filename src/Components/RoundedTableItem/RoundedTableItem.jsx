// import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { Grid }  from "@material-ui/core";

// Import Own Components
import useStyles from "./styles";

/** Component to find an image with title and information */
const RoundedTableItem = ({
	icon,
	text,
}) => {
	const classes = useStyles();

	return (
		<Grid
			container
			direction="row"
			justify="center"
			className={classes.item}
		>
			<Grid
				item
				xs={2}
				md={1}
				container
				alignItems="center"
			>
				{icon &&
					icon}
			</Grid>
			<Grid
				item
				xs={10}
				md={11}
				container
				alignItems="center"
				className={classes.element}
			>
				{text &&
					text}
			</Grid>
		</Grid>
	);
};

RoundedTableItem.propTypes = {
	text : PropTypes.any,
	icon : PropTypes.any,
};

RoundedTableItem.defaultProps = {
	cardActions : <></>,
};

export default RoundedTableItem;
