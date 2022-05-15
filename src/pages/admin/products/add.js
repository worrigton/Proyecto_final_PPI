// Import Own Components
import AdminLayout       from "~/Components/Admin/AdminLayout";
import ProductManagement from "~/Components/ProductManagement";
import { useRedirectTo } from "~/Util/Hooks";

const AddProduct = () => {
	const redirectTo = useRedirectTo();

	return (
		<AdminLayout>
			<ProductManagement
				mode="create"
				onSuccess={redirectTo("/admin/products")}
				onFail={redirectTo("/admin/products")}
				backButton={{
					prefetch   : true,
					redirectTo : "/admin/products",
					text       : "Buscar producto",
					title      : "Agregar producto",
				}}
			/>
		</AdminLayout>
	);
};

export default AddProduct;
