import PropTypes from "prop-types";

// Import Own Components
import { Typography } from "~/ToolKit";
import useStyles      from "./styles";

const AdminPageTitle = ({ title, button : Button }) => {
	const classes = useStyles(Boolean(Button));

	return (
		Button ? (
			<div className={classes.root}>
				<Typography
					type="header1"
					className={classes.title}
				>
					{title}
				</Typography>

				{Button}
			</div>
		) : (
			<Typography
				type="header1"
				className={classes.title}
			>
				{title}
			</Typography>
		)
	);
};

AdminPageTitle.propTypes = {
	title  : PropTypes.string.isRequired,
	button : PropTypes.node,
};

AdminPageTitle.defaultProps = {
	button : null,
};

export default AdminPageTitle;
