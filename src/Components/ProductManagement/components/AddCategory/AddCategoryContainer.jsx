/* eslint-disable react-hooks/exhaustive-deps */
import {
	useState,
	useEffect,
	useCallback,
} from "react";
import PropTypes   from "prop-types";
import { connect } from "react-redux";

// Import Own Components
import Service         from "~/Service";
import { bindAll }     from "~/Util";
import AlertActions    from "~/Components/Alert/store/actions";
import CategoryActions from "~/Store/CategoryStore/actions";
import AddCategory     from "./AddCategory.jsx";

const AddCategoryContainer = ({
	setActions,
	done,
	disable,
	alertActions,
	categoryActions,
}) => {
	const [inputData, setInputData] = useState("");

	const handleChange = useCallback(({ target : { value } }) => setInputData(value), []);

	const handleSubmit = useCallback(() => {
		if (inputData) {
			disable(true);

			(async () => {
				const success = await Service.api.createCategory(inputData);
				const category = {
					id   : success.id,
					name : inputData,
				};
				categoryActions.setCategory(category);
				if (success) {
					alertActions.openAlert({
						message  : `¡Se agregó la categoría "${inputData}"!`,
						type     : "success",
						duration : 4e3,
					});
				} else {
					alertActions.openAlert({
						message  : "No se ha podido agregar la categoría, verifica que en verdad no existe.",
						type     : "error",
						duration : 4e3,
					});
				}
				done();
			})();
		}
	}, [inputData, disable, done]);

	useEffect(() => {
		setActions({
			okClick : handleSubmit,
		});
	}, [handleSubmit]);

	return (
		<AddCategory
			inputData={inputData}
			handleChange={handleChange}
		/>
	);
};

AddCategoryContainer.propTypes = {
	setActions      : PropTypes.func.isRequired,
	done            : PropTypes.func.isRequired,
	disable         : PropTypes.func.isRequired,
	alertActions    : PropTypes.object.isRequired,
	categoryActions : PropTypes.object.isRequired,
};

const mapDispatchToProps = bindAll({ AlertActions, CategoryActions });

export default connect(null, mapDispatchToProps)(AddCategoryContainer);
