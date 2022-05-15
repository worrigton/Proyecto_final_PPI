/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable react-hooks/exhaustive-deps */
import {
	useRef,
	useMemo,
	useState,
	useEffect,
	useCallback,
} from "react";
import { useRouter } from "next/router";

// Import Own Components
import {
	fetcher,
	bindAll,
	isValidArray,
} from "~/Util";

import Omit            from "~/Util/types/Omit";
import AlertActions    from "~/Components/Alert/store/actions";
import withStateLoaded from "~/Store/withStateLoaded";

import ProductsOfProvider, {
	Props as ProductsOfProviderProps,
} from "./ProductsOfProvider";

const getProviderData = async (setProviderData, providerId, alertActions, userIdRef) => {
	const response = await fetcher(`/api/providers/details/${providerId}`);

	if (response) {
		setProviderData(response);

		userIdRef.current = response?.user?.id;
	} else {
		alertActions.openAlert({
			message  : "Ocurrió un error al pedir la información del proveedor.",
			type     : "error",
			duration : 4e3,
		});
	}
};

const changeVariousItems = async (optionsMap, type, providerId, token, alertActions, userIdRef, router) => {
	const productsIds        = [];
	const productsDetailsIds = [];

	// Get ids to update
	if (type === "LIKED") {
		for (const key of optionsMap.keys()) {
			productsDetailsIds.push(key);
		}
	} else {
		[...optionsMap.values()]
			.map(({ products }) => products || [])
			.flat()
			.forEach(product => typeof product.id === "number" && productsIds.push(product.id));
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

interface Props {
	employeeToken ?: string;
	token          : string;
	providerId    ?: any;
	alertActions   : any;
}

const ProductsOfProviderContainer: React.FC<Props> = ({
	employeeToken,
	token,
	alertActions,
	providerId,
	...rest
}) => {
	const userIdRef = useRef<number | null>(null);
	const router    = useRouter();
	const [providerData, setProviderData] = useState(null);
	const [id, setId] = useState(null);

	useEffect(() => {
		const { providerId : provider } = router.query;
		if (provider) {
			setId(provider);
		} else {
			setId(providerId);
		}
		if (providerId && !providerData) {
			getProviderData(setProviderData, providerId, alertActions, userIdRef);
		}
	}, [providerData, router]);
	const createHandler = useCallback(type => optionsMap => changeVariousItems(optionsMap, type, id, token, alertActions, userIdRef, router), [
		token,
		alertActions,
		id,
	]);
	const handleLikeMethod   = useMemo(() => createHandler("LIKED"), [createHandler]);
	const handlePauseMethod  = useMemo(() => createHandler("PAUSED"), [createHandler]);
	const handleDeleteMethod = useMemo(() => createHandler("DELETED"), [createHandler]);
	return id && (
		<ProductsOfProvider
			delegations={{
				handleLike   : handleLikeMethod,
				handlePause  : handlePauseMethod,
				handleDelete : handleDeleteMethod,
				providerId   : providerId,
				providerData,
				token,
			}}
			{...rest}
		/>
	);
};

const mapStateToProps = ({ userReducer }) => ({
	providerId : userReducer?.provider?.data?.provider.id,
});

const mapDispatchToProps = bindAll({ AlertActions });

export default withStateLoaded<Omit<ProductsOfProviderProps, "delegations">>(mapStateToProps, mapDispatchToProps)(ProductsOfProviderContainer);
