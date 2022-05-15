/* eslint-disable camelcase */
import {
	useEffect,
	useState,
	useCallback,
	useMemo,
} from "react";
import PropTypes from "prop-types";
import _         from "lodash";

// Import Own Compoents
import Service         from "~/Service";
import AlertActions    from "~/Components/Alert/store/actions";
import { Span }        from "~/ToolKit";
import { bindAll }     from "~/Util";
import withStateLoaded from "~/Store/withStateLoaded";
import Orders          from "./Orders";
import { useRouter }   from "next/router";

const OrdersContainer = ({ alertActions, token, provider_id }) => {
	const router = useRouter();

	const [tableData, setTableData] = useState({
		rowsData   : [],
		pagination : {},
	});

	const [page, setPage]               = useState(0);
	const [tabValue, setTabValue]       = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [anchorEl, setAnchorEl]       = useState(null);
	const [anchorEl2, setAnchorEl2]     = useState(null);
	const [stFlags, setStFlags]         = useState("");
	const [stShipping, setStShipping]   = useState("");
	const [order, setOrder]             = useState("DESC");
	const [filter, setFilter]           = useState("");

	const handleOpen2  = useCallback(({ currentTarget }) => setAnchorEl2(currentTarget), []);
	const handleClose2 = useCallback(() => setAnchorEl2(null), []);

	const handleOpen  = useCallback(({ currentTarget }) => setAnchorEl(currentTarget), []);
	const handleClose = useCallback(() => setAnchorEl(null), []);

	const handleChange = useCallback((event, newValue) => {
		setTabValue(newValue);
	}, []);

	const handleChangeInput = useCallback(({ target : { value } }) => {
		setFilter(value);
	}, []);

	const handleChangeOrder = useCallback((event) => {
		const value = order == "DESC" ? "ASC" : "DESC";
		setOrder(value);
	}, [order]);

	const handleChangePage = useCallback((event, newPage) => {
		setPage(newPage);
	}, []);

	const handleChangeRowsPerPage = useCallback((event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
	}, []);

	const activePage = useCallback((event, value) => {
		setPage(value);
	}, []);

	const selectFlags = useCallback(value => () => {
		if (value == 1)
			setStFlags(`&paid=${true}`);
		else if (value == 2)
			setStFlags(`&not_payed=${true}`);
		else if (value == 3)
			setStFlags("");
		else
			setStFlags(`&not_payed=${true}`);

		setAnchorEl(null);
	}, []);

	const selectShipping = useCallback(value => () => {
		switch (value) {
			case 1 :
				setStShipping("&shipping_status=NOT_READY");
				break;
			case 2 :
				setStShipping("&shipping_status=READY");
				break;
			case 3 :
				setStShipping("&shipping_status=SENT");
				break;
			case 4 :
				setStShipping("&shipping_status=FINISHED");
				break;
			case 5 :
				setStShipping("&shipping_status=CANCELED");
				break;
			case 6 :
				setStShipping("&shipping_status=DECLINED");
				break;
			case 7 :
				setStShipping("");
				break;
			default:
				break;
		}
		setAnchorEl2(null);
	}, []);
	const registryData = useCallback((param) => {
		const date = new Date(param);
		const options = {
			weekday : "long",
			year    : "numeric",
			month   : "short",
			day     : "numeric",
		};
		return date.toLocaleDateString("es-ES", options);
	}, []);

	const statusFlags = useCallback((param, status) => {
		if (status && (status === "DECLINED" || status === "CANCELED")) {
			return <Span
				text="Cancelado"
				icon="circle"
				iconColor="alertDark"
			/>;
		}
		if (!_.includes(param.flags, "PAID")) {
			return param.voucher_id ?
				<Span
					text="Aprobando Pago"
					icon="circle"
					iconColor="warning"
				/> : <Span
					text="Pago pendiente"
					type="warningLight"
					icon="circle"
					iconColor="alertDark"
				/>;
		} else {
			return <Span
				text="Pagado"
				type="sussess"
				icon="circle"
			/>;
		}
	}, []);

	const shippingFlags = useCallback((param, status) => {
		switch (param) {
			case "NOT_READY":
				return <Span
					text="No preparado"
					type="warningClearLight"
					icon="circle"
					iconColor="alert"
				/>;
			case "READY":
				return <Span
					text="Pedido preparado"
					icon="circle"
					iconColor="warning"
				/>;
			case "SENT":
				return <Span
					text="Enviado"
					icon="circle"
					iconColor="sussess"
				/>;
			case "FINISHED":
				if (status && (status === "DECLINED" || status === "CANCELED")) {
					return <Span
						text="Cancelado"
						icon="circle"
						iconColor="alertDark"
					/>;
				}
				return <Span
					text="Entregado"
					icon="check"
					iconColor="sussess"
				/>;
			case "CANCELED":
				return <Span
					text="Pedido cancelado"
					icon="circle"
					iconColor="alertDark"
				/>;
			case "DECLINED":
				return <Span
					text="Pedido cancelado por el cliente"
					icon="circle"
					iconColor="alertDark"
				/>;
			default:
				break;
		}
	}, []);

	useEffect(() => {
		(async () => {
			let response = {};
			switch (tabValue) {
				case 0:
					response = await Service.api.provider.getOrder(
						page + 1,
						`provider_id=${provider_id}
						&page_size=${rowsPerPage}
						${stFlags}${stShipping}
						&order=${order}
						&filter=${filter}`,
						token);
					break;
				case 1:
					response = await Service.api.provider.getOrder(
						page + 1,
						`provider_id=${provider_id}&open=${true}&page_size=${rowsPerPage}`,
						token);
					break;
				case 2:
					response = await Service.api.provider.getOrder(
						page + 1,
						`provider_id=${provider_id}&page_size=${rowsPerPage}&shipping_status=NOT_READY`,
						token);
					break;
				case 3:
					response = await Service.api.provider.getOrder(
						page + 1,
						`provider_id=${provider_id}&page_size=${rowsPerPage}&not_payed=${true}`,
						token);
					break;
				default:
					break;
			}
			const rowData = response?.body?.collection.reduce((accum, orders) => {
				accum.push({
					provider_id   : provider_id,
					order         : orders.code,
					date          : orders.timestamp,
					customer_name : orders.customer,
					paid_status   : {
						flags   : orders.flags,
						voucher : orders.voucher,
					},
					shipping_status : orders.shipping_status,
					total           : orders.amount,
					status          : orders.status,
				},
				);
				return accum;
			}, []);

			setTableData({
				...tableData,
				rowsData   : rowData,
				pagination : response.body?.pagination,
				message    : response.body?.collection?.length > 0 ? "" : "Aún no hay registros",
			});
		})();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, tabValue, rowsPerPage, stFlags, stShipping, order, filter]);

	const tabs = useMemo(() => [
		{
			id    : 0,
			label : "Todos",
		},
		{
			id    : 1,
			label : "Abierto",
		},
		{
			id    : 2,
			label : "No preparado",
		},
		{
			id    : 3,
			label : "Sin pagar",
		},
	], []);
	const columns = useMemo(() => [
		{
			title : "Pedido",
			field : "order",
		},
		{
			title : "Fecha",
			field : "date",
		},
		{
			title : "Cliente",
			field : "customer_name",
		},
		{
			title : "Estatus del Pago",
			field : "paid_status",
		},
		{
			title : "Estatus de Preparación",
			field : "shipping_status",
		},
		{
			title : "Total",
			field : "total",
		},
	], []);

	const toOrderDetail = useCallback(url => () => router.push(url), [router]);

	return (
		<Orders
			delegations={{
				page,
				tabs,
				tabValue,
				rowsPerPage,
				columns,
				tableData,
				anchorEl,
				stShipping,
				anchorEl2,
				handleOpen2,
				handleClose2,
				selectShipping,
				handleOpen,
				handleClose,
				activePage,
				handleChange,
				handleChangePage,
				handleChangeRowsPerPage,
				registryData,
				statusFlags,
				shippingFlags,
				selectFlags,
				handleChangeOrder,
				handleChangeInput,
				toOrderDetail,
			}}
		/>
	);
};

OrdersContainer.propTypes = {
	alertActions : PropTypes.object,
	token        : PropTypes.any,
	provider_id  : PropTypes.any,
};

const mapStateToProps = ({ userReducer : { provider } }) => ({
	token       : provider?.token || null,
	provider_id : provider?.data?.provider?.id,
});

const mapDispatchToProps = bindAll({
	AlertActions,
});

export default withStateLoaded(mapStateToProps, mapDispatchToProps)(OrdersContainer);


