/* eslint-disable camelcase */
/* eslint-disable react-hooks/exhaustive-deps */
import {
	useEffect,
	useState,
	useCallback,
	useMemo,
} from "react";
import PropTypes     from "prop-types";
import _             from "lodash";
import { useRouter } from "next/router";
import { useTheme }  from "@material-ui/core";

// Import Own Compoents
import { bindAll }     from "~/Util";
import withStateLoaded from "~/Store/withStateLoaded";
import Service         from "~/Service";
import AlertActions    from "~/Components/Alert/store/actions";
import DialogActions   from "~/Components/Dialog/store/actions";
import SendVoucher     from "~/Components/SendVoucher";
import { Span }        from "~/ToolKit";
import Orders          from "./Orders";

const OrdersContainer = ({
	token,
	customer_id,
	dialogActions,
}) => {
	const router                     = useRouter();
	const theme                      = useTheme();
	const [tabValue, setTabValue]    = useState(0);
	const [tableData, setTableData ] = useState({});
	const [page, setPage]            = useState(1);
	const [open, setOpen]            = useState(false);

	const handleClickOpen = useCallback((id, type) => {
		dialogActions.openDialog({
			title   : "Enviar comprobante de pago",
			size    : "sm",
			content : SendVoucher,
			ok      : {
				text  : "Enviar componente",
				color : theme.palette.primary.main,
			},
			data : {
				id,
				type,
			},
		});
	}, [dialogActions]);

	const activePage = useCallback((event, value) => {
		setPage(value);
	}, []);

	const handleDownloadFile = useCallback((id) => {
		window?.open(`/api/files/${id}`);
	});

	const handleChange =  useCallback((event, newValue) => {
		let value = newValue?.id || newValue;
		if (newValue == null) {
			value = 0;
		}
		setTabValue(value);
		setPage(1);
	}, []);

	const handleClose = useCallback(() => {
		setOpen(false);
	}, []);

	const registryData = useCallback((param) => {
		const date = new Date(param);
		const options = {
			year  : "numeric",
			month : "long",
			day   : "numeric",
		};
		return date.toLocaleDateString("es-ES", options);
	}, []);

	const toOrderDetail = useCallback(url => () => router.push(url), [router]);

	const shippingFlags = useCallback(param => {
		switch (param.shipping_status) {
			case "NOT_READY":
				return <Span
					text="No preparado"
					type="warningClearLight"
					icon="circle"
					iconColor="alert"
				/>;
			case "READY":
				return <Span
					text="Preparando pedido"
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
				return <Span
					text="Entregado"
					icon="check"
					iconColor="sussess"
				/>;
			case "CANCELED":
				return <Span
					text="Pedido cancelado por el proveedor"
					icon="circle"
					iconColor="alertDark"
				/>;
			case "DECLINED":
				return <Span
					text="Pedido cancelado"
					icon="circle"
					iconColor="alertDark"
				/>;
			default:
				break;
		}
	}, []);

	const statusFlags = useCallback(param => {
		if (!_.includes(param.flags, "PAID")) {
			return param.voucher ?
				<Span
					text="Aprobando Pago"
					icon="circle"
					iconColor="warning"
				/> : <Span
					text="Pago pendiente"
					type="alertDark"
					icon="circle"
				/>;
		} else {
			return <Span
				text="Pagado"
				type="sussess"
				icon="circle"
			/>;
		}
	}, []);

	const statusFlagsCancel = useCallback(param => {
		if (param.status === "CANCELED") {
			return  <Span
				text="Pedido cancelado"
				icon="circle"
				iconColor="alert"
			/>;
		} else if (param.status === "DECLINED") {
			return <Span
				text="Cancelaste el pedido"
				icon="circle"
				iconColor="alert"
			/>;
		}
	}, []);

	const invoicedFlags = useCallback(param => {
		if (_.includes(param.flags, "INVOICED")) {
			return <Span
				text="Facturado"
				icon="check"
				iconColor="sussess"
			/>;
		}
	}, []);

	const invoicedBtn = useCallback(param => {
		if (_.includes(param.flags, "INVOICED")) {
			return true;
		}
	}, []);

	const paidBtn = useCallback(param => {
		if (_.includes(param.flags, "PAID") || param.voucher_id) {
			return true;
		}
	}, []);

	const hasComprobant = useCallback(param => {
		if (param.voucher_id) {
			return true;
		}
	}, []);

	const TotalAmount = useCallback((param) =>
		Intl.NumberFormat("es-MX", { style : "currency", currency : "MXN" }).format(_.sumBy(param, "amount"))
	, []);

	useEffect(() => {
		(async () => {
			let response = {};
			switch (tabValue) {
				case 0:
					response = await Service.api.customer.getOrder(
						page,
						`customer_id=${customer_id}&open=${true}&page_size=5`,
						token);
					break;
				case 1:
					response = await Service.api.customer.getOrder(
						page,
						`customer_id=${customer_id}&open=${false}&page_size=5`,
						token);
					break;
				case 2:
					response = await Service.api.customer.getOrder(
						page,
						`customer_id=${customer_id}&canceled=${true}&page_size=5`,
						token);
					break;
				default:
					break;
			}
			let newCollection = _.groupBy(response.body?.collection, "buy_order_id");
			newCollection = Object.values(newCollection).reverse();
			setTableData({
				...tableData,
				data       : Object.values(newCollection),
				pagination : response.body?.pagination,
				message    : response.body?.collection?.length > 0 ? "" : "Aún no hay registros",
			});
		})();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tabValue, page, handleClose]);

	const tabs = useMemo(() => [
		{
			id    : 0,
			label : "En curso",
		},
		{
			id    : 1,
			label : "Historial de pedidos",
		},
		{
			id    : 2,
			label : "Pedidos cancelados",
		},
	], []);

	return (<>
		<Orders
			delegations={{
				tabs,
				tabValue,
				tableData,
				page,
				activePage,
				handleChange,
				registryData,
				TotalAmount,
				shippingFlags,
				statusFlags,
				invoicedFlags,
				statusFlagsCancel,
				toOrderDetail,
				invoicedBtn,
				paidBtn,
				hasComprobant,
				open,
				handleClickOpen,
				handleClose,
				handleDownloadFile,
			}}
		/>
	</>
	);
};

OrdersContainer.propTypes = {
	alertActions  : PropTypes.object,
	token         : PropTypes.any,
	customer_id   : PropTypes.any,
	dialogActions : PropTypes.any,
};

const mapStateToProps = ({ userReducer : { customer } }) => ({
	token       : customer?.token || null,
	customer_id : customer?.data?.customer?.id,
});

const mapDispatchToProps = bindAll({
	DialogActions,
	AlertActions,
});

export default withStateLoaded(mapStateToProps, mapDispatchToProps)(OrdersContainer);


