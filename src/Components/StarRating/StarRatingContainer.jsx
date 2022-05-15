/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from "react";
import PropTypes   from "prop-types";

// Import Own Components
import { FaStar as HalfStar }     from "~/Resources/icons/fal";
import { FaStar as FullStar }     from "~/Resources/icons/fas";
import { FaStar as OutlinedStar } from "~/Resources/icons/far";
import StarRating                 from "./StarRating.jsx";

const StarRatingContainer = ({ rank, ...rest }) => {
	const starsToRender = useMemo(() => {
		rank = typeof rank !== "number" ? 0 : rank > 10 ? 10 : rank < 0 ? 0 : rank;

		const numberOfFullStars = Math.floor(rank / 2);
		const hasHalfStar       = rank % 2 !== 0;

		const arrayOfLen = len => Array.from({ length : len });

		return [
			...arrayOfLen(numberOfFullStars).fill(FullStar),
			...arrayOfLen(Number(hasHalfStar)).fill(HalfStar),
			...arrayOfLen(5 - (numberOfFullStars + hasHalfStar)).fill(OutlinedStar),
		];
	}, [rank]);


	return (
		<StarRating
			delegations={{
				starsToRender,
			}}
			{...rest}
		/>
	);
};

StarRatingContainer.propTypes = {
	rank : PropTypes.number,
};

StarRatingContainer.defaultProps = {
	rank : 0,
};

export default StarRatingContainer;
