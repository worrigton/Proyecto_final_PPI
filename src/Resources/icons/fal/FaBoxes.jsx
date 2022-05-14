/* eslint-disable max-len */
import PropTypes from "prop-types";

const FaBoxes = ({ className, ...rest }) => (
	<svg
		style={{
			height : "1rem",
			width  : "1.5rem",
		}}
		className={`svg-inline--fa fa-boxes fa-w-20 ${className}`}
		aria-hidden="true"
		focusable="false"
		data-prefix="fal"
		data-icon="boxes"
		role="img"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 512 512"
		data-fa-i2svg=""
		{...rest}
	>
		<path
			fill="currentColor"
			d="M624 224H480V16c0-8.8-7.2-16-16-16H176c-8.8 0-16 7.2-16 16v208H16c-8.8 0-16 7.2-16 16v256c0 8.8 7.2 16 16 16h608c8.8 0 16-7.2 16-16V240c0-8.8-7.2-16-16-16zm-176 32h64v62.3l-32-10.7-32 10.7V256zM352 32v62.3l-32-10.7-32 10.7V32h64zm-160 0h64v106.7l64-21.3 64 21.3V32h64v192H192V32zm0 224v62.3l-32-10.7-32 10.7V256h64zm-160 0h64v106.7l64-21.3 64 21.3V256h80v224H32V256zm576 224H336V256h80v106.7l64-21.3 64 21.3V256h64v224z"
		/>
	</svg>
);

FaBoxes.propTypes = {
	className : PropTypes.string,
};

FaBoxes.defaultProps = {
	className : "",
};

export default FaBoxes;
