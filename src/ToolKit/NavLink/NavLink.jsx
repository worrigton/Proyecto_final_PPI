import PropTypes from "prop-types";
import Link      from "next/link";

// Import Own Components
import useStyles from "./styles";

const NavLink = ({
	href,
	name,
	color,
	hover,
	className,
	prefetch,
}) => {
	const classes = useStyles({ color, hover, className });

	return (
		<Link href={href} prefetch={prefetch}>
			<a className={`${classes.link} ${className}`}>
				{name}
			</a>
		</Link>
	);
};

NavLink.propTypes = {
	href  : PropTypes.string.isRequired,	// is the address to which you will be redirected
	name  : PropTypes.any,				    // the name of the address
	color : PropTypes.oneOf([
		"primary",
		"white",
		"secondary",
		"gray",
		"default",
	]),				                        // defines the color of the text
	hover     : PropTypes.string,			// define the text color in hover
	className : PropTypes.string,			// is a class defined in a parent component
	prefetch  : PropTypes.bool,
};

NavLink.defaultProps = {
	color    : "default",
	hover    : "default",
	prefetch : true,
};

export default NavLink;
