/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */
/* eslint-disable camelcase */
import {
	useEffect,
	useCallback,
	useMemo,
	useRef,
} from "react";
import { useRouter } from "next/router";

// Import Own Components
import withStateLoaded from "~/Store/withStateLoaded";
import AlertActions    from "~/Components/Alert/store/actions";
import { bindAll }     from "~/Util";
import {
	fetcher,
	isValidArray,
} from "~/Util";

// Import Own Components
import Products from "./Products.jsx";

interface Props {
	employeeToken ?: string;
	token          : string;
	providerId    ?: any;
	alertActions   : any;
};

const ProductsContainer : React.FC<Props> = ({
	employeeToken,
	token,
	alertActions,
	providerId,
	...rest
}) => {
	const userIdRef = useRef<number | null>(null);
	const router    = useRouter();

	const goToAddProduct = useCallback(() => router.push("/admin/products/add"), [router]);

	useEffect(() => {
		router.prefetch("/admin/products/add");
	}, []);

	const changeVariousItems = async (optionsMap, type, providerId, token, alertActions, userIdRef, router) => {
		const productsIds        = [];
		const productsDetailsIds = [];
		// Get ids to update
		if (type === "LIKED") {
			for (const key of optionsMap.keys()) {
				productsDetailsIds.push(key);
			}
		} else {
			optionsMap.forEach(product => {
				console.log(product);
				typeof product.id === "number" && productsIds.push(product.id)
			})
		}
		
		interface IdsToSend {
			products_ids        ?: Array<number>;
			user_id             ?: number;
			product_details_ids ?: Array<number>;
		}
		
		const idsToSend: IdsToSend = {};
		
		if (isValidArray(productsIds)) {
			idsToSend.products_ids = productsIds;
		} else if (isValidArray(productsDetailsIds)) {
			idsToSend.user_id             = userIdRef?.current;
			idsToSend.product_details_ids = productsDetailsIds;
		} else {
			// Nothing to update
			return;
		}
	

		const requestOptions = {
			method  : "PATCH",
			headers : {
				Authorization : `Bearer ${token}`,
			},
			body : JSON.stringify({
				provider_id : providerId,
				action      : type,
				...idsToSend,
			}),
		};

		const success = await fetcher(`/api/providers/products/${providerId}/edit_batch_products`, requestOptions);

		if (success) {
			alertActions.openAlert({
				message  : "¡Se actualizó la información correctamente!",
				type     : "success",
				duration : 4e3,
			});
		} else {
			alertActions.openAlert({
				message  : "Ocurrió un error al querer actualizar la información.",
				type     : "error",
				duration : 4e3,
			});
		}
		// router.reload();
	};

	const createHandler = useCallback(type => optionsMap => changeVariousItems(optionsMap, type, providerId, token, alertActions, userIdRef, router), [
		token,
		alertActions,
	]);

	const handleLikeMethod   = useMemo(() => createHandler("LIKED"), [createHandler]);
	const handlePauseMethod  = useMemo(() => createHandler("PAUSED"), [createHandler]);
	const handleDeleteMethod = useMemo(() => createHandler("DELETED"), [createHandler]);

	return (
		<Products
		delegations={{
			goToAddProduct,
			// @ts-ignore
			handleLike   : handleLikeMethod,
			handlePause  : handlePauseMethod,
			handleDelete : handleDeleteMethod,
			}}
			{...rest}
		/>
	);
};

const mapStateToProps = ({ userReducer : { admin } }) => ({
	token : admin?.token || null,
});

const mapDispatchToProps = bindAll({
	AlertActions,
});

export default withStateLoaded(mapStateToProps, mapDispatchToProps)(ProductsContainer);