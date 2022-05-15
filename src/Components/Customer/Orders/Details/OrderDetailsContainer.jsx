/* eslint-disable camelcase */
/* eslint-disable react-hooks/exhaustive-deps */
import {
	useState,
	useEffect,
	useCallback }   from "react";
import { Container, useTheme } from "@material-ui/core";
import { connect }             from "react-redux";
import { PropTypes }           from "prop-types";
import { useRouter }           from "next/router";

// Import own components
import { bindAll }      from "~/Util";
import Service          from "~/Service";
import saleOrderMethods from "~/Service/saleOrders";
import AlertActions     from "~/Components/Alert/store/actions";
import DialogActions    from "~/Components/Dialog/store/actions";
import SendVoucher      from "~/Components/SendVoucher";
import CustomerLayout   from "~/Components/Customer/CustomerLayout";
import ModalScore 	    from "~/Components/Provider/ModalScore";
import OrderDetails     from "./OrderDetails";
import useStyles        from "./styles";

const OrderDetailsContainer = ({ data, provider, dialogActions, alertActions, customer }) => {
	const classes = useStyles();
	const theme   = useTheme();
	const router  = useRouter();

	const [orderDetails, setOrderDetails]     = useState();
	const [showScoreModal, setShowScoreModal] = useState({ show : false });

	useEffect(()=>{
		const amount       = data.sale_orders[0].amount;
		const shippingCost = data.sale_orders[0].shipping_cost;
		const discount     = data.sale_orders[0].discount;
		const subtotal     = (amount / 1.16);
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

	const downloadFile = useCallback((id) => {
		window?.open(`/api/files/${id}`);
	}, []);

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

	const handleQualifyClient = useCallback((id) => {
		setShowScoreModal({ show : true, id });
	}, [showScoreModal]);

	const handleCloseScoreModal = useCallback(() => {
		setShowScoreModal({ show : false });
	}, [showScoreModal]);

	const submitQualification = useCallback( async (rating) => {
		const response = await Service.api.customer.qualify(
			provider?.user_id,
			customer?.data?.id,
			rating * 2,
			"customer");
		if (response.status) {
			alertActions.openAlert({
				message  : "Calificado con exito",
				type     : "success",
				duration : 3000,
			});
			router.reload();
		}
	}, [customer]);

	const handleCancelOrder =  useCallback( async (data) =>  {
		const response = await saleOrderMethods.cancelSaleOrder(data.id, "DECLINED", data.note, data.providerId);
		if (response.ok) {
			alertActions.openAlert({
				message  : "Orden Cancelada",
				type     : "success",
				duration : 3000,
			});
			router.reload();
		}
	}, []);

	return (
		<CustomerLayout>
			<Container fixed className={classes.container}>
				<OrderDetails delegations={{
					data,
					orderDetails,
					provider,
					downloadFile,
					handleClickOpen,
					handleQualifyClient,
					handleCloseScoreModal,
					submitQualification,
					handleCancelOrder,
				}} />
				<ModalScore delegations={{
					orderDetails,
					showScoreModal,
					customer : provider,
					handleCloseScoreModal,
					submitQualification,
				}} />
			</Container>
		</CustomerLayout>
	);
};

OrderDetailsContainer.propTypes = {
	data          : PropTypes.object.isRequired,
	provider      : PropTypes.object.isRequired,
	dialogActions : PropTypes.any,
	alertActions  : PropTypes.any,
	customer      : PropTypes.any,
};

const mapDispatchToProps = bindAll({
	DialogActions,
	AlertActions,
});

const mapStateToProps = (
	{ userReducer : { customer } }) => (
	{ customer : customer }
);

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailsContainer);
