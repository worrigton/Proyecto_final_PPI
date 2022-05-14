/* eslint-disable max-len */
import PropTypes from "prop-types";
import useStyles from "~/Resources/icons/styles";

const FaEraser = ({ className, style, ...rest }) => {
	const classes = useStyles();

	return (
		<svg
			className={`svg-inline--fa fa-eraser fa-w-16 ${className} ${classes.iconSize}`}
			aria-hidden="true"
			focusable="false"
			data-prefix="fad"
			data-icon="eraser"
			role="img"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 512 512"
			data-fa-i2svg=""
			{...rest}
		>
			<g className="fa-group">
				<path
					fill="currentColor"
					d="M512 428v40a12 12 0 0 1-12 12H144a48 48 0 0 1-33.94-14.06l-96-96a48 48 0 0 1 0-67.88l136-136 227.88 227.88L355.88 416H500a12 12 0 0 1 12 12z"
					style={{
						color : "rgb(220 215 215 / 58%)",
					}}
				/>
				<path
					fill="currentColor"
					d="M377.94 393.94l120-120a48 48 0 0 0 0-67.88l-160-160a48 48 0 0 0-67.88 0l-120 120 45.25 45.25z"
				/>
			</g>
		</svg>
	);
};

FaEraser.propTypes = {
	className : PropTypes.string,
	style     : PropTypes.object,
};

FaEraser.defaultProps = {
	className : "",
	style     : {},
};

export default FaEraser;
