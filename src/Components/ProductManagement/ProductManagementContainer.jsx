/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
import {
	useMemo,
	useState,
	useEffect,
	useCallback,
} from "react";
import PropTypes     from "prop-types";
import { connect }   from "react-redux";
import { useRouter } from "next/router";

// Import Own Components
import AlertActions                   from "~/Components/Alert/store/actions";
import Service                        from "~/Service";
import ProductManagementContext       from "./context";
import ProductManagement              from "./ProductManagement.jsx";
import {
	getSubObjWithKeys,
	bindAll,
	userId } from "~/Util";

const normalizeDataFromBack = (dataToNormalize, setData) => {
	if (typeof dataToNormalize === "object" && !Array.isArray(dataToNormalize)) {
		const extractedData = getSubObjWithKeys(dataToNormalize, [
			"name",
			"description",
			"category",
			"category_id",
			"features",
			"images_ids",
			"id",
			"status",
			"products",
			"product_details_id",
		]);
		const normalizedData = {
			id               : extractedData?.id,
			productDetailsId : extractedData?.product_details_id || null,
			name             : extractedData?.name || "",
			description      : extractedData?.description || "",
			features         : extractedData?.features || [],
			images           : extractedData?.images_ids?.map(id => ({
				id,
				original : true,
				src      : `/api/images/products/sm/${id}`,
			})),
			category : {
				id   : extractedData?.category_id,
				name : extractedData?.category,
			},
			status : extractedData?.status,
		};
		setData(prevData => ({
			...prevData,
			...normalizedData,
		}));
	}
};

const handleSubmit = async (setDesactivated, data, mode, alertActions, onSuccess, onFail, type) => {
	setDesactivated(true);
	const newImages = [];
	const oldIds    = [];

	for (const { original, src, id } of data.images) {
		if (original) {
			oldIds.push(id);
		} else {
			newImages.push(src);
		}
	}

	const submittingData = {
		user_id     : userId(type),
		name        : data.name,
		description : data.description,
		category_id : data.category.id,
		images      : newImages,
		image_ids   : oldIds,
		features    : data.features.reduce((acc, { id, label }) => ({
			...acc,
			[id] : label,
		}), {}),
		type,
	};

	const logWarning = message => {
		alertActions.openAlert({
			message,
			type     : "warning",
			duration : 2000,
		});

		setDesactivated(false);
	};

	if (!submittingData.name) {
		return logWarning("Necesitas agregar un nombre para el producto.");
	}

	if (!submittingData.description) {
		return logWarning("Necesitas agregar la descripción del producto");
	}

	if (typeof submittingData.category_id !== "number") {
		return logWarning("Selecciona una categoría.");
	}

	if ((submittingData?.image_ids?.length + submittingData?.images?.length) <= 0) {
		return logWarning("Tienes que agregar al menos una imagen para el producto.");
	}

	if (Object.keys(submittingData.features).length <= 0) {
		return logWarning("Selecciona un rasgo para el producto.");
	}
	const success = await Service.api.productManagement({
		...submittingData,
		product_details_id : data?.productDetailsId || undefined,
	}, mode) || false;

	if (success) {
		alertActions.openAlert({
			message  : "¡El producto se agregó con éxito!",
			type     : "success",
			duration : 3e3,
		});

		onSuccess();
	} else {
		alertActions.openAlert({
			message  : "Ocurrió un error al subir el producto.",
			type     : "error",
			duration : 3e3,
		});

		onFail();
	}
};



const handleChange = (prop, value = "", setChanged, setData) => {
	setChanged(true);

	setData(prevState => ({
		...prevState,
		[prop] : value,
	}));
};

const ProductManagementContainer = ({
	type,
	initialData,
	mode,
	alertActions,
	onSuccess,
	onFail,
	...rest
}) => {
	const router  = useRouter();
	const isAdmin = useMemo(() => router.pathname.includes("/admin/"), [router]);

	const [changed, setChanged]           = useState(false);
	const [desactivated, setDesactivated] = useState(false);

	const [data, setData] = useState({
		name        : "",
		description : "",
		features    : [],
		images      : [],
		category    : {
			id   : null,
			name : "",
		},
	});

	useEffect(() => {
		normalizeDataFromBack(initialData, setData);
	}, [initialData]);

	const handleSubmitMethod = useCallback(() => handleSubmit(setDesactivated, data, mode, alertActions, onSuccess, onFail, type), [
		data,
		alertActions,
		mode,
		onSuccess,
		onFail,
		type,
	]);

	const handleChangeMethod = useCallback((prop, value) => handleChange(prop, value, setChanged, setData), []);

	const handleReject = async () => {
		const success = await Service.api.rejectProduct(data.id);
		if (success) {
			alertActions.openAlert({
				message  : "¡El producto se ha rechazado con éxito!",
				type     : "success",
				duration : 3e3,
			});
			onSuccess();
		} else {
			alertActions.openAlert({
				message  : "Ocurrió un error al rechazar el producto.",
				type     : "error",
				duration : 3e3,
			});
			onFail();
		}
	};

	const handleApprove = async () => {
		const success = await Service.api.aproveProduct(data.id);
		if (success) {
			alertActions.openAlert({
				message  : "¡El producto ha sido aprobado con éxito!",
				type     : "success",
				duration : 3e3,
			});
			onSuccess();
		} else {
			alertActions.openAlert({
				message  : "Ocurrió un error al aprobar el producto.",
				type     : "error",
				duration : 3e3,
			});
			onFail();
		}
	};

	return (
		<ProductManagementContext.Provider value={{
			data,
			isAdmin,
			setData,
			changed,
			desactivated,
			handleSubmit  : handleSubmitMethod,
			handleChange  : handleChangeMethod,
			handleReject  : handleReject,
			handleApprove : handleApprove,
		}}>
			<ProductManagement
				mode={mode}
				{...rest}
			/>
		</ProductManagementContext.Provider>
	);
};

ProductManagementContainer.propTypes = {
	initialData  : PropTypes.shape({}),
	mode         : PropTypes.oneOf(["edit", "create"]),
	alertActions : PropTypes.object.isRequired,
	onSuccess    : PropTypes.func,
	onFail       : PropTypes.func,
	type         : PropTypes.string,
};

ProductManagementContainer.defaultProps = {
	type      : "admin",
	mode      : "create",
	onSuccess : () => {},
	onFail    : () => {},
};

const mapStateToProps    = ({ userReducer : { admin } }) => ({ userId : admin?.data?.id });
const mapDispatchToProps = bindAll({ AlertActions });

export default connect(mapStateToProps, mapDispatchToProps)(ProductManagementContainer);
