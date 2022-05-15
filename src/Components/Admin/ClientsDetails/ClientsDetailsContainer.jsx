/* eslint-disable react-hooks/exhaustive-deps */
import {
	useEffect,
	useState,
	useCallback,
} from "react";
import { useRouter } from "next/router";
import PropTypes     from "prop-types";
import _             from "lodash";


// Import Own Compoents
import AlertActions          from "~/Components/Alert/store/actions";
import withStateLoaded       from "~/Store/withStateLoaded";
import Service               from "~/Service";
import ClientsDetails        from "./ClientsDetails";
import { Typography, Span }  from "~/ToolKit";
import { bindAll }           from "~/Util";

const ClientsDetailsContainer = ({ token, alertActions }) => {
	const router  = useRouter();

	const [userData, setUserData] = useState({
		address    : [],
		data       : [],
		billing    : [],
		orders     : [],
		pagination : {},
	});
	const [billingSelect, SetBillingSelect] = useState("");
	const [message, setMessage]             = useState("");
	const [page, setPage]                   = useState(1);

	const activePage = useCallback((event, value) => {
		setPage(value);
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

	const handleSelect = useCallback(() => (evnt, newInputValue) => {
		const value = newInputValue != null ? newInputValue : "";
		if (value) {
			billingProfilesDetails(value);
		} else {
			SetBillingSelect("");
		}
	}, []);

	const addressDetails = useCallback((address) =>
		<Typography type="caption" color="grey">
			{`${address.street} #${address.ext_number},
				${address.int_number ? `interior: ${address.int_number},` : ""}
				${address.neighborhood}, ${address.city}, ${address.state}, ${address.country},
				${address.zip_code}`}
		</Typography>, []);

	const billingProfilesDetails = useCallback((billing) => {
		const { address : profile } = billing;
		const profileBilling = <div>
			<Typography type="caption" fontWeight="600">
				Régimen fiscal:
			</Typography>
			<Typography type="caption" color="grey">
				{billing.tax_regime == "MORAL" ?
					" Persona moral" : " Persona física"}
			</Typography>
			<br />
			<Typography type="caption" fontWeight="600">
				Nombre legal: </Typography>
			<Typography type="caption" color="grey">
				 {billing.name}
			</Typography>
			<br />
			<Typography type="caption" fontWeight="600">
				RFC: </Typography>
			<Typography type="caption" color="grey">
				 {billing.rfc}
			</Typography>
			<br />
			<Typography type="caption" fontWeight="600">
				Dirección: </Typography>
			<Typography type="caption" color="grey">
				{`${profile.street} #${profile.ext_number},
			${profile.int_number ? `interior: ${profile.int_number},` : ""}
			${profile.neighborhood}, ${profile.city}, ${profile.state}, ${profile.country},
			${profile.zip_code}`}
			</Typography>
		</div>;
		SetBillingSelect(profileBilling);
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
			return param.voucher_id ?
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
			if (token) {
				const { clientId } = router.query;
				if (clientId) {
					// eslint-disable-next-line no-undef
					const [responseAddress, responseBilling, response, orders ] = await Promise.all([
						Service.api.customer.getCustomerAddress(
							1,
							`per_page=1&customer_id=${clientId}`,
							"admin",
							token,
						),
						Service.api.customer.getBillingProfiles(
							1,
							`page_size=15&customer_id=${clientId}`,
							token,
						),
						Service.api.customer.userDetails(clientId, "admin", token),
						Service.api.customer.getOrder(page, `page_size=5&customer_id=${clientId}`, token, "admin"),
					]);
					if (response.status && responseAddress.status && responseBilling.status) {

						let newCollection = _.groupBy(orders.body?.collection, "buy_order_id");
						newCollection = Object.values(newCollection).reverse();
						setUserData({
							data       : response.body,
							address    : responseAddress.body,
							billing    : responseBilling.body,
							orders     : Object.values(newCollection),
							pagination : orders.body.pagination,
						});
					} else {
						setMessage("No se encontró este cliente");
					}
				}
			}
		})();
	}, [router, setUserData, page]);

	const handleDelete = useCallback(async (userId) => {
		const success = await Service.api.customer.delete(userId);
		if (success) {
			alertActions.openAlert({
				message  : "El cliente ha sido eliminado",
				type     : "success",
				duration : 3e3,
			});
			router.push("/admin/clients");
		} else {
			alertActions.openAlert({
				message  : "Error al eliminar la cuenta",
				type     : "error",
				duration : 3e3,
			});
		}
	}, []);

	return (
		<>
			<ClientsDetails
				delegations={{
					registryData,
					addressDetails,
					billingProfilesDetails,
					handleSelect,
					toOrderDetail,
					shippingFlags,
					statusFlags,
					statusFlagsCancel,
					invoicedFlags,
					invoicedBtn,
					paidBtn,
					hasComprobant,
					TotalAmount,
					activePage,
					userData,
					message,
					billingSelect,
					id : router.query.id,
					page,
					handleDelete,
				}}
			/>
		</>
	);
};

ClientsDetailsContainer.propTypes = {
	token        : PropTypes.any,
	alertActions : PropTypes.object.isRequired,
};

const mapDispatchToProps = bindAll({ AlertActions });

const mapStateToProps = ({ userReducer : { admin } }) => ({ token : admin?.token || null });

export default withStateLoaded(mapStateToProps, mapDispatchToProps)(ClientsDetailsContainer);
