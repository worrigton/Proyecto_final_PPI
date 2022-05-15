/* eslint-disable no-undef */
/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
import {
	useState,
	useEffect,
	useCallback,
	createContext,
	useMemo,
} from "react";
import PropTypes from "prop-types";
import qs        from "qs";

// Import Own Components
import {
	isValidArray,
} from "~/Util";
import {
	useQueryStringState,
} from "~/Util/Hooks";
import Service from "~/Service";
import Table   from "./Table.jsx";

export const TableContext = createContext(null);

const TableContainer = ({
	columns,
	tabs,
	selections : initialSelections,
	ssr,
	url,
	filters,
	collection,
	pagination,
	withToken,
	indicatorColor,
	handleRowSelection,
	rowsPerPageOptions,
	searchbarPlaceHolder,
}) => {
	const { orderByOptions, tableHeaders } = useMemo(() =>
		columns.reduce((acc, { orderBy, id, header }) => ({
			...acc,
			tableHeaders   : header ? [...acc.tableHeaders, header] : acc.tableHeaders,
			orderByOptions : orderBy ? [...acc.orderByOptions, [orderBy, id]] : acc.orderByOptions,
		}), {
			tableHeaders   : [],
			orderByOptions : [],
		})
	, [columns]);

	const [tabIndex, setTabIndex] = useState(0);

	const [selections, setSelections] = useState({
		...(initialSelections || {}),
		data : new Map(),
	});

	const [tableData, setTableData] = useState({
		columns,
		rows  : collection || [],
		total : pagination?.rowCount || 0,
	});

	const [queryStringState, setQueryStringState] = useQueryStringState({
		filter    : "",
		page_size : pagination?.pageSize || rowsPerPageOptions[1],
		page      : pagination?.page || 1,
		order     : "ASC",
		...(isValidArray(orderByOptions) ? {
			order_by : orderByOptions[0][1],
		} : {}),
		...filters,
	});

	useEffect(() => {
		if (ssr) {
			setTableData(prevState => ({
				...prevState,
				rows  : collection || [],
				total : pagination?.rowCount || 0,
			}));

			setQueryStringState({
				page_size : pagination?.pageSize || rowsPerPageOptions[1],
				page      : pagination?.page || 1,
			});
		}
	}, [pagination, collection, setQueryStringState]);

	const getDataFromAPI = useCallback(() => {
		(async () => {
			const {
				page,
				...filters
			} = queryStringState;

			const filtersForPetition = tabs
				? { ...filters, ...(tabs[tabIndex]?.filter || {}) }
				: filters;

			const stringifiedFilters = Object.keys(filtersForPetition).length > 0
				? `?${ qs.stringify(filtersForPetition) }`
				: "";

			const data = await Service.api.getFilteredData(`${url}/${page + stringifiedFilters}`, withToken);

			if (data && "collection" in data && "pagination" in data) {
				const {
					pagination : {
						rowCount : total,
						pageSize : page_size,
						page,
					},
					collection : rows,
				} = data;

				setQueryStringState({
					page,
					page_size,
				});
				setTableData({
					rows,
					total,
				});
			} else {
				// Error al querer actualizar la información
			}
		})();
	}, [queryStringState, tabs, tabIndex]);

	// Request information everytime the url changes
	useEffect(() => {
		// We don't need to do the request if using ssr
		if (!ssr) {
			getDataFromAPI();
		}

		if (typeof tabs[tabIndex]?.onClick === "function") {
			tabs[tabIndex]?.onClick();
		}
	}, [queryStringState, ssr, tabIndex]);

	return (
		<TableContext.Provider value={{
			tabs,
			tabIndex,
			setTabIndex,
			tableData,
			setTableData,
			queryStringState,
			setQueryStringState,
			columns,
			tableHeaders,
			selections : initialSelections ? selections : null,
			setSelections,
			handleRowSelection,

			searchbarPlaceHolder,
			orderByOptions,
			rowsPerPageOptions,
			indicatorColor,
		}}>
			<Table />
		</TableContext.Provider>
	);
};

TableContainer.propTypes = {
	columns : PropTypes.arrayOf(PropTypes.shape({
		orderedBy : PropTypes.string,
		id        : PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
		head      : PropTypes.string,
		label     : PropTypes.string,
		align     : PropTypes.oneOf(["left", "center", "right"]),
		style     : PropTypes.object,
		format    : PropTypes.func,
	})).isRequired,
	tabs : PropTypes.arrayOf(PropTypes.shape({
		label   : PropTypes.string.isRequired,
		filter  : PropTypes.object,
		onClick : PropTypes.func,
	})),
	selections : PropTypes.shape({
		identifyBy : PropTypes.string.isRequired,
		actions    : PropTypes.arrayOf(PropTypes.shape({
			name    : PropTypes.string.isRequired,
			handler : PropTypes.func.isRequired,
		})).isRequired,
	}),
	ssr                  : PropTypes.bool,
	url                  : PropTypes.string,
	filters              : PropTypes.object,
	collection           : PropTypes.array,
	pagination           : PropTypes.object,
	withToken            : PropTypes.bool,
	indicatorColor       : PropTypes.oneOf(["primary", "secondary"]),
	handleRowSelection   : PropTypes.func.isRequired,
	rowsPerPageOptions   : PropTypes.array,
	searchbarPlaceHolder : PropTypes.string,
};

TableContainer.defaultProps = {
	tabs                 : null,
	selections           : null,
	ssr                  : false,
	url                  : "",
	filters              : {},
	collection           : [],
	pagination           : {},
	withToken            : false,
	indicatorColor       : "primary",
	handleRowSelection   : () => {},
	rowsPerPageOptions   : [10, 25, 50],
	searchbarPlaceHolder : "Buscar",
};

export default TableContainer;
