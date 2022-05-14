/* eslint-disable max-len */
import PropTypes from "prop-types";
import useStyles from "~/Resources/icons/styles";

const FaTimes = ({ className, ...rest }) => {
	const classes = useStyles();
	return (
		<svg
			className={`svg-inline--fa fa-times fa-w-16 ${className} ${classes.iconSize}`}
			aria-hidden="true"
			focusable="false"
			data-prefix="far"
			data-icon="times"
			role="img"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 512 512"
			{...rest}
		>
			<path
				fill="currentColor"
				d="M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z"
			/>
		</svg>
	);
};
FaTimes.propTypes = {
	className : PropTypes.string,
};

FaTimes.defaultProps = {
	className : "",
};

export default FaTimes;
