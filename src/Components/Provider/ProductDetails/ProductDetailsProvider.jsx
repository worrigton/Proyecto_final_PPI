/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable prefer-const */
/* eslint-disable react-hooks/exhaustive-deps */
import {
	useState,
	useEffect,
	createContext,
	useCallback,
	useMemo,
} from "react";
import PropTypes from "prop-types";

// Import Own Components
import AlertActions from "~/Components/Alert/store/actions";
import Service      from "~/Service";
import {
	bindAll,
	isValidArray,
} from "~/Util";
import withStateLoaded from "~/Store/withStateLoaded";

export const ProductDetailsContext = createContext(null);

const requestInitialDataAndRedirectOnFail = async (providerId, productId, setData, alertActions, onFail, type) => {
	const response = await Service.api.provider.getProductDetails(providerId, productId, type);
	if (response) {
		setData(prevData => ({
			...prevData,
			...response,
		}));
	} else {
		alertActions.openAlert({
			message  : "Hubo un error al cargar los datos.",
			type     : "error",
			duration : 4000,
		});

		if (typeof onFail === "function") {
			onFail();
		}
	}
};

const handleSubmit = async (providerId, productId, token, data, alertActions, onSuccess, onFail) => {
	let {
		variants,
		products,
		profilesData,
	} = data;

	if (!isValidArray([...variants, ...products])) {
		alertActions.openAlert({
			message  : "Necesitas agregar al menos una variedad de producto.",
			type     : "warning",
			duration : 4e3,
		});
		return;
	}

	profilesData = profilesData.map(profile => Object.entries(profile).reduce((acc, [key, value]) => ({
		...acc,
		[key] : parseFloat(value || 0),
	}), {}));

	profilesData = profilesData.map(({ maxWeight, minWeight, discount }) => ({
		max_weight : parseFloat(maxWeight || 0),
		min_weight : parseFloat(minWeight || 0),
		discount   : parseFloat(discount || 0),
	}));

	variants = variants.map(({ freeze, quality, size, price }) => ({
		price   : parseFloat(price || 0),
		quality : (quality || ""),
		size    : (size || ""),
		...(freeze && {
			flags : "frezee",
		} || {}),
	}));

	const response = await Service.api.provider.configProduct({
		token              : token,
		product_details_id : productId,
		provider_id        : providerId,
		products           : variants,
		volumen_profiles   : profilesData,
	});

	if (response) {
		alertActions.openAlert({
			message  : "¡Se actualizó la información correctamente!",
			type     : "success",
			duration : 4e3,
		});

		if (typeof onSuccess === "function") {
			onSuccess();
		}
	} else {
		alertActions.openAlert({
			message  : "Hubo un error actualizando la información.",
			type     : "error",
			duration : 4e3,
		});

		if (typeof onFail === "function") {
			onFail();
		}
	}
};

const ProductDetailsProvider = ({
	type,
	onFail,
	onSuccess,
	children,
	productId,
	providerId,
	alertActions,
	employeeToken,
	providerToken,
}) => {
	const token  = useMemo(() => type === "provider" ? providerToken : employeeToken, [providerToken, employeeToken, type]);
	const [data, setData] = useState({
		description         : "",
		features            : [],
		images              : [],
		id                  : 0,
		name                : "",
		like                : false,
		remaining_varieties : {},
		variants            : [],
		profilesQuantity    : 1,
		profilesData        : [{
			minWeight : "0",
			maxWeight : "0",
			discount  : "0",
		}],
	});

	useEffect(() => {
		requestInitialDataAndRedirectOnFail(providerId, productId, setData, alertActions, onFail, type);
	}, []);

	const handleSubmitMethod = useCallback(() => {
		handleSubmit(providerId, productId, token, data, alertActions, onSuccess, onFail);
	}, [
		providerId,
		productId,
		token,
		data,
		alertActions,
		onSuccess,
		onFail,
	]);

	const [open, setOpen] = useState(false);

	const toggleDrawer = (open) => (event) => {
		if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
		  return;
		}
		setOpen(open);
	};

	return (
		<ProductDetailsContext.Provider value={{
			data,
			setData,
			productId,
			providerId,
			open,
			handleSubmit : handleSubmitMethod,
			toggleDrawer,
		}}>
			{children}
		</ProductDetailsContext.Provider>
	);
};

ProductDetailsProvider.propTypes = {
	type          : PropTypes.string.isRequired,
	onFail        : PropTypes.func,
	onSuccess     : PropTypes.func,
	alertActions  : PropTypes.object.isRequired,
	children      : PropTypes.any.isRequired,
	providerId    : PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	providerToken : PropTypes.string.isRequired,
	employeeToken : PropTypes.string.isRequired,
	productId     : PropTypes.number.isRequired,
};

const mapDispatchToProps = bindAll({ AlertActions });

const mapStateToProps = ({ userReducer : { provider, employee } }) => ({
	providerToken : provider?.token || "",
	employeeToken : employee?.token || "",
});

export default withStateLoaded(mapStateToProps, mapDispatchToProps)(ProductDetailsProvider);
