/* eslint-disable max-len */
import PropTypes from "prop-types";

const FaEllipsisV = ({ className, style, ...rest }) => (
	<svg
		style={{
			height : "1.5em",
			width  : "1.5em",
			...style,
		}}
		className={`svg-inline--fa fa-ellipsis-v fa-w-4 ${className}`}
		aria-hidden="true"
		focusable="false"
		data-prefix="far"
		data-icon="ellipsis-v"
		role="img"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 128 512"
		{...rest}
	>
		<path
			fill="currentColor"
			d="M64 208c26.5 0 48 21.5 48 48s-21.5 48-48 48-48-21.5-48-48 21.5-48 48-48zM16 104c0 26.5 21.5 48 48 48s48-21.5 48-48-21.5-48-48-48-48 21.5-48 48zm0 304c0 26.5 21.5 48 48 48s48-21.5 48-48-21.5-48-48-48-48 21.5-48 48z"
		/>
	</svg>
);

FaEllipsisV.propTypes = {
	className : PropTypes.string,
	style     : PropTypes.object,
};

FaEllipsisV.defaultProps = {
	className : "",
};

export default FaEllipsisV;
