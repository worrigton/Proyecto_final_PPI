/* eslint-disable max-len */
import PropTypes from "prop-types";

const FaCheckCircle = ({ className, ...rest }) => (
	<svg
		style={{
			height : "1.5em",
			width  : "1.5em",
		}}
		className={`svg-inline--fa fa-check-circle fa-w-16 ${className}`}
		aria-hidden="true"
		focusable="false"
		data-prefix="fas"
		data-icon="check-circle"
		role="img"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 512 512"
		data-fa-i2svg=""
		{...rest}
	>
		<path
			fill="currentColor"
			d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"
		/>
	</svg>
);

FaCheckCircle.propTypes = {
	className : PropTypes.string,
};

FaCheckCircle.defaultProps = {
	className : "",
};

export default FaCheckCircle;
