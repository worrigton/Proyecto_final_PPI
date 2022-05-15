import _           from "lodash";
/* eslint-disable camelcase */
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
	REMOVE_FILTERS,
	SET_STATE,
	SET_PAGINATION,
	SET_NEED_TO_UPDATE,

	ProductsReducer,
} from "./types";

const productsInitialState: ProductsReducer = {
	needToUpdate : false,
	products     : [],
	cartProducts : [],
	pagination   : {
		rowCount  : 9,
		pageCount : 1,
		page      : 1,
		pageSize  : 9,
	},
	quantity  : 0,
	orderInfo : {},
	filters   : {
		stateLocation : {
			id   : 14,
			name : "Jalisco",
		},
		category : {
			id   : 0,
			name : "todas",
		},
		filter          : "",
		order           : "DESC",
		order_by        : "name",
		frezee          : false,
		min_price       : 0,
		max_price       : 1000,
		volume_discount : false,
		only_offered    : false,
	},
};

const productsReducer = (state = productsInitialState, action) => {
	switch (action?.type) {
		case SET_NEED_TO_UPDATE: {
			return {
				...state,
				needToUpdate : action.payload.value,
			};
		}
		case SET_STATE: {
			return action.payload.setState(state);
		}
		case SET_PAGINATION: {
			return {
				...state,
				needToUpdate : true,
				pagination   : {
					...state.pagination,
					...action.payload,
				},
			};
		}
		case SET_FILTER : {
			return {
				...state,
				needToUpdate : true,
				pagination   : {
					...state.pagination,
					page : 1,
				},
				filters : {
					...state.filters,
					...action.payload,
				},
			};
		}
		case REMOVE_FILTERS :
			return {
				...state,
				needToUpdate : true,
				filters      : productsInitialState.filters,
				pagination   : productsInitialState.pagination,
			};
		case SET_PRODUCTS_STATE:
			return {
				...state,
				needToUpdate : true,
				pagination   : {
					...state.pagination,
					page : 1,
				},
				filters : {
					...state.filters,
					stateLocation : action.payload,
				},
			};
		case SET_PRODUCTS_CATEGORY:
			return {
				...state,
				needToUpdate : true,
				pagination   : {
					...state.pagination,
					page : 1,
				},
				filters : {
					...state.filters,
					category : action.payload,
				},
			};
		case ADD_TO_CART : {
			let product = {};
			const provider = _.find(
				action.payload.product.providers,
				{ "provider_id" : action.payload.product.provider_id });
			product = {
				provider_has_product_id : provider.id,
				providerPrice           : provider.price,
				quantity                : action.payload.quantity,
				name   	                : action.payload.data.name,
				presentation            : action.payload.data.description,
				price                   : (provider.price / 116) * 100,
				imagePath               : action.payload.data.images[0].sm,
				seller                  : provider.trade_name,
				provider_id             : provider.provider_id,
				p_discount              : action.payload.discount,
				shipping_cost           : 0,
				quality                 : action.payload.filter.quality,
				size                    : action.payload.filter.size,
				discount                : (((provider.price / 116) * 100) * action.payload.quantity) * (action.payload.discount / 100),
				discounts               : action.payload.discountsInfo,
			};
			return {
				...state,
				cartProducts : [...state.cartProducts, product],
				quantity     : state.quantity + 1,
			};
		}
		case UPDATE_TO_CART: {
			const product = state.cartProducts[action.payload.index];
			state.cartProducts[action.payload.index].quantity = action.payload.value;
			const discount = state.cartProducts[action.payload.index].price *
				state.cartProducts[action.payload.index].quantity * (product.p_discount / 100);
			state.cartProducts[action.payload.index].discount = discount;
			return {
				...state,
				cartProducts : [
					...state.cartProducts,
				],
			};
		}
		case REMOVE_FROM_CART: {
			state.cartProducts.splice(action.payload.index, 1);
			return {
				...state,
				cartProducts : [
					...state.cartProducts,
				],
				quantity : state.quantity - 1,
			};
		}
		case EMPTY_CART:
			return {
				...state,
				cartProducts : [],
				quantity     : 0,
			};
		case SET_ORDER_SUCCESS:
			return {
				...state,
				orderInfo : action.payload,
			};
		case SET_INITIAL_STATE:
			return {
				productsInitialState,
			};
		default:
			return state;
	}
};

export default productsReducer;
