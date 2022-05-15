import PropTypes from "prop-types";

// Import Own Components
import useSyles from "./styles";

const StarRating = ({
	delegations : {
		starsToRender,
	},
	size,
	className,
}) => {
	const classes = useSyles();
	return (
		<div className={`${classes.starsContainer}  ${className}`}>
			{ starsToRender.map((Star, id) => (
				<Star
					key={id}
					style={{
						width  : `${size}em`,
						height : `${size * 1.5}em`,
					}}
				/>
			)) }
		</div>
	);
};

StarRating.propTypes = {
	delegations : PropTypes.shape({
		starsToRender : PropTypes.array,
	}).isRequired,
	size      : PropTypes.number,
	className : PropTypes.any,
};

StarRating.defaultProps = {
	size : 1,
};

export default StarRating;
