import { ReduxAction } from "~/Store/actionTypes";
import {
	SET_PRODUCTS_STATE,
	SET_PRODUCTS_CATEGORY,
	ADD_TO_CART,
	UPDATE_TO_CART,
	REMOVE_FROM_CART,
	EMPTY_CART,
	SET_ORDER_SUCCESS,
	SET_INITIAL_STATE,
	SET_FILTER,
	SET_PAGINATION,
	REMOVE_FILTERS,
	SET_STATE,
	ProductsReducer,
	SET_NEED_TO_UPDATE,
} from "./types";

type SetStateFn = (prevState: ProductsReducer) => ProductsReducer;

const setState = (setStateFn: SetStateFn): ReduxAction<{ setState : SetStateFn }> => ({
	type    : SET_STATE,
	payload : {
		setState : setStateFn,
	},
});

const setProductsState = (newState): ReduxAction<any> => ({
	type    : SET_PRODUCTS_STATE,
	payload : newState,
});

const setProductsCategory = (newState): ReduxAction<any> => ({
	type    : SET_PRODUCTS_CATEGORY,
	payload : newState,
});

const addToCart = (product): ReduxAction<any> => ({
	type    : ADD_TO_CART,
	payload : {
		...product,
	},
});

const updateToCart = (product): ReduxAction<any> => ({
	type    : UPDATE_TO_CART,
	payload : {
		...product,
	},
});

const removeFromCart = (index): ReduxAction<any> => ({
	type    : REMOVE_FROM_CART,
	payload : {
		index,
	},
});

const emptyCart = (newState): ReduxAction<any> => ({
	type    : EMPTY_CART,
	payload : {
		newState,
	},
});

const setOrderSuccess = (newState): ReduxAction<any> => ({
	type    : SET_ORDER_SUCCESS,
	payload : {
		...newState,
	},
});

const initialState = (newState): ReduxAction<any> => ({
	type    : SET_INITIAL_STATE,
	payload : {
		...newState,
	},
});

const setFilter = (filters): ReduxAction<any> => ({
	type    : SET_FILTER,
	payload : filters,
});

const setPagination = (paginations): ReduxAction<any> => ({
	type    : SET_PAGINATION,
	payload : paginations,
});

const removeFilters = (): ReduxAction<any> => ({ type : REMOVE_FILTERS });

const setNeedToUpdate = (value: boolean): ReduxAction<{ value : boolean }> => ({
	type    : SET_NEED_TO_UPDATE,
	payload : {
		value,
	},
});

const ProductsActions = {
	setState,
	setProductsState,
	setProductsCategory,
	addToCart,
	updateToCart,
	setPagination,
	removeFromCart,
	emptyCart,
	setOrderSuccess,
	initialState,
	setFilter,
	removeFilters,
	setNeedToUpdate,
};

export default ProductsActions;
