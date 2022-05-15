import PropTypes from "prop-types";

// Import Own Components
import { FaCheckCircle } from "~/Resources/icons/fal";
import { FaCircle }      from "~/Resources/icons/far";
import useStyles         from "./styles";

const Span = ({
	type,
	text,
	icon,
	iconColor,
	className,
}) => {
	const classes = useStyles({ type, iconColor });

	return (
		<div>
			<div className={`${classes.span} ${className}`}>
				{ {
					"circle" : <FaCircle className={`${classes.icon} ${className}`} />,
					"check"  : <FaCheckCircle className={classes.icon} />,
					null     : <></>,
				}[icon]}
				<span>{text}</span>
			</div>
		</div>
	);
};

Span.propTypes = {
	type      : PropTypes.string.isRequired,
	text      : PropTypes.string,
	icon      : PropTypes.string,
	iconColor : PropTypes.string,
	className : PropTypes.any,
};

Span.defaultProps = {
	type      : "default",
	iconColor : "default",
	icon      : null,
};

export default Span;
