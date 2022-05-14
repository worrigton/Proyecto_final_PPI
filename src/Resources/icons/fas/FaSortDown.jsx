/* eslint-disable max-len */
import PropTypes from "prop-types";

const FaSortDown = ({ className, ...rest }) => (
	<svg
		style={{
			height : "1rem",
			width  : "1.5rem",
		}}
		className={`svg-inline--fa fa-sort-down fa-w-10 ${className}`}
		aria-hidden="true"
		focusable="false"
		data-prefix="fas"
		data-icon="sort-down"
		role="img"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 320 512"
		data-fa-i2svg=""
		{...rest}
	>
		<path
			fill="currentColor"
			d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"
		/>
	</svg>
);

FaSortDown.propTypes = {
	className : PropTypes.string,
};

FaSortDown.defaultProps = {
	className : "",
};

export default FaSortDown;
