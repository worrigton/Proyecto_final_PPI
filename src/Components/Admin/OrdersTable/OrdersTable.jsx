/* eslint-disable prefer-template */
/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo }  from "react";
import PropTypes    from "prop-types";
import { useTheme } from "@material-ui/core";

// Import Own Components
import withStateLoaded           from "~/Store/withStateLoaded";
import { Table, StateIndicator } from "~/ToolKit";

const OrdersTable = ({ id }) => {
	const theme = useTheme();

	const columns = useMemo(() => [
		{
			id    : "order_id",
			head  : "Pedido",
			align : "center",
			style : {
				width      : "10%",
				color      : theme.palette.secondary.main,
				fontWeight : "bold",
				fontSize   : "1.1em",
			},
			format : data => `#${data}`,
		},
		{
			id    : "order_date",
			head  : "Fecha",
			align : "center",
			style : {
				fontSize : "1.2em",
				width    : "10%",
			},
			format : data => {
				const today        = new Date();
				const receivedDate = new Date(data);

				const day = receivedDate.getDate();

				return receivedDate.getDate() === today.getDate()
					? "Hoy"
					: `${day < 10 ? "0" + day : day}/${receivedDate.getMonth() + 1}/${receivedDate.getFullYear()}`;
			},
		},
		{
			id    : "provider",
			head  : "Proveedor",
			align : "center",
			style : {
				fontSize     : "1.2em",
				width        : "16%",
				overflow     : "hidden",
				textOverflow : "ellipsis",
				whiteSpace   : "nowrap",
			},
		},
		{
			id    : "client",
			head  : "Cliente",
			align : "center",
			style : {
				fontSize     : "1.2em",
				width        : "16%",
				overflow     : "hidden",
				textOverflow : "ellipsis",
				whiteSpace   : "nowrap",
			},
		},
		{
			id    : "payment_status",
			head  : "Pago",
			align : "center",
			style : {
				fontSize : "1.2em",
				width    : "16%",
			},
			format : data => (
				<StateIndicator type={data} color="white" />
			),
		},
		{
			id    : "flag",
			head  : "Preparación",
			align : "center",
			style : {
				fontSize : "1.2em",
				width    : "16%",
			},
			format : data => (
				<StateIndicator type={data} color="white" />
			),
		},
		{
			id    : "total",
			head  : "Total",
			align : "center",
			style : {
				fontSize : "1.2em",
				width    : "16%",
			},
			format : data => {
				const formatter = new Intl.NumberFormat("en-US", {
					style                 : "currency",
					currency              : "USD",
					minimumFractionDigits : 2,
				});

				return formatter.format(data);
			},
		},
	], []);

	const tabs = useMemo(() => [
		{
			label : "Todos",
		},
		{
			label : "Abierto",
		},
		{
			label : "No preparado",
		},
		{
			label : "Sin pagar",
		},
	], []);

	return (
		<Table
			indicatorColor="secondary"
			placeholder="Buscar pedidos"
			columns={columns}
			tabs={tabs}
			withToken
			url={`/api/users/${id}/orders`}
		/>
	);
};

OrdersTable.propTypes = {
	id : PropTypes.number.isRequired,
};

const mapStateToProps = ({ userReducer : { admin } }) => ({ id : admin?.data?.id || 0 });

export default withStateLoaded(mapStateToProps, null)(OrdersTable);

