/* eslint-disable no-empty */
import PropTypes from "prop-types";

// Import Own Components
import { getProductDetails } from "~/Server/controllers/products/product_controller";
import AdminLayout           from "~/Components/Admin/AdminLayout";
import ProductManagement     from "~/Components/ProductManagement";
import { useRedirectTo }     from "~/Util/Hooks";

const EditProduct = ({ data, productId }) => {
	const redirectTo = useRedirectTo();

	return (
		<AdminLayout>
			<ProductManagement
				mode="edit"
				onSuccess={redirectTo("/admin/products")}
				onFail={redirectTo("/admin/products")}
				backButton={{
					prefetch   : true,
					redirectTo : `/admin/products/details/${productId}`,
					text       : "Detalle del producto",
					title      : "Editar producto",
				}}
				initialData={data}
			/>
		</AdminLayout>
	);
};

EditProduct.propTypes = {
	data      : PropTypes.object.isRequired,
	productId : PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

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
			data      : JSON.parse(JSON.stringify(data)),
			productId : query.productId,
		},
	};
};

export default EditProduct;
