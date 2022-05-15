/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
import {
	useMemo,
	useContext,
} from "react";
import PropTypes   from "prop-types";
import { connect } from "react-redux";

// Import Own Components
import AlertActions             from "~/Components/Alert/store/actions";
import ProductManagementContext from "~/Components/ProductManagement/context";
import {
	Base64,
	bindAll,
	uploadFile,
} from "~/Util";
import AddImage from "./AddImage.jsx";

const AddImageContainer = ({ alertActions, ...rest }) => {
	const {
		data : { images },
		setData,
		handleChange,
	} = useContext(ProductManagementContext);

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
		handleChange();
		Base64.imageToBase64(selectedFile, imageInBase64 => {
			setData(prevState => ({
				...prevState,
				images : [
					...images,
					{ src : imageInBase64 },
				],
			}));
		});
	}), [alertActions, images]);

	return (
		<AddImage
			uploadFile={handleUploadFile}
			{...rest}
		/>
	);
};

AddImageContainer.propTypes = {
	alertActions : PropTypes.object.isRequired,
};

const mapDispatchToProps = bindAll({ AlertActions });

export default connect(null, mapDispatchToProps)(AddImageContainer);
