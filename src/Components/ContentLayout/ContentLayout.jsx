import PropTypes       from "prop-types";
import { Grid, Paper } from "@material-ui/core";

// Import Own Components
import { Typography } from "~/ToolKit";
import useStyles      from "./styles";

const ContentLayout = ({ children, title, description }) => {
	const classes = useStyles();

	return (
		<Grid
			container
			direction="row"
			justify="space-between"
			alignItems="flex-start"
		>
			<Grid
				item
				xs={12}
				lg={4}
				className={classes.gridPadding}
			>
				<Typography
					type="header4"
					fontWeight="700"
				>
					{title}
				</Typography>
				<br />
				<Typography
					type="paragraph"
					className={classes.description}
				>
					{description}
				</Typography>
			</Grid>
			<Grid
				item
				xs={12}
				lg={8}
			>
				<Paper className={classes.paperPadding} variant="outlined">
					{children}
				</Paper>
			</Grid>
		</Grid>
	);
};

ContentLayout.propTypes = {
	title       : PropTypes.string,
	description : PropTypes.any,
	children    : PropTypes.oneOfType([PropTypes.array, PropTypes.element, PropTypes.node]),
};

ContentLayout.defaultProps = {
	title       : "",
	description : "",
};

export default ContentLayout;
