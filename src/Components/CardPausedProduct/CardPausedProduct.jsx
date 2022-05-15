import PropTypes from "prop-types";
import Zoom      from "react-reveal/Zoom";
import {
	Card,
	CardContent,
	CardMedia,
	Hidden,
} from "@material-ui/core";

// Import Own Components
import {
	Typography,
	ButtonWithoutStyles as Clicker,
} from "~/ToolKit";
import { FaPlayCircle } from "~/Resources/icons/fal";
import useStyles        from "./styles";

/** Component to find an image with title and information */
const CardPausedProduct = ({
	id,
	image,
	nameProduct,
	delegations : {
		setOpen,
		setProductAct,
		open,
	},
}) => {
	const classes = useStyles();

	return (
		<>
			<Clicker
				className={classes.root}
				onClick={() => {
					setOpen(true);
					setProductAct(id);
				}}
			>
				<Card variant="outlines" elevation="0">
					<Hidden smUp>
						<Zoom clear>
							<CardMedia
								component="img"
								image={image}
								height={150}
								className={classes.media}
								title={nameProduct}
							/>
						</Zoom>
					</Hidden>
					<Hidden xsDown>
						<Zoom clear>
							<div className={classes.mediaContainer}>
								<CardMedia
									component="img"
									image={image}
									height={250}
									className={classes.media}
									title={nameProduct}
								/>
								<div className={classes.hoverImage}>
									<FaPlayCircle />
								</div>
							</div>
						</Zoom>
					</Hidden>
					<CardContent className={classes.cardContent}>
						<Typography
							type="header4"
							color="dark"
							fontWeight="700"
						>
							{nameProduct}
						</Typography>
					</CardContent>
				</Card>
			</Clicker>
		</>
	);
};

CardPausedProduct.propTypes = {
	image       : PropTypes.string,
	nameProduct : PropTypes.string,
	id          : PropTypes.number,
	delegations : PropTypes.object,
};

CardPausedProduct.defaultProps = {
	cardActions : <></>,
	nameProduct : "",
};

export default CardPausedProduct;
