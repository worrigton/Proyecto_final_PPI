/* eslint-disable camelcase */
import {
	Paper,
	Grid,
	Divider,
} from "@material-ui/core";
import { PropTypes } from "prop-types";
import { useRouter } from "next/router";

// import own components
import {
	Button,
	ButtonWithoutStyles as Clicker,
	Typography,
} from "~/ToolKit";
import { FaDotCircle }    from "~/Resources/icons/far";
import { FaFileDownload } from "~/Resources/icons/fas";
import toCurrency         from "~/Util/formatToCurrency";
import useStyles          from "./styles";

const OrderDetailsResume = ({
	delegations : {
		data,
		orderDetails,
		handleAction,
		downloadFile,
		handleClickOpen,
	},
	customer,
}) => {
	let flags   = data.sale_orders[0].flags?.split(",");
	flags = flags || null;

	const classes = useStyles();
	const router  = useRouter();
	return (
		<Paper className={classes.root}>
			<Grid className={classes.titleSection} container>
				<Grid item xs={6}>
					<Typography
						type="header4"
						fontWeight="600"
						className={classes.labelWithIcons}
					>
						{
							flags?.includes("PAID") ? (
								<>
									<FaDotCircle className={classes.success} /> Pagado
								</>
							) : (
								<>
									<FaDotCircle className={classes.warning} /> Pago pendiente
								</>
							)
						}
					</Typography>
				</Grid>
				{
					(data?.sale_orders[0].voucher_id || data?.sale_orders[0].bill_id) && (
						<Grid item xs={6} container justify="flex-end">
							{(data?.sale_orders[0].voucher_id) && (
								<Clicker onClick={() => downloadFile(data?.sale_orders[0].voucher_id)}>
									<Typography
										className={`${classes.textOrange} ${classes.labelWithIcons}`}
										type="header4"
										fontWeight="300">
										<FaFileDownload /> Ficha de pago
									</Typography>
								</Clicker>
							)}
							{(data?.sale_orders[0].bill_id) && (
								<Clicker onClick={() => downloadFile(data?.sale_orders[0].bill_id)}>
									<Typography
										className={`${classes.textOrange} ${classes.labelWithIcons}`}
										type="header4"
										fontWeight="300">
										<FaFileDownload /> Factura
									</Typography>
								</Clicker>
							)}
						</Grid>
					)
				}
			</Grid>
			<Grid className={classes.titleSection} container>
				<Grid item xs={3} container direction="row">
					<Grid xs={12}>
						Subtotal
					</Grid>
					{/* <Grid xs={12}>
						Impuesto
					</Grid>
					<Grid xs={12}>
						Costo de envio
					</Grid> */}
					<Grid xs={12}>
						Descuentos
					</Grid>
					<Grid xs={12}>
						Total
					</Grid>
				</Grid>
				<Grid item xs={3} container direction="row">
					<Grid xs={12}>
						{data.sale_orders[0].products.length} articulos
					</Grid>
					{/* <Grid xs={12}>
						IVA 16%
					</Grid> */}
					<Grid xs={12}>
						<></>
					</Grid>
				</Grid>
				{
					orderDetails && (
						<Grid item xs={6} container direction="row" justify="flex-end">
							<Grid xs={12} className={classes.textRight}>
								{toCurrency(orderDetails.amount - (orderDetails.discount * 1.16))}
							</Grid>
							{/* <Grid xs={12} className={classes.textRight}>
								{toCurrency(orderDetails.iva)}
							</Grid> */}
							{/* <Grid xs={12} className={classes.textRight}>
								{toCurrency(orderDetails.shippingCost)}
							</Grid> */}
							<Divider />
							<Grid xs={12} className={classes.textRight}>
								- {toCurrency(orderDetails.discount * 1.16)}
							</Grid>
							<Grid xs={12} className={classes.textRight}>
								{toCurrency(orderDetails.amount)}
							</Grid>
						</Grid>
					)
				}
			</Grid>
			<Divider className={classes.separator} />
			<Grid container>
				<Grid item xs={6}>
					<Typography> Pagado por el cliente</Typography>
				</Grid>
				<Grid item xs={6}>
					{
						orderDetails && (
							<Typography className={classes.textRight}>{toCurrency(orderDetails.amount)}</Typography>
						)
					}
				</Grid>
			</Grid>
			<Grid item xs={12} container justify="flex-end">
				{
					router.route.includes("customer") &&
					( customer && !data?.sale_orders[0]?.voucher_id && (
						<Button
							onClick={() => handleClickOpen(data?.sale_orders[0].id, "VOUCHER")}
							color="primary"
							className={classes.buttonComprobante}>Cargar comprobante
						</Button>
					))
				}
				{ router.route.includes("provider") && (
					!customer && !data?.sale_orders[0]?.bill_id && (
						<Button
							onClick={() => handleClickOpen(data?.sale_orders[0].id, "BILL")}
							color="white"
							className={classes.buttonComprobante}>Cargar factura
						</Button>
					)
				)}
				{ (router.route.includes("provider") || router.route.includes("admin")) && (
					!customer && (!flags || !flags.includes("PAID")) && (
						<Button
							onClick={() => handleAction("PAID")}
							color="primary"
							className={classes.buttonComprobante}>Marcar como pagado
						</Button>
					)
				)}
			</Grid>
		</Paper>
	);
};

OrderDetailsResume.propTypes = {
	delegations : PropTypes.object.isRequired,
	customer    : PropTypes.bool,
};

OrderDetailsResume.defaultProps = {
	customer : false,
};

export default OrderDetailsResume;
