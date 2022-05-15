/* eslint-disable camelcase */
/* eslint-disable max-len */
import {
	useCallback,
	useContext,
} from "react";

// Import Own Components
import { TableContext } from "~/ToolKit/Table";
import TablePagination  from "./TablePagination.jsx";

const TablePaginationContainer = () => {
	const {
		queryStringState : {
			page,
			page_size,
		},
		tableData : {
			total,
		},
		rowsPerPageOptions,
		setQueryStringState,
	} = useContext(TableContext);

	const handlePageChange = useCallback((evnt, newPage) => setQueryStringState({ page : newPage + 1 }), [setQueryStringState]);

	const handleRowsPerPageChange = useCallback(({ target : { value } }) => setQueryStringState({
		page_size : +value,
		page      : 1,
	}), [setQueryStringState]);

	return (
		<TablePagination
			page={page}
			total={total}
			perPage={page_size}
			onPageChange={handlePageChange}
			rowsPerPageOptions={rowsPerPageOptions}
			onRowsPerPageChange={handleRowsPerPageChange}
		/>
	);
};

export default TablePaginationContainer;
