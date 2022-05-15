import React, { useEffect }   from "react";
import PropTypes              from "prop-types";
import { connect }            from "react-redux";
import { bindActionCreators } from "redux";

// Import Own Components
import LoaderActions from "./store/actions";
import useStyles  from "./styles";
import { Typography } from "~/ToolKit";
import FaSpinner from "~/Resources/icons/fas/FaSpinner";

const Loading = ({
	loadingOpen,
	loaderActions,
	title,
	subtitle,
}) => {
	const classes = useStyles();
	useEffect(() => {
		if (loadingOpen) {
			setTimeout(() => loaderActions.closeLoader(), 20000);
		}
	}, [loadingOpen, loaderActions]);

	if (!loadingOpen) {
		return null;
	}
	return (
		<div className={classes.loading}>
			<div className={classes.iconContainer}>
				<FaSpinner style={{ height : "5rem" }} className={classes.rotate} />
				<Typography type="header2">{title}</Typography>
				{
					subtitle != "" && (<Typography type="header3">Ponte cómodo</Typography>)
				}
			</div>
		</div>
	);
};

const mapStateToProps = ({
	loaderReducer : { open : loadingOpen, title, subtitle } }) => ({ loadingOpen, title, subtitle  });

const mapDispatchToProps = dispatch => ({
	loaderActions : bindActionCreators(LoaderActions, dispatch),
});

Loading.propTypes = {
	loadingOpen   : PropTypes.bool.isRequired,
	loaderActions : PropTypes.func.isRequired,
	title         : PropTypes.string,
	subtitle      : PropTypes.string,
};

Loading.defaultProps = {
	title    : "Cargando",
	subtitle : "",
};

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
