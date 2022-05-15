/* eslint-disable no-console */
/* eslint-disable no-empty */
import PropTypes from "prop-types";


// Import own components
import { getProductDetails }   from "~/Server/controllers/products/product_controller";
import ProductDetailsContainer from "~/Components/Products/ProductDetails";
import CustomerLayout          from "~/Components/Customer/CustomerLayout";
import Error from "~/pages/_error";

const ProductDetails = ({ data }) => {
	if (!data) {
		return <Error statusCode={404} />;
	}
	return  (
		<CustomerLayout>
			<ProductDetailsContainer {...{ data }} />
		</CustomerLayout>
	);
};

export const getServerSideProps = async ({ query, res }) => {
	let data = [];
	try {
		data = await getProductDetails(query);
		return {
			props : {
				data : JSON.parse(JSON.stringify(data)),
			},
		};
	} catch (error) {
		res.statusCode = 404;
		return {
			props : {},
		};
	}
};

ProductDetails.propTypes = {
	data : PropTypes.object.isRequired,
};

export default ProductDetails;
