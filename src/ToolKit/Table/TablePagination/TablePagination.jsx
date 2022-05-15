import PropTypes                                 from "prop-types";
import { TablePagination as MuiTablePagination } from "@material-ui/core";

const TablePagination = ({
	page,
	total,
	perPage,
	onPageChange,
	rowsPerPageOptions,
	onRowsPerPageChange,
}) => (
	<MuiTablePagination
		component="div"
		rowsPerPageOptions={rowsPerPageOptions}
		count={parseInt(total)}
		rowsPerPage={parseInt(perPage)}
		page={parseInt(page - 1)}
		onChangePage={onPageChange}
		onChangeRowsPerPage={onRowsPerPageChange}
	/>
);

TablePagination.propTypes = {
	page                : PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	total               : PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	perPage             : PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	onPageChange        : PropTypes.func.isRequired,
	rowsPerPageOptions  : PropTypes.array.isRequired,
	onRowsPerPageChange : PropTypes.func.isRequired,
};

export default TablePagination;
