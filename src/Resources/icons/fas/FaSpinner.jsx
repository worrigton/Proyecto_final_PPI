/* eslint-disable max-len */
import PropTypes from "prop-types";

const FaSpinner = ({ className, size, ...rest }) => (
	<svg
		style={{
			height : `${size}rem`,
			width  : `${size * 1.5}rem`,
		}}
		className={`svg-inline--fa  fa-spinner fa-w-16 ${className}`}
		aria-hidden="true"
		focusable="false"
		data-prefix="fa"
		data-icon="star"
		role="img"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 512 512"
		data-fa-i2svg=""
		{...rest}
	>
		<path
			fill="currentColor"
			d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"
		/>
	</svg>
);

FaSpinner.propTypes = {
	className : PropTypes.string,
	size      : PropTypes.number,
};

FaSpinner.defaultProps = {
	className : "",
	size      : 1,
};

export default FaSpinner;
