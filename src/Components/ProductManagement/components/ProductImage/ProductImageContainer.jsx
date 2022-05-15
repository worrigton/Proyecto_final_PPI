/* eslint-disable react-hooks/exhaustive-deps */
import {
	useContext,
	useCallback,
} from "react";
import PropTypes from "prop-types";

// Import Own Components
import ProductManagementContext from "~/Components/ProductManagement/context";
import ProductImage             from "./ProductImage.jsx";


const ProductImageContainer = ({ position, ...rest }) => {
	const {
		setData,
		handleChange,
	} = useContext(ProductManagementContext);

	const deleteImage = (position, setData) => {
		handleChange();
		setData(({ images = [], ...prevState }) => {
			const newImages = [...images];

			newImages.splice(position, 1);

			return {
				...prevState,
				images : newImages,
			};
		});
	};

	const deleteImageMethod = useCallback(() => deleteImage(position, setData), [position]);

	return (
		<ProductImage
			deleteImage={deleteImageMethod}
			{...rest}
		/>
	);
};

ProductImageContainer.propTypes = {
	position : PropTypes.number.isRequired,
};

export default ProductImageContainer;
