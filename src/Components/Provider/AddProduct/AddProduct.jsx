// Import Own Components
import PrivateProviderRoute from "~/Components/Provider/PrivateProviderRoute";
import ProviderLayout       from "~/Components/Provider/ProviderLayout";
import ProductManagement    from "~/Components/ProductManagement";
import { useRedirectTo }    from "~/Util/Hooks";
import useStyles            from "./styles";

const AddProduct = () => {
	const classes    = useStyles();
	const redirectTo = useRedirectTo();

	return (
		<PrivateProviderRoute>
			<ProviderLayout>
				<div className={classes.root}>
					<ProductManagement
						type="provider"
						mode="create"
						onSuccess={redirectTo("/proveedor/nuevo-producto?status=pending_revision")}
						onFail={redirectTo("/proveedor/nuevo-producto")}
						backButton={{
							prefetch   : true,
							redirectTo : "/proveedor/nuevo-producto",
							text       : "Buscar producto",
							title      : "Agregar producto",
						}}
					/>
				</div>
			</ProviderLayout>
		</PrivateProviderRoute>
	);
};

export default AddProduct;
