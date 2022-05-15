import { useState }         from "react";
import PropTypes            from "prop-types";
import { Grid, IconButton } from "@material-ui/core";
import Fade                 from "react-reveal/Fade";

// Import Own Components
import { FaChevronDown, FaChevronUp } from "~/Resources/icons/fal";
import {
	ButtonWithoutStyles as Clicker,
} from "~/ToolKit";

import defaultImage from "~/Resources/image_default.png";

import useStyles from "./styles";

const GalleryCarousel = ({ images }) => {
	const classes = useStyles();
	const [selected, setSelected] = useState(images[0].md);
	const [displayImages, setDisplayImages] = useState(images);

	const up = () => {
		setDisplayImages(prevImgs => [
			prevImgs[prevImgs.length - 1],
			...prevImgs.splice(0, prevImgs.length - 1),
		]);
	};

	const down = () => {
		setDisplayImages(prevImgs => [
			...prevImgs.splice(1, prevImgs.length),
			prevImgs[prevImgs.length - 1],
		]);
	};

	const setImage = (src) => {
		setSelected(src);
	};

	const addDefaultSrc = (ev) => {
		ev.target.src =  defaultImage ;
	};

	return (
		<Grid container className="carousel-container">
			<Grid
				container
				direction="column"
				item
				xs={3}
				justify="center"
				alignItems="center"
			>
				<Grid container justify="center">
					<IconButton className={classes.btnUp} onClick={up}>
						<FaChevronUp />
					</IconButton>
				</Grid>
				<Grid className={classes.imageGallery}>
					{ displayImages.length > 0 && displayImages.map(({ md }, i) => (
						<Grid
							key={`image-${i}`}
							item
							container
							justify="center"
						>
							<Clicker onClick={() => setImage(md)}>
								<Fade left>
									<div className={classes.thumbnails}>
										<img
											onError={addDefaultSrc}
											className={classes.thumbnailImage}
											src={md}
											alt={`image${md}`} />
									</div>
								</Fade>
							</Clicker>
						</Grid>
					)) }
				</Grid>
				<Grid container justify="center">
					<IconButton onClick={down}><FaChevronDown /></IconButton>
				</Grid>
			</Grid>
			<Grid
				container
				alignItems="center"
				className={classes.selectedImage}
				item
				xs={9}
			>
				<div className={classes.boxImg}>
					<Fade down>
						{
							selected &&
								(<img onError={addDefaultSrc} className={classes.mainImage} src={selected} alt="" />)
						}
					</Fade>
				</div>
			</Grid>
			<style jsx global>{`
				.carousel-container > .MuiIconButton-root {
					height : 3rem;
					width  : 3rem;
				}
				.carousel-container > svg {
					width : 1rem !important;
				}
				.carousel-container > .MuiIconButton-root:hover {
					background-color: rgba(0, 0, 0, 0.04);
					height : 3rem;
					width  : 3rem;
				}
			`}</style>
		</Grid>
	  );
};


GalleryCarousel.propTypes = {
	images : PropTypes.array.isRequired,
};

GalleryCarousel.defaultProps = {
	images : [],
};

export default GalleryCarousel;
