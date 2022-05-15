/* eslint-disable max-len */
/* eslint-disable camelcase */
import { useCallback } from "react";
import { useRouter }   from "next/router";

// Import Own Components
import AlertActions         from "~/Components/Alert/store/actions";
import { fetcher, bindAll } from "~/Util";

import Omit                 from "~/Util/types/Omit";
import withStateLoaded      from "~/Store/withStateLoaded";
import VariantsCell, {
	Props as PropsVariantsCell
} from "./VariantsCell";
import Product from "../../AdminPendingApprovals/components/Product/Product";


const createUpdateVariants = (token, product_id, provider_id) => async ({
	price,
	status,
	flags,
}) => {
	const requestOptions = {
		method  : "PATCH",
		headers : {
			Authorization : `Bearer ${token}`,
		},
		body : JSON.stringify({
			product_id,
			provider_id,
			price  : price || undefined,
			status : status || undefined,
			flags  : flags || undefined,
		}),
	};

	return fetcher(`/api/providers/products/${provider_id}/edit`, requestOptions);
};

const handleStatus = async (product, providerId, token, alertActions, router) => {
	const updateVariantFn = createUpdateVariants(token, product.id, providerId);

	const success = await updateVariantFn({
		...product,
		status : product.status === "ACTIVE" ? "INACTIVE" : "ACTIVE",
	});

	if (success) {
		alertActions.openAlert({
			message  : "Se actualizaron los datos correctamente.",
			duration : 3e3,
			type     : "success",
		});
	} else {
		alertActions.openAlert({
			message  : "Ocurrió un error al querer actualizar la información.",
			duration : 3e3,
			type     : "error",
		});
	}

	router.reload();
};

const handleDelete = async (product, providerId, token, alertActions, router) => {
	const updateVariantFn = createUpdateVariants(token, product.id, providerId);

	const success = await updateVariantFn({
		...product,
		status : "DELETE",
	});

	if (success) {
		alertActions.openAlert({
			message  : "Se actualizaron los datos correctamente.",
			duration : 3e3,
			type     : "success",
		});
	} else {
		alertActions.openAlert({
			message  : "Ocurrió un error al querer actualizar la información.",
			duration : 3e3,
			type     : "error",
		});
	}

	router.reload();
};

interface Props {
	token            : string;
	alertActions     : any;
	providerId       : any;
	products        ?: any;
};

const VariantsCellContainer: React.FC<Props> = ({
	providerId,
	token,
	alertActions,
	products,
	...rest
}) => {
	const router = useRouter();

	const handleStatusMethod = useCallback(product => handleStatus(product, providerId, token, alertActions, router), [token, alertActions]);
	const handleDeleteMethod = useCallback(product => handleDelete(product, providerId, token, alertActions, router), [token, alertActions]);
	return (
		<VariantsCell
			delegations={{
				handleStatus : handleStatusMethod,
				handleDelete : handleDeleteMethod,
			}}
			providerId = {providerId}
			products   = {products}
			productId  = {products[0].product_details_id}
			{...rest}
		/>
	);
};

const mapDispatchToProps = bindAll({ AlertActions });

export default withStateLoaded<Omit<PropsVariantsCell, "delegations">>(null, mapDispatchToProps)(VariantsCellContainer);
