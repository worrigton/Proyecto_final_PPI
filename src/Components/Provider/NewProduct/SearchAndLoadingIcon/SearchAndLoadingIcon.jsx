import { memo }             from "react";
import PropTypes            from "prop-types";
import { CircularProgress } from "@material-ui/core";

// Import Own Components
import { FaSearch } from "~/Resources/icons/fas";
import useStyles    from "./styles";

const SearchAndLoadingIcon = ({ loading }) => {
	const classes = useStyles();

	return (
		<div className={classes.loadingContainer}>
			<div className="loadingIcon">
				{ loading ? (
					<CircularProgress
						size={23}
						thickness={5}
						className={classes.loading}
					/>
				) : <div /> }
			</div>
			<div className="searchIcon">
				<FaSearch />
			</div>
		</div>
	);
};

SearchAndLoadingIcon.propTypes = {
	loading : PropTypes.bool,
};

SearchAndLoadingIcon.defaultProps = {
	loading : false,
};

export default memo(SearchAndLoadingIcon);
