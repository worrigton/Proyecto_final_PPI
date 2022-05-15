/* eslint-disable camelcase */
import {
	useState,
	useMemo,
	useEffect,
	useCallback,
} from "react";
import qs    from "qs";
import fetch from "isomorphic-unfetch";

// Import Own Components
import {
	bindAll,
	getSubObjWithKeys,
	getParamsFromWindow,
} from "~/Util";
import withStateLoaded           from "~/Store/withStateLoaded";
import { useQueryStringUpdater } from "~/Util/Hooks";
import { ProductsReducer }       from "./store/types";
import ProductActions            from "./store/actions";
import {
	PageChangeEvent,
	RowsPerPageChangeEvent
} from "./types";
import ProductsStore from "./ProductsStore";

interface QueryStringParams {
	page         : number;
	filter       : string;
	min_price    : number;
	max_price    : number;
	only_offered : boolean
};

/**
 * Reads data from the query string, merge that with redux global state and update redux
 * 
 * @author Montserrat Delgado Alvarez <mdanatg@gmail.com>
 * @param productsReducer Data from redux
 */
const setDefaultQueryString = (productActions): void => {
	const defaultValues: QueryStringParams = {
		page         : 1,
		filter       : "",
		min_price    : 0,
		max_price    : 1000,
		only_offered : true,
	};

	const targetParamsFromWindow: QueryStringParams = getSubObjWithKeys(getParamsFromWindow(), Object.keys(defaultValues));

	const mergedQuery: QueryStringParams = {
		...defaultValues,
		...targetParamsFromWindow,
	};

	productActions.setState(prevState => ({
		...prevState,
		needToUpdate : true,
		pagination   : {
			...prevState.pagination,
			page : mergedQuery.page,
		},
		filters : {
			...prevState.filters,
			search       : mergedQuery.filter,
			min_price    : mergedQuery.min_price,
			max_price    : mergedQuery.max_price,
			only_offered : mergedQuery.only_offered,
		},
	}));
};

/**
 * Get products pagination data from server, update redux to server response and
 * update the queryString
 * 
 * @author Montserrat Delgado Alvarez <mdanatg@gmail.com>
 * @param productsReducer Data from redux
 */
const getDataFromServer = async (productsReducer: ProductsReducer, productActions, qsUpdater) => {
	try {
		const {
			pagination,
			filters : {
				stateLocation,
				category,
				frezee,
				volume_discount,
				...filters
			},
		} = productsReducer;

		const query = {
			state_id        : stateLocation.id,
			category_id     : category.id || undefined,
			page_size       : pagination.pageSize,
			cheaper_product : true,
			image_size      : "md",
			frezee          : frezee ||  undefined,
			volume_discount : volume_discount ||  undefined,
			...filters,
		};

		const response = await fetch(`/api/products/page/${pagination.page}?${qs.stringify(query)}`);

		if (!response.ok) {
			throw response;
		}

		const data = await response.json();

		if (!("collection" in data && "pagination" in data)) {
			throw data;
		}

		const newQueryString : QueryStringParams = {
			page         : data.pagination.page,
			filter       : filters.filter,
			min_price    : filters.min_price,
			max_price    : filters.max_price,
			only_offered : filters.only_offered,
		};

		qsUpdater.setParams(newQueryString, true);
		productActions.setState(prevState => ({
			...prevState,
			needToUpdate : false,
			products     : data.collection,
			pagination   : data.pagination,
		}));
	} catch (err) {
		console.error("An exception has ocurred while fetch the products data. ", err);
		productActions.setState(prevState => ({
			...prevState,
			needToUpdate : false,
		}));
	}
};

const handleChangePage = (page: number, productActions) => {
	productActions.setPagination({
		page : page + 1,
	});
};

const handleChangeRowsPerPage = (newOption, productActions) => {
	productActions.setPagination({
		pageSize : newOption,
	});
};

interface Props {
	productsReducer : ProductsReducer;
	productActions : any;
};

const ProductsStoreContainer: React.FC<Props> = ({
	productsReducer,
	productActions,
}) => {
	const qsUpdater          = useQueryStringUpdater();
	const rowsPerPageOptions = useMemo(() => [6, 9, 12, 24], []);

	useEffect(() => {
		setDefaultQueryString(productActions);
	}, []);

	useEffect(() => {
		if (productsReducer.needToUpdate) {
			getDataFromServer(productsReducer, productActions, qsUpdater);
		}
	}, [productsReducer.needToUpdate]);

	const handleChangePageMethod = useCallback<PageChangeEvent>((event, page) => handleChangePage(page, productActions), [productActions]);

	const handleChangeRowsPerPageMethod = useCallback<RowsPerPageChangeEvent>(({ target : { value } }) => {
		handleChangeRowsPerPage(value, productActions);
	}, [productActions]);

	return (
		<ProductsStore
			delegations={{
				rowsPerPageOptions,
				handleChangePage        : handleChangePageMethod,
				handleChangeRowsPerPage : handleChangeRowsPerPageMethod,
			}}
		/>
	);
};

const mapStateToProps    = ({ productsReducer }) => ({ productsReducer });
const mapDispatchToProps = bindAll({ ProductActions });

export default withStateLoaded(mapStateToProps, mapDispatchToProps)(ProductsStoreContainer);
