/* eslint-disable max-len */
import PropTypes from "prop-types";
import useStyles from "~/Resources/icons/styles";

const FaChevronLeft = ({ className, ...rest }) => {
	const classes = useStyles();
	return (
		<svg
			className={`svg-inline--fa fa-chevron-left fa-w-16 ${className} ${classes.iconSize}`}
			aria-hidden="true"
			focusable="false"
			data-prefix="fal"
			data-icon="chevron-left"
			role="img"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 512 512"
		>
			<path
				fill="currentColor"
				d="M238.475 475.535l7.071-7.07c4.686-4.686 4.686-12.284 0-16.971L50.053 256 245.546 60.506c4.686-4.686 4.686-12.284 0-16.971l-7.071-7.07c-4.686-4.686-12.284-4.686-16.97 0L10.454 247.515c-4.686 4.686-4.686 12.284 0 16.971l211.051 211.05c4.686 4.686 12.284 4.686 16.97-.001z" />
		</svg>
	);
};

FaChevronLeft.propTypes = {
	className : PropTypes.string,
};

FaChevronLeft.defaultProps = {
	className : "",
};

export default FaChevronLeft;
