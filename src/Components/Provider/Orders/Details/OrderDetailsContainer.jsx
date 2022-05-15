/* eslint-disable react-hooks/exhaustive-deps */
import { useState,
	useEffect,
	useCallback,
} from "react";
import {
	useTheme,
	Container,
}  from "@material-ui/core";
import { connect }          from "react-redux";
import { PropTypes }        from "prop-types";
import { useRouter }        from "next/router";

// import own components
import TitlePage            from "~/Components/TitlePage/TitlePage";
import saleOrderMethods     from "~/Service/saleOrders";
import AlertActions         from "~/Components/Alert/store/actions";
import DialogActions        from "~/Components/Dialog/store/actions";
import { scrollToTop }      from "~/Util/ApiHelpers";
import { bindAll }          from "~/Util";
import SendVoucher          from "~/Components/SendVoucher";
import ModalScore 			from "~/Components/Customer/ModalScore";
import Service              from "~/Service";
import PrivateProviderRoute from "~/Components/Provider/PrivateProviderRoute/PrivateProviderRoute";
import ProviderLayout       from "~/Components/Provider/ProviderLayout/ProviderLayout";
import useStyles            from "./styles";
import OrderDetails         from "./OrderDetails";

const OrderDetailsContainer = ({
	orderData,
	customer,
	alertActions,
	providerId,
	dialogActions,
	userId,
}) => {
	const theme   = useTheme();
	const classes = useStyles();
	const router  = useRouter();

	const [data, setData] = useState(orderData);
	const [orderDetails, setOrderDetails] = useState();
	const [showScoreModal, setShowScoreModal] = useState({ show : false });

	useEffect(() => {
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

	const handleClickOpen = useCallback((id, type) => {
		dialogActions.openDialog({
			title   : "Cargar Factura",
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

	const handleQualifyClient = useCallback((id) => {
		setShowScoreModal({ show : true, id });
	}, [showScoreModal]);

	const handleCloseScoreModal = useCallback(() => {
		setShowScoreModal({ show : false });
	}, [showScoreModal]);

	const updateStatus = useCallback(async (type) => {
		alert("aqui");
		try {
			await saleOrderMethods.updateStatus(data.sale_orders[0].id, type, providerId);
			const order = await saleOrderMethods.getSaleOrder(orderData.code, providerId);
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
	}, [alertActions, data.sale_orders, orderData.code, providerId]);

	const submitQualification = useCallback( async (rating) => {
		const response = await Service.api.customer.qualify(
			userId,
			orderData.customer.user_id,
			rating * 2,
			"provider");
		if (response.status) {
			alertActions.openAlert({
				message  : "Calificado con exito",
				type     : "success",
				duration : 3000,
			});
			router.reload();
		}
	}, [orderData, userId]);

	const downloadFile = useCallback((id) => {
		window?.open(`/api/files/${id}`);
	}, []);

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

	return (
		<PrivateProviderRoute>
			<ProviderLayout>
				<Container fixed className={classes.container}>
					<TitlePage
						url="/proveedor/ordenes/"
						nameUrl="Ordenes"
					/>
					<OrderDetails delegations= {{
						data,
						orderDetails,
						customer,
						handleAction,
						handleClickOpen,
						handleQualifyClient,
						downloadFile,
					}} />
				</Container>
				<ModalScore delegations={{
					orderData,
					showScoreModal,
					customer,
					handleCloseScoreModal,
					submitQualification,
				}} />
			</ProviderLayout>
		</PrivateProviderRoute>
	);
};

OrderDetailsContainer.propTypes = {
	orderData       : PropTypes.object.isRequired,
	customer        : PropTypes.object.isRequired,
	alertActions    : PropTypes.object.isRequired,
	providerId      : PropTypes.number.isRequired,
	handleClickOpen : PropTypes.object.isRequired,
	dialogActions   : PropTypes.any,
	userId          : PropTypes.number.isRequired,
};

const mapDispatchToProps = bindAll({
	AlertActions,
	DialogActions,
});

const mapStateToProps = ({ userReducer : { provider } }) => ({
	userId : provider?.data?.id,
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailsContainer);
