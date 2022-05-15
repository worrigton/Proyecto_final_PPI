import { useContext } from "react";
import { Divider }    from "@material-ui/core";

// Import Own Components
import { TableContext }    from "~/ToolKit/Table";
import { isValidArray }    from "~/Util";
import TablePaper          from "./TablePaper";
import TableTabs           from "./TableTabs";
import SearchbarAndFilters from "./SearchbarAndFilters";
import TableSelections     from "./TableSelections";
import TableContent        from "./TableContent";
import TablePagination     from "./TablePagination";

const Table = () => {
	const {
		tableData : {
			rows,
		},
		tabs,
		selections,
		renderOnEmpty,
	} = useContext(TableContext);

	return (
		<TablePaper>
			{ isValidArray(tabs) && (
				<TableTabs />
			)}

			<SearchbarAndFilters />

			{ selections && (
				<TableSelections />
			) }

			<Divider />

			<TableContent />

			{ isValidArray(rows) ? (
				<TablePagination />
			) : (
				renderOnEmpty
			) }
		</TablePaper>
	);
};

export default Table;
