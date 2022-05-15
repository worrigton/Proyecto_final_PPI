/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback } from "react";
import { Grid, Menu, MenuItem }  from "@material-ui/core";
import { PropTypes }             from "prop-types";
import _                         from "lodash";

// Import own components
import useStyles                          from "./styles";
import Typography                         from "~/ToolKit/Typography/Typography";
import Span                               from "~/ToolKit/Span/Span";
import { ButtonWithoutStyles as Clicker } from "~/ToolKit";
import { FaChevronDown }                  from "~/Resources/icons/fal";
import OrderCancelModal                   from "./OrderCancelModal";

const OrderDetailsHeader = ({ delegations: { data, handleCancelOrder }, administrator, provider }) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const [openModalCancel, setOpenModalCancel] = useState(false);
	const [note, setNote] = useState("");

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const showModalCancel = useCallback(() => {
		setAnchorEl(null);
		setOpenModalCancel(true);
	}, []);

	const handleCloseModal = useCallback(() => {
		setOpenModalCancel(false);
	}, []);

	const handleSetNote = useCallback((e, label) => {
		setNote(label);
	}, []);

	const handleCancel = useCallback(() => {
		const order = {
			id         : data.sale_orders[0].id,
			note       : note.label,
			providerId : data.sale_orders[0].products[0].provider_id,
		};
		handleCancelOrder(order);
	});

	const shippingFlags = useCallback(param => {
		switch (param.shipping_status) {
			case "NOT_READY":
				return <Span
					text="No preparado"
					type="warningClearLight"
					icon="circle"
					iconColor="alert"
					className={classes.span}
				/>;
			case "READY":
				return <Span
					text="Preparando pedido"
					icon="circle"
					iconColor="warning"
					className={classes.span}
				/>;
			case "SENT":
				return <Span
					text="Enviado"
					icon="circle"
					iconColor="sussess"
					className={classes.span}
				/>;
			case "FINISHED":
				return <Span
					text="Entregado"
					icon="check"
					iconColor="sussess"
					className={classes.span}
				/>;
			case "CANCELED":
				return <Span
					text="Pedido cancelado por el proveedor"
					icon="circle"
					iconColor="alertDark"
					className={classes.span}
				/>;
			case "DECLINED":
				return <Span
					text="Pedido cancelado"
					icon="circle"
					iconColor="alertDark"
					className={classes.span}
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
					className={classes.span}
				/> : <Span
					text="Pago pendiente"
					type="alertDark"
					icon="circle"
					className={classes.span}
				/>;
		} else {
			return <Span
				text="Pagado"
				type="sussess"
				icon="circle"
				className={classes.span}
			/>;
		}
	}, []);

	const statusFlagsCancel = useCallback(param => {
		if (param.status === "CANCELED") {
			return  <Span
				text="Pedido cancelado"
				icon="circle"
				iconColor="alert"
				className={classes.span}
			/>;
		} else if (param.status === "DECLINED") {
			return <Span
				text="Cancelaste el pedido"
				icon="circle"
				iconColor="alert"
				className={classes.span}
			/>;
		}
	}, []);

	const invoicedFlags = useCallback(param => {
		if (_.includes(param.flags, "INVOICED")) {
			return <Span
				text="Facturado"
				icon="check"
				iconColor="sussess"
				className={classes.span}
			/>;
		}
	}, []);

	const classes = useStyles();

	const registryData = useCallback((param) => {
		const date = new Date(param);
		const options = {
			year   : "numeric",
			month  : "short",
			day    : "numeric",
			hour   : "numeric",
			minute : "numeric",
		};
		return `${date.toLocaleDateString("es-ES", options)}`;
	}, []);

	const isCancellable = (flags, estatus) => {
		if (flags === "PAID") {
			return false;
		} else if (estatus === "CANCELED" || estatus === "DECLINED") {
			return false;
		} else {
			return true;
		}
	};

	return data && (
		<>
			<Grid
				container
				direction="row"
				justify="flex-start"
				alignItems="flex-end"
			>
				<Grid item>
					<Typography className={classes.titleSection} type="header3" fontWeight="700">
						#{data.code}
					</Typography>
				</Grid>
				<Grid item>
					{
						administrator && (
							<Typography
								className={classes.titleSection2}
								type="body2">
								{registryData(data.date)} para <span className={classes.textOrange}>
									{data.sale_orders[0].trade_name}
								</span>
							</Typography>
						)
					}
					{
						provider && (
							<Typography
								className={classes.titleSection2}
								type="header3">
								{registryData(data.date)}
							</Typography>
						)
					}
				</Grid>
				<Grid item className={classes.titleResume}>
					{data && data.sale_orders[0].status === "CANCELED" || data.sale_orders[0].status === "DECLINED" ? (
						statusFlagsCancel(data.sale_orders[0])
					) : ( <>
						<div className={classes.marginChips}>
							{statusFlags(data.sale_orders[0])}
						</div>
						<div className={classes.marginChips}>
							{shippingFlags(data.sale_orders[0])}
						</div>
						<div className={classes.marginChips}>
							{invoicedFlags(data.sale_orders[0])}
						</div>
					</>)}
				</Grid>
			</Grid>
			{
				data && isCancellable(data.sale_orders[0].flags, data.sale_orders[0].status) && (
					<Grid container>
						<Grid item>
							<Clicker className={classes.buttonAcciones} onClick={handleClick}>
								<Typography>Más acciones <FaChevronDown /></Typography>
							</Clicker>
							<Menu
								id="simple-menu"
								anchorEl={anchorEl}
								keepMounted
								open={Boolean(anchorEl)}
								onClose={handleClose}
								disableScrollLock={true}
								anchorOrigin={{ vertical : "bottom", horizontal : "center" }}
								transformOrigin={{ vertical : "top", horizontal : "center" }}
							>
								<MenuItem onClick={showModalCancel}>Cancelar Pedido</MenuItem>
							</Menu>
						</Grid>
					</Grid>
				)
			}
			<OrderCancelModal {... {
				delegations : {
					note,
					handleSetNote,
					openModalCancel,
					handleCloseModal,
					handleCancel,
					data,
				},
			}} />
		</>
	);
};

OrderDetailsHeader.propTypes = {
	delegations   : PropTypes.object.isRequired,
	provider      : PropTypes.bool,
	customer      : PropTypes.bool,
	administrator : PropTypes.bool,
};

OrderDetailsHeader.defaultProps = {
	provider      : false,
	customer      : false,
	administrator : false,
};

export default OrderDetailsHeader;
