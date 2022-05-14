/* eslint-disable max-len */
import PropTypes from "prop-types";

const FaPlus = ({ className, style, ...rest }) => (
	<svg
		style={{
			height : "1.5em",
			width  : "1.5em",
			...style,
		}}
		className={`svg-inline--fa fa-plus fa-w-12 ${className}`}
		aria-hidden="true"
		focusable="false"
		data-prefix="fal"
		data-icon="plus"
		role="img"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 384 512"
		data-fa-i2svg=""
		{...rest}
	>
		<path
			fill="currentColor"
			d="M376 232H216V72c0-4.42-3.58-8-8-8h-32c-4.42 0-8 3.58-8 8v160H8c-4.42 0-8 3.58-8 8v32c0 4.42 3.58 8 8 8h160v160c0 4.42 3.58 8 8 8h32c4.42 0 8-3.58 8-8V280h160c4.42 0 8-3.58 8-8v-32c0-4.42-3.58-8-8-8z"
		/>
	</svg>
);

FaPlus.propTypes = {
	className : PropTypes.string,
	style     : PropTypes.object,
};

FaPlus.defaultProps = {
	className : "",
	styles    : {},
};

export default FaPlus;
