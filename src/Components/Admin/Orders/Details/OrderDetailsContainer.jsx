/* eslint-disable react-hooks/exhaustive-deps */
import { connect }   from "react-redux";
import { PropTypes } from "prop-types";
import {
	useState,
	useEffect,
	useCallback,
}  from "react";
import { useTheme } from "@material-ui/core";

// import own components
import { bindAll }      from "~/Util";
import { scrollToTop }  from "~/Util/ApiHelpers";
import saleOrderMethods from "~/Service/saleOrders";
import AdminLayout      from "~/Components/Admin/AdminLayout";
import TitlePage        from "~/Components/TitlePage";
import AlertActions     from "~/Components/Alert/store/actions";
import DialogActions    from "~/Components/Dialog/store/actions";
import SendVoucher      from "~/Components/SendVoucher";
import OrderDetails     from "./OrderDetails";

const OrderDetailsContainer = ({
	orderData,
	customer,
	providerId,
	alertActions,
	dialogActions,
}) => {
	const theme = useTheme();

	const [data, setData]                = useState(orderData);
	const [orderDetails, setOrderDetails] = useState();

	useEffect(()=> {
		const amount       = data.sale_orders[0].amount;
		const shippingCost = data.sale_orders[0].shipping_cost;
		const discount     = data.sale_orders[0].discount;
		const subtotal     =  (amount / 1.16);
		const sub          = subtotal - shippingCost + discount ;
		const iva          = amount - subtotal;
		setOrderDetails({
			amount,
			shippingCost,
			discount,
			sub,
			iva,
		});
	}, [data]);

	const updateStatus = useCallback(async (type) =>{
		alert("aqui");
		try {
			await saleOrderMethods.updateStatus(data.sale_orders[0].id, type, providerId);
			const order         = await saleOrderMethods.getSaleOrder(data.code, providerId);
			const orderResponse = await order.json();
			alertActions.openAlert({
				message  : "Se ha actualizado el estatus correctamente",
				type     : "success",
				duration : 3000,
			});
			setData(orderResponse);
			scrollToTop();
			setTimeout(()=>{
				window?.cancelAnimationFrame(scrollToTop);
			}, 3000);
		} catch (error) {
			alertActions.openAlert({
				message  : "Error al intentar actualizar el estatus",
				type     : "error",
				duration : 3000,
			});
		}
	}, [alertActions, data.sale_orders, data.code, providerId]);

	const handleAction = useCallback(async (type) => {
		switch (type) {
			case "PAID": {
				updateStatus(type);
			}
				break;

			case "READY":
				updateStatus(type);
				break;

			case "CANCELED":
				updateStatus(type);
				break;

			case "DECLINED":
				updateStatus(type);
				break;

			case "SENT":
				updateStatus(type);
				break;

			case "DELIVERED":
				updateStatus(type);
				break;

			default:
				break;
		}
	}, [updateStatus]);

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

	return (
		<AdminLayout>
			<TitlePage
				url="/admin/orders"
				nameUrl="Pedidos"
				divider={false}
			/>
			<OrderDetails delegations = {{
				data,
				orderDetails,
				customer,
				handleAction,
				handleClickOpen,
			}} />
		</AdminLayout>
	);
};

OrderDetailsContainer.propTypes = {
	orderData     : PropTypes.object.isRequired,
	customer      : PropTypes.object.isRequired,
	alertActions  : PropTypes.object.isRequired,
	providerId    : PropTypes.number.isRequired,
	dialogActions : PropTypes.any,
};

const mapDispatchToProps = bindAll({
	AlertActions,
	DialogActions,
});

export default connect(null, mapDispatchToProps)(OrderDetailsContainer);
