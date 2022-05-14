/* eslint-disable max-len */
import PropTypes from "prop-types";

const FaArrowCircleRight = ({ className, ...rest }) => (
	<svg
		style={{
			height : "3.5em",
			width  : "3.5em",
			color  : "white",
		}}
		className={`svg-inline--fa fa-arrow-circle-right fa-w-20 ${className}`}
		aria-hidden="true"
		focusable="false"
		data-prefix="fal"
		data-icon="arrow-circle-right"
		role="img"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 512 512"
		data-fa-i2svg=""
		{...rest}
	>
		<path
			fill="currentColor"
			d="M8 256c0 137 111 248 248 248s248-111 248-248S393 8 256 8 8 119 8 256zM256 40c118.7 0 216 96.1 216 216 0 118.7-96.1 216-216 216-118.7 0-216-96.1-216-216 0-118.7 96.1-216 216-216zm12.5 92.5l115.1 115c4.7 4.7 4.7 12.3 0 17l-115.1 115c-4.7 4.7-12.3 4.7-17 0l-6.9-6.9c-4.7-4.7-4.7-12.5.2-17.1l85.6-82.5H140c-6.6 0-12-5.4-12-12v-10c0-6.6 5.4-12 12-12h190.3l-85.6-82.5c-4.8-4.7-4.9-12.4-.2-17.1l6.9-6.9c4.8-4.7 12.4-4.7 17.1 0z"
		/>
	</svg>
);

FaArrowCircleRight.propTypes = {
	className : PropTypes.string,
};

FaArrowCircleRight.defaultProps = {
	className : "",
};

export default FaArrowCircleRight;
