import {
	useState,
	useEffect,
} from "react";
import PropTypes     from "prop-types";
import { useRouter } from "next/router";

// Import Own Components
import AlertActions      from "~/Components/Alert/store/actions";
import Service           from "~/Service";
import AdminLayout       from "~/Components/Admin/AdminLayout";
import ProductManagement from "~/Components/ProductManagement";
import { bindAll }       from "~/Util";
import { useRedirectTo } from "~/Util/Hooks";
import withStateLoaded   from "~/Store/withStateLoaded";

const ApproveProduct = ({ token, alertActions }) => {
	const router     = useRouter();
	const redirectTo = useRedirectTo();

	const [data, setData] = useState({});

	useEffect(() => {
		const id = router?.query?.id;

		if (id) {
			(async () => {
				const response = await Service.api.admin.getProductData({ token, id });

				if (response) {
					setData(response);
				} else {
					alertActions.openAlert({
						message  : "Ocurrió un error al pedir la información.",
						duration : 3e3,
						type     : "error",
					});
					router.back();
				}
			})();
		}
	}, [router, alertActions, token]);

	return (
		<AdminLayout>
			<ProductManagement
				mode="edit"
				redirectTo="/admin/products"
				backButton={{
					redirectTo : "/admin",
					text       : "Aprobaciones",
					title      : "Aprobar producto",
				}}
				initialData={data}
				onSuccess={redirectTo("/admin")}
				onFail={redirectTo("/admin")}
			/>
		</AdminLayout>
	);
};

ApproveProduct.propTypes = {
	token        : PropTypes.string,
	alertActions : PropTypes.object.isRequired,
};

ApproveProduct.defaultProps = {
	token : "",
};

const mapStateToProps    = ({ userReducer : { admin } }) => ({ token : admin?.token });
const mapDispatchToProps = bindAll({ AlertActions });

export default withStateLoaded(mapStateToProps, mapDispatchToProps)(ApproveProduct);
