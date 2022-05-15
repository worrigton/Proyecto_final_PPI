/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
import {
	useEffect,
	useCallback,
} from "react";
import { Grid, Divider } from "@material-ui/core";
import { PropTypes }     from "prop-types";

import {
	Typography,
	Button,
} from "~/ToolKit";
import saleOrderMethods from "~/Service/saleOrders";
import { FaDotCircle }  from "~/Resources/icons/far";
import useStyles        from "./styles";

const OrderDetailsProducts = ({
	products,
	customer,
	delegations : {
		data,
		handleAction,
	} }) => {
	const classes           = useStyles();
	// const [flags, setFlags] = useState([]);

	// useEffect(() => {
	// 	// eslint-disable-next-line camelcase
	// 	const flags = data?.sale_orders[0]?.flags?.split(",");
	// 	if (flags) {
	// 		setFlags(flags);
	// 	}
	// }, [data]);

	useEffect(() => {
		(async () => {
			if (customer.token) {
				await saleOrderMethods.updateStatusNotification(
					data?.sale_orders[0]?.id,
					products[0].provider_id,
					customer.token);
			}
		})();
	}, [customer.token]);

	const orderStatusLabel = useCallback(order => {
		let label;
		let status;

		if (order.status === "REQUESTED") {
			label = "No preparado";
			status = "warning";
		}

		if (order.status === "RUNNING") {
			if (order.shipping_status === "SENT" ) {
				label = "Pedido Enviado";
			}
			label = "Preparando pedido";
			status = "pending";
		}

		if (order.status === "FINISHED" ) {
			label = "Pedido Finalizado";
			status = "success";
		}

		if (order.status === "DECLINED") {
			label = "Pedido Cancelado por el cliente";
			status = "error";
		}

		if (order.status === "Canceled") {
			label = "Pedido Cancelado";
			status = "error";
		}

		return { label, status };
	}, []);

	return (
		<Grid container direction="column">
			<Grid item xs={12} className={classes.titleSection} container>
				<Grid item xs={6}>
					<Typography
						type="header4"
						fontWeight="600"
						className={classes.labelWithIcons}
					>
						<FaDotCircle className={classes[orderStatusLabel(data?.sale_orders[0]).status]} />
						{orderStatusLabel(data?.sale_orders[0]).label}
					</Typography>
				</Grid>
			</Grid>
			<Grid item>
				{
					products.map((product, index) => (
						<Grid key={product.name + index}>
							<Grid item container direction="row">
								<Grid
									xs={6} sm={6} md={2}
									className={classes.cartImageContainer}
									container
									justify="center"
									alignItems="center"
								>
									<img className={classes.cartImage} src={product.image} alt="Trulli" />
								</Grid>
								<Grid xs={6} sm={6} md={3} container direction="column">
									<Typography
										type="header4"
										fontWeight="700"
									>
										{product.name}
									</Typography>
									<Typography
										type="caption"
										color="grey2"
										fontWeight="600">Calidad : &nbsp;<b> {product.quality}</b> </Typography>
									<Typography
										color="grey2"
										type="caption"
										fontWeight="600">Tamaño : &nbsp;<b> {product.size}</b></Typography>
								</Grid>
								<Grid xs={4} md={2} container justify="center" alignItems="center">
									<Typography
										color="grey2"
										type="body2"
										className={classes.marginY}
									>
										{product.quantity} Kg.
									</Typography>
								</Grid>
								<Grid xs={4} md={4} container justify="center" alignItems="center">
									<Typography
										color="grey2"
										type="body2"
										className={classes.marginY}
									>
										{product.p_discount == null ? 0 : product.p_discount}% descuento por volumen
									</Typography>
								</Grid>
								<Grid xs={4} md={1} container justify="center" alignItems="center">
									<Typography
										color="grey2"
										type="body2"
										className={classes.marginY}
									>
										{product.cost.toLocaleString("es-MX",
											{ style : "currency", currency : "MXN" })}
									</Typography>
								</Grid>
							</Grid>
						</Grid>
					))
				}
			</Grid>
			<Grid item container justify="flex-end" className={classes.marginY}>
				{
					!customer && data?.sale_orders[0].status === "REQUESTED" && (
						<>
							<Divider className={classes.marginY} />
							<Button
								className={classes.marginY}
								onClick={()=> handleAction("READY")} color="primary"
							>
								Marcar como preparado
							</Button>
						</>
					)
				}
				{
					!customer &&
					data?.sale_orders[0].status === "RUNNING" &&
					data?.sale_orders[0].shipping_status === "READY" && (
						<>
							<Divider className={classes.marginY} />
							<Button
								className={classes.marginY}
								onClick={()=> handleAction("SENT")} color="primary"
							>
								Marcar como enviado
							</Button>
						</>
					)
				}
				{
					!customer &&
					data?.sale_orders[0].status === "RUNNING" &&
					data?.sale_orders[0].shipping_status === "SENT" && (
						<>
							<Divider className={classes.marginY} />
							<Button
								className={classes.marginY}
								onClick={()=> handleAction("DELIVERED")} color="primary"
							>
								Marcar como recibido por el cliente
							</Button>
						</>
					)
				}
			</Grid>
		</Grid>
	);
};

OrderDetailsProducts.propTypes = {
	products    : PropTypes.array.isRequired,
	customer    : PropTypes.bool,
	delegations : PropTypes.object.isRequired,
};

OrderDetailsProducts.defaultProps = {
	customer : false,
};

export default OrderDetailsProducts;
