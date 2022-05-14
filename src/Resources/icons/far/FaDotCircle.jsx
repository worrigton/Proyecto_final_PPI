/* eslint-disable max-len */
import PropTypes from "prop-types";

const FaDotCircle = ({ className, ...rest }) => (
	<svg
		style={{
			height : "1rem",
			width  : "1.5rem",
		}}
		className={`svg-inline--fa fa-dot-circle fa-w-16 ${className}`}
		aria-hidden="true"
		focusable="false"
		data-prefix="far"
		data-icon="dot-circle"
		role="img"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 512 512"
		{...rest}
	>
		<path
			fill="currentColor"
			d="M256 56c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m0-48C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 168c-44.183 0-80 35.817-80 80s35.817 80 80 80 80-35.817 80-80-35.817-80-80-80z"
		/>
	</svg>
);

FaDotCircle.propTypes = {
	className : PropTypes.string,
};

FaDotCircle.defaultProps = {
	className : "",
};

export default FaDotCircle;
