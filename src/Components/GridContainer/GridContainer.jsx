import PropTypes from "prop-types";
import { Grid }  from "@material-ui/core";

// Import Own Components
import useStyles           from "./styles";

const GridContainer = ({ leftItems, rightItems }) => {
	const classes = useStyles();

	return (
		<Grid
			container
			direction="row"
			justify="center"
			alignItems="flex-start"
		>
			<Grid item xs={12} lg={8} className={classes.paddingGridLeft}>
				{ leftItems.map((item, i) => (
					<Grid className={classes.margin} key={i}>
						{item}
					</Grid>
				))}
			</Grid>
			<Grid item xs={12} lg={4} className={classes.paddingGridRight}>
				{ rightItems.map((item, i) => (
					<Grid className={classes.margin} key={i}>
						{item}
					</Grid>
				))}
			</Grid>
		</Grid>
	);
};
GridContainer.propTypes = {
	leftItems  : PropTypes.array,
	rightItems : PropTypes.array,
};

GridContainer.defaultProps = {
	leftItems  : [],
	rightItems : [],
};

export default GridContainer;
