import { useCallback } from "react";
import { useRouter }   from "next/router";
import PropTypes       from "prop-types";
import Zoom            from "react-reveal/Zoom";
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
import useStyles from "./styles";

/** Component to find an image with title and information */
const CardProducts = ({
	id,
	image,
	price,
	label,
	nameProduct,
	variant,
	elevation,
	imageBorder,
	otherClass,
	height,
}) => {
	const classes    = useStyles();
	const router     = useRouter();

	const cardClick = useCallback(() => {
		id === 0 ? router.push("/proveedor/nuevo-producto")
			: router.push(`/productos/detalles/${id}`);
	}, [id, router],);


	return (
		<Clicker
			className={classes.root}
			onClick={cardClick}
		>
			<Card className={classes.cardProduct} variant={variant} elevation={elevation}>
				<Hidden smUp>
					<Zoom clear>
						<CardMedia
							component="img"
							image={image}
							height={150}
							className={
								`${classes.media}
								${imageBorder ? classes.imageBorder : ""}
								${otherClass ? classes.otherClass : ""}`
							}
							title={nameProduct}
						/>
					</Zoom>
				</Hidden>
				<Hidden xsDown>
					<Zoom clear>
						<CardMedia
							component="img"
							image={image}
							height={height || 250}
							className={
								`${classes.media}
								${imageBorder ? classes.imageBorder : ""}
								${otherClass ? classes.otherClass : ""}`
							}
							title={nameProduct}
						/>
					</Zoom>
				</Hidden>
				{!imageBorder ? <hr className={classes.hr} /> : ""}
				<CardContent className={classes.cardContent}>
					<Typography
						type="header4"
						color="dark"
						fontWeight="600"
						className={classes.productName}
					>
						{nameProduct}
					</Typography>
					{
						price > 0 &&
						<>
							<Typography
								type="caption"
								color="grey"
							>
								{label}
							</Typography>
							<Typography
								color="secondary"
								fontWeight="600"
								type="header4"
							>
								${price} /kg
							</Typography>
						</>
					}
				</CardContent>
			</Card>
		</Clicker>
	);
};

CardProducts.propTypes = {
	image       : PropTypes.string,
	nameProduct : PropTypes.string,
	price       : PropTypes.number,
	id          : PropTypes.number,
	label       : PropTypes.string,
	variant     : PropTypes.string,
	elevation   : PropTypes.number,
	imageBorder : PropTypes.bool,
	otherClass  : PropTypes.bool,
	height      : PropTypes.any,
};

CardProducts.defaultProps = {
	cardActions : <></>,
	nameProduct : "",
	label       : "Desde",
	variant     : "outlined",
	elevation   : 2,
	imageBorder : false,
	otherClass  : false,
};

export default CardProducts;
