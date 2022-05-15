export const SET_PRODUCTS_CATEGORY: string = "SET_PRODUCTS_CATEGORY";
export const SET_PRODUCTS_STATE: string    = "SET_PRODUCTS_STATE";
export const ADD_TO_CART: string           = "ADD_TO_CART";
export const UPDATE_TO_CART: string        = "UPDATE_TO_CART";
export const REMOVE_FROM_CART: string      = "REMOVE_FROM_CART";
export const EMPTY_CART: string            = "EMPTY_CART";
export const SET_ORDER_SUCCESS: string     = "SET_ORDER_SUCCESS";
export const SET_INITIAL_STATE: string     = "SET_INITIAL_STATE";
export const SET_FILTER: string            = "SET_FILTER";
export const SET_PAGINATION: string        = "SET_PAGINATION";
export const SET_NEED_TO_UPDATE: string    = "SET_NEED_TO_UPDATE";
export const REMOVE_FILTERS: string        = "REMOVE_FILTERS";
export const SET_STATE: string             = "SET_STATE";

export interface IdentityAndName {
	id   : number;
	name : string;
};

export interface Pagination {
	rowCount  : number;
	pageCount : number;
	page      : number;
	pageSize  : number;
};

export type Products = Array<{
	id              : number;
	category_id     : number;
	image           : string;
	quantity        : number;
	discount        : number;
	price           : number;
	name            : string;
	description     : string;
	created_at      : string;
	category        : string;
	pending_changes : number;
	p_discount      : any;
	cheaper_product : number;
	images          : any[];
}>;

export interface Filters {
	stateLocation   : IdentityAndName;
	category        : IdentityAndName;
	filter          : string;
	order           : string;
	order_by        : string;
	frezee          : boolean | false;
	min_price       : number;
	max_price       : number;
	only_offered    : boolean;
	volume_discount : boolean;
};

export interface ProductsReducer {
	needToUpdate : boolean;
	products     : Products;
	pagination   : Pagination;
	quantity     : number;
	orderInfo    : any,
	filters      : Filters;
	cartProducts : any[],
};
