/* eslint-disable max-len */
import PropTypes from "prop-types";

const FaCircle = ({ className, ...rest }) => (
	<svg
		style={{
			height : "1rem",
			width  : "1.5rem",
		}}
		className={`svg-inline--fa fa-circle fa-w-16 ${className}`}
		aria-hidden="true"
		focusable="false"
		data-prefix="far"
		data-icon="circle"
		role="img"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 512 512"
		{...rest}
	>
		<path
			fill="currentColor"
			d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200z"
		/>
	</svg>
);

FaCircle.propTypes = {
	className : PropTypes.string,
};

FaCircle.defaultProps = {
	className : "",
};

export default FaCircle;
