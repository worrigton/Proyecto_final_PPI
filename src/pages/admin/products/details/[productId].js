/* eslint-disable no-empty */
import PropTypes from "prop-types";

// Import own components
import { getProductDetails }   from "~/Server/controllers/products/product_controller";
import AdminLayout             from "~/Components/Admin/AdminLayout/AdminLayout";
// import ProductDetailsContainer from "~/Components/Admin/ProductDetails";
import ProductDetailsContainer from "~/Components/Products/ProductDetails";


const ProductDetails = ({ data }) => (
	<AdminLayout>
		<ProductDetailsContainer {...{ data }} adminLayout={true} />
	</AdminLayout>
);

export const getServerSideProps = async ({ query }) => {
	let data = [];

	try {
		data = await getProductDetails({
			id : query.productId,
		});
	} catch (error) {
	}

	return {
		props : {
			data : JSON.parse(JSON.stringify(data)),
		},
	};
};

ProductDetails.propTypes = {
	data : PropTypes.object.isRequired,
};

export default ProductDetails;
