import {
	SET_CATEGORY,
	UPDATE_CATEGORY,
	REMOVE_CATEGORY,
} from "./actionTypes";

const setCategory    = (payload) => ({ type : SET_CATEGORY, payload });
const updateCategory = (payload) => ({ type: UPDATE_CATEGORY, payload });
const removeCategory = ()        => ({ type: REMOVE_CATEGORY });

const CategoryActions = {
	setCategory,
	updateCategory,
	removeCategory,
};

export default CategoryActions;
