/* eslint-disable react-hooks/exhaustive-deps */
import {
	useState,
	useEffect,
	useCallback,
	createContext,
} from "react";
import PropTypes    from "prop-types";
import { connect }  from "react-redux";
import { useTheme } from "@material-ui/core";

// Import Own Components
import Service       from "~/Service";
import { bindAll }   from "~/Util";
import DialogActions from "~/Components/Dialog/store/actions";
import CardDialog    from "~/Components/Admin/AdditionalAccounts/Details/CardDialog";
import Table         from "./Table.jsx";

export const TableContext = createContext(null);

const TableContainer = ({
	columns,
	tabs,
	id,
	dialogActions,
}) => {
	const theme = useTheme();

	const [tableData, setTableData] = useState({
		//columns,
		rows       : [],
		pagination : {},
	});

	const [page, setPage]               = useState(0);
	const [tabValue, setTabValue]       = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const addProvider =  useCallback(provider => () => {
		dialogActions.openDialog({
			title   : "Asociar nuevo proveedor",
			size    : "sm",
			content : CardDialog,
			ok      : {
				text  : "Añadir",
				color : theme.palette.primary.main,
			},
			data : {
				type     : "add",
				employee : id,
				...provider,
			},
		});
	}, [dialogActions]);

	const deleteProvider =  useCallback(provider=> () => {
		dialogActions.openDialog({
			title   : "Quitar proveedor",
			size    : "sm",
			content : CardDialog,
			ok      : {
				text  : "Quitar",
				color : theme.palette.primary.main,
			},
			data : {
				type     : "delete",
				employee : id,
				...provider,
			},
		});
	}, [dialogActions]);

	const handleChange =  useCallback((event, newValue) => {
		setTabValue(newValue);
	}, []);

	const handleChangePage =  useCallback((event, newPage) => {
	  setPage(newPage);
	}, []);

	const handleChangeRowsPerPage =  useCallback((event) => {
	  setRowsPerPage(parseInt(event.target.value, 10));
	}, []);

	const activePage = useCallback((event, value) => {
		setPage(value);
	}, []);

	useEffect(() => {
		const qs = `per_page=${rowsPerPage}&`;
		(async () => {
			const { body : response } = tabValue == 0 ?	(
				await Service.api.provider.getProviders(page + 1, `include_employee_id=${id}&${qs}`, "admin")
			) : (
				await Service.api.provider.getProviders(page + 1, `exclude_employee_id=${id}&${qs}`, "admin")
			);

			setTableData({
				...tableData,
				rows       : response.collection,
				pagination : response.pagination,
			});
		})();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id, page, tabValue, rowsPerPage]);

	return (<>
		<Table  delegations={{
			rows       : tableData.rows,
			pagination : tableData.pagination,
			page,
			tabs,
			tabValue,
			rowsPerPage,
			addProvider,
			activePage,
			handleChange,
			handleChangePage,
			handleChangeRowsPerPage,
			deleteProvider,
		}}
		/></>
	);
};

TableContainer.propTypes = {
	columns : PropTypes.arrayOf(PropTypes.shape({
		orderedBy : PropTypes.string,
		id        : PropTypes.string.isRequired,
		head      : PropTypes.string,
		label     : PropTypes.string,
		align     : PropTypes.oneOf(["left", "center", "right"]),
		style     : PropTypes.object,
		format    : PropTypes.func,
	})),
	tabs : PropTypes.arrayOf(PropTypes.shape({
		label : PropTypes.string,
	})),
	id            : PropTypes.number,
	dialogActions : PropTypes.any,
};
const mapDispathToProps = bindAll({
	DialogActions,
});

export default connect(null, mapDispathToProps)(TableContainer);
