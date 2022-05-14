/* eslint-disable max-len */
import PropTypes from "prop-types";
import useStyles from "~/Resources/icons/styles";

const FaSearch = ({ className, style, ...rest }) => {
	const classes = useStyles();

	return (
		<svg
			className={`svg-inline--fa fa-search fa-w-16 ${className} ${classes.iconSize}`}
			aria-hidden="true"
			focusable="false"
			data-prefix="fal"
			data-icon="search"
			role="img"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 512 512"
			data-fa-i2svg=""
			{...rest}
		>
			<g className="fa-group">
				<path
					fill="currentColor"
					d="M208 80a128 128 0 1 1-90.51 37.49A127.15 127.15 0 0 1 208 80m0-80C93.12 0 0 93.12 0 208s93.12 208 208 208 208-93.12 208-208S322.88 0 208 0z"
					style={{
						color : "rgb(220 215 215 / 58%)",
					}}
				/>
				<path
					fill="currentColor"
					d="M504.9 476.7L476.6 505a23.9 23.9 0 0 1-33.9 0L343 405.3a24 24 0 0 1-7-17V372l36-36h16.3a24 24 0 0 1 17 7l99.7 99.7a24.11 24.11 0 0 1-.1 34z"
				/>
			</g>
		</svg>
	);
};

FaSearch.propTypes = {
	className : PropTypes.string,
	style     : PropTypes.object,
};

FaSearch.defaultProps = {
	className : "",
	style     : {},
};

export default FaSearch;
