/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable react-hooks/exhaustive-deps */
import {
	useCallback,
	useContext,
} from "react";
import PropTypes     from "prop-types";
import { connect }   from "react-redux";
import { useTheme }  from "@material-ui/core";

// Import Own Components
import DialogActions            from "~/Components/Dialog/store/actions";
import CategoryActions          from "~/Store/CategoryStore/actions";
import ProductManagementContext from "~/Components/ProductManagement/context";
import AddCategory              from "~/Components/ProductManagement/components/AddCategory";
import { bindAll }              from "~/Util";
import SelectCategory           from "./SelectCategory.jsx";

const handleSelection = (selectedOption, setData) => {
	if (selectedOption) {
		setData(prevData => ({
			...prevData,
			category : selectedOption,
		}));
	}
};

const handleDelete = setData => {
	setData(prevState => ({
		...prevState,
		category : {
			id   : null,
			name : "",
		},
	}));
};

const handleAddCategoryClick = (dialogActions, theme) => {
	dialogActions.openDialog({
		title   : "Agregar categoría",
		size    : "xs",
		content : AddCategory,
		cancel  : true,
		ok      : {
			text  : "Aceptar",
			color : theme.palette.primary.main,
		},
	});
};

const SelectCategoryContainer = ({ dialogActions, categoryActions, rdxCategory }) => {
	const theme = useTheme();

	const {
		data : {
			category,
		},
		setData,
	}  = useContext(ProductManagementContext);

	if (rdxCategory) {
		setData(prevData => ({
			...prevData,
			category : rdxCategory,
		}));
		categoryActions.removeCategory();
	}

	const handleDeleteMethod    = useCallback(() => handleDelete(setData), []);
	const handleSelectionMethod = useCallback(option => handleSelection(option, setData), []);

	const handleAddCategoryClickMethod = useCallback(() => handleAddCategoryClick(dialogActions, theme), [dialogActions, theme]);

	return (
		<SelectCategory
			delegations={{
				selectedCategory       : category?.name,
				handleDelete           : handleDeleteMethod,
				handleSelection        : handleSelectionMethod,
				handleAddCategoryClick : handleAddCategoryClickMethod,
			}}
		/>
	);
};

SelectCategoryContainer.propTypes = {
	dialogActions   : PropTypes.object.isRequired,
	categoryActions : PropTypes.object.isRequired,
	rdxCategory     : PropTypes.string.isRequired,
};

const mapDispatchToProps = bindAll({ DialogActions, CategoryActions });
const mapStateToProps    = ({ categoryReducer : { category : rdxCategory } }) => ({ rdxCategory });

export default connect(mapStateToProps, mapDispatchToProps)(SelectCategoryContainer);
