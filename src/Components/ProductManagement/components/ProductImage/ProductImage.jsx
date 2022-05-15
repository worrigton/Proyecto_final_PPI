import PropTypes      from "prop-types";
import { Zoom }       from "react-reveal";
import { IconButton } from "@material-ui/core";

// Import Own Components
import { FaTrash } from "~/Resources/icons/fas";
import useStyles   from "./styles";

const ProductImage = ({
	src,
	size,
	className,
	deleteImage,
}) => {
	const classes = useStyles(size);

	return (
		<div className={`${classes.root} ${className}`}>
			<IconButton onClick={deleteImage}>
				<FaTrash />
			</IconButton>
			<Zoom>
				<img src={src} />
			</Zoom>
		</div>
	);
};

ProductImage.propTypes = {
	src         : PropTypes.any.isRequired,
	size        : PropTypes.number,
	className   : PropTypes.string,
	deleteImage : PropTypes.func.isRequired,
};

ProductImage.defaultProps = {
	size      : 1,
	className : "",
};

export default ProductImage;
