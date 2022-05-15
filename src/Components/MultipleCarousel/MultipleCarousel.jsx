import { useMemo } from "react";
import PropTypes   from "prop-types";
import Carousel    from "react-multi-carousel";

// Import Own Components
import Styles from "./styles";

const MultipleCarousel = ({ children, settingsProps, responsiveProps }) => {
	const settings = useMemo(() => settingsProps || ({
		swipeable               : true,
		draggable               : true,
		showDots                : false,
		ssr                     : true,
		infinite                : false,
		autoPlaySpeed           : 600,
		keyBoardControl         : true,
		customTransition        : "all .5",
		transitionDuration      : 500,
		removeArrowOnDeviceType : ["desktop"],
		containerClass          : "carousel-container",
		itemClass               : "carousel-item-padding-40-px",
	}), [settingsProps]);

	const responsive = useMemo(() => responsiveProps || ({
		desktop : {
			breakpoint    : { max : 3000, min : 960 },
			items         : 3,
			slidesToSlide : 3, // optional, default to 1.
		},
		tablet : {
			breakpoint : { max : 960, min : 600 },
			items      : 2,
		},
		mobile : {
			breakpoint : { max : 600, min : 0 },
			items      : 1,
		},
	}), [responsiveProps]);

	return (
		<>
			<Carousel
				responsive={responsive}
				{...settings}
			>
				{children}
			</Carousel>
			<Styles />
		</>
	);
};

MultipleCarousel.propTypes = {
	children        : PropTypes.oneOfType([PropTypes.array, PropTypes.element, PropTypes.node]),
	settingsProps   : PropTypes.object,
	responsiveProps : PropTypes.object,
};

MultipleCarousel.defaultProps = {
	children        : <></>,
	settingsProps   : null,
	responsiveProps : null,
};

export default MultipleCarousel;
