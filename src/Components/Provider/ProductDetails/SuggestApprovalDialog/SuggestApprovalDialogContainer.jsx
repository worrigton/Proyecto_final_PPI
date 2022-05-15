/* eslint-disable camelcase */
/* eslint-disable react-hooks/exhaustive-deps */
import {
	useMemo,
	useState,
	useCallback,
	useEffect,
} from "react";
import PropTypes    from "prop-types";
import { connect }  from "react-redux";
import { useRouter } from "next/router";

// Import Own Components
import AlertActions from "~/Components/Alert/store/actions";
import Service      from "~/Service";
import {
	bindAll,
	Base64,
	uploadFile,
	isValidArray,
} from "~/Util";
import { useInputState }     from "~/Util/Hooks";
import SuggestApprovalDialog from "./SuggestApprovalDialog.jsx";

const SuggestApprovalDialogContainer = ({
	setActions,
	done,
	disable,
	alertActions,
	userId,
	productData,
}) => {
	const router = useRouter();

	const [name, handleNameChange]               = useInputState(productData?.name || "");
	const [description, handleDescriptionChange] = useInputState(productData?.description || "");

	const [selectedCategory, setSelectedCategory] = useState(productData?.currentCategory || {});

	const [images, setImages] = useState(productData?.images || []);

	const handleSubmit = useCallback(() => {
		disable(true);

		const isValidStr = str => str && typeof str === "string";

		const validations = [
			{
				data       : name,
				validation : data => isValidStr(data),
				identifier : "el nombre",
			},
			{
				data       : description,
				validation : data => isValidStr(data),
				identifier : "la descripción",
			},
			{
				data       : selectedCategory,
				validation : data => (data && "id" in data && "name" in data),
				identifier : "la categoría",
			},
		];

		for (const { data, validation, identifier } of validations) {
			if (!validation(data)) {
				alertActions.openAlert({
					message  : `Necesitas agregar ${identifier}.`,
					type     : "error",
					duration : 4000,
				});
			}
		}

		if (!isValidArray(images)) {
			alertActions.openAlert({
				message  : "Necesitas agregar almenos una imagen",
				type     : "error",
				duration : 4000,
			});
		}

		const { productId, providerId } = productData;

		const generalError = () => {
			alertActions.openAlert({
				message  : "¡No se ha realizado la sugerencia! Verifica que tengas una sesión iniciada.",
				type     : "error",
				duration : 4000,
			});
		};

		if (typeof productId === "undefined" || typeof providerId === "undefined") {
			generalError();
			done();
			return;
		}

		// Normalization of the data
		const submittingData = {
			name,
			description,
			user_id            : userId,
			product_details_id : productId,
		};

		submittingData["category_id"] = selectedCategory.id;

		const newImages = [];
		const oldIds    = [];

		for (const { original, xs } of images) {
			if (isValidStr(original)) {
				const [ id ]          = original.split("/").slice(-1);
				const hasInvalidChars = Boolean(id.match(/[^0-9]/gi));

				if (hasInvalidChars) {
					generalError();
					done();

					return;
				} else {
					oldIds.push(parseInt(id));
				}
			} else {
				newImages.push(xs);
			}
		}

		submittingData["features"]  = productData?.features?.reduce((acc, { id, label }) => ({
			...acc,
			[id] : label,
		}), {});

		submittingData["images"]    = newImages;
		submittingData["image_ids"] = oldIds;

		(async () => {
			const success = await Service.api.provider.suggestChange(submittingData);

			if (success) {
				alertActions.openAlert({
					message  : "¡El cambio se ha añadido con éxito!",
					type     : "success",
					duration : 4e3,
				});

				router.push("/proveedor/nuevo-producto?status=pending_revision");

				return;
			} else {
				generalError();
			}

			done();
		})();
	}, [
		router,
		disable,
		done,
		name,
		description,
		selectedCategory,
		images,
		productData,
		alertActions,
	]);

	useEffect(() => {
		setActions({
			okClick : handleSubmit,
		});
	}, [handleSubmit]);

	const handleUploadFile = useMemo(() => uploadFile(selectedFile => {
		if (!selectedFile) {
			alertActions.openAlert({
				message  : "Tienes que agregar una imagen",
				type     : "warning",
				duration : 3000,
			});

			return;
		}

		if (images.length > 5) {
			alertActions.openAlert({
				message  : "¡Solo se pueden subir 5 imágenes!",
				type     : "warning",
				duration : 3000,
			});

			return;
		}

		Base64.imageToBase64(selectedFile, imageInBase64 => {
			setImages(prevState => [
				...prevState,
				{ xs : imageInBase64 },
			]);
		});
	}), [alertActions, images]);

	const deleteImage = useCallback((position) => {
		if (Array.isArray(images) && images.length > position) {
			const newImages = [...images];

			newImages.splice(position, 1);

			setImages(newImages);
		}
	}, [images]);

	const handleSelection = useCallback((option) => {
		const {
			id,
			name,
		} = (option || {});

		if (typeof id !== "undefined", name) {
			setSelectedCategory({ id, name });
		}
	}, []);

	return (
		<SuggestApprovalDialog
			delegations={{
				name,
				handleNameChange,

				description,
				handleDescriptionChange,

				selectedCategory : selectedCategory?.name || "",
				handleSelection,

				images,
				uploadFile : handleUploadFile,
				deleteImage,
			}}
		/>
	);
};

SuggestApprovalDialogContainer.propTypes = {
	productData   : PropTypes.object.isRequired,
	setActions    : PropTypes.func.isRequired,
	done          : PropTypes.func.isRequired,
	disable       : PropTypes.func.isRequired,
	alertActions  : PropTypes.object.isRequired,
	dialogActions : PropTypes.object.isRequired,
	userId        : PropTypes.string.isRequired,
};

const mapStateToProps    = ({
	dialogReducer,
	userReducer : { provider },
}) => ({
	productData : dialogReducer?.productData,
	userId      : provider?.data?.id,
});
const mapDispatchToProps = bindAll({ AlertActions });

export default connect(mapStateToProps, mapDispatchToProps)(SuggestApprovalDialogContainer);
