import PropTypes from "prop-types";
import {
	Tabs,
	Tab,
	Divider,
} from "@material-ui/core";

// Import Own Components
import useStyles from "./styles";

const TableTabs = ({
	tabs,
	value,
	handleTabChange,
	indicatorColor,
}) => {
	const classes = useStyles();

	return (
		<>
			<Tabs
				value={value || 0}
				onChange={handleTabChange}
				indicatorColor={indicatorColor}
				aria-label="Table tabs"
				className={classes.tabs}
				classes={{
					indicator : classes.indicator,
				}}
			>
				{ tabs.map(({ label }, index) => (
					<Tab
						key={index}
						label={label}
						className={classes.tab}
					/>
				)) }
			</Tabs>

			<Divider />
		</>
	);
};

TableTabs.propTypes = {
	tabs            : PropTypes.array.isRequired,
	value           : PropTypes.number.isRequired,
	handleTabChange : PropTypes.func.isRequired,
	indicatorColor  : PropTypes.oneOf(["primary", "secondary"]),
};

TableTabs.defaultProps = {
	indicatorColor : "primary",
};

export default TableTabs;
