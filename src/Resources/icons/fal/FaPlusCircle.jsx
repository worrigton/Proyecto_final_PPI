/* eslint-disable max-len */
import PropTypes from "prop-types";

const FaPlusCircle = ({ className, style, ...rest }) => (
	<svg
		style={{
			height : "1.5em",
			width  : "1.5em",
			...style,
		}}
		className={`svg-inline--fa fa-plus-circle fa-w-12 ${className}`}
		aria-hidden="true"
		focusable="false"
		data-prefix="fal"
		data-icon="plus-circle"
		role="img"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 512 512"
		data-fa-i2svg=""
		{...rest}
	>
		<path
			fill="currentColor"
			d="M384 240v32c0 6.6-5.4 12-12 12h-88v88c0 6.6-5.4 12-12 12h-32c-6.6 0-12-5.4-12-12v-88h-88c-6.6 0-12-5.4-12-12v-32c0-6.6 5.4-12 12-12h88v-88c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v88h88c6.6 0 12 5.4 12 12zm120 16c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zm-48 0c0-110.5-89.5-200-200-200S56 145.5 56 256s89.5 200 200 200 200-89.5 200-200z"
		/>
	</svg>
);

FaPlusCircle.propTypes = {
	className : PropTypes?.any,
	style     : PropTypes?.any,
};

FaPlusCircle.defaultProps = {
	className : "",
	styles    : {},
};

export default FaPlusCircle;
