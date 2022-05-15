import {
	Grid,
	Card,
	CardContent,
	Divider,
	CardHeader,
	FormControlLabel,
	Switch,
} from "@material-ui/core";
import { PropTypes } from "prop-types";

/* import our components */
import ResumeCart              from "../ShoppingCart/ResumeCart";
import CardDescription         from "~/Components/CardDescription";
import useStyles               from "./styles";
import GridContainer           from "~/Components/GridContainer";
import { Typography }          from "~/ToolKit";
import ShoppingCartItem        from "~/Components/ShoppingCart/ShoppingCartItem";
import DialogFromAddress       from "~/Components/Customer/AddressPage/DialogFromAddress";
import DialogFromBilling       from "~/Components/Customer/BillingPage/DialogFromAddress";
import {
	FaMapMarkerAlt,
	FaFileInvoiceDollar,
} from "~/Resources/icons/fal";

import SelectOptionContainer from "../../ToolKit/SelectOption/SelectOptionContainer";

const Checkout = ({
	delegations : {
		cart,
		customer,
		onChangeAddress,
		onChangeBilling,
		insertOrder,
		detailsBillings,
		details,
		setReload,
		reload,
		info : {
			address,
			billings,
			selectedAddress,
			selectedBillings,
		},
		billable,
		handleChangeBilling,
	},
}) => {
	const classes = useStyles();

	const Left = () => (
		<Grid>
			<Grid container>
				<Grid item xs={12}>
					<Typography
						type="header2"
						style={{ marginTop : "16px", marginBottom : "16px" }}
					>
						&nbsp;Confirmar Pedido
					</Typography>
				</Grid>
				<Grid item xs={12} className={classes.root}>
					<Card>
						<CardHeader title={
							<Grid container justify="space-between">
								<Typography type="body2" fontWeight={600}>Dirección de envío</Typography>
								<DialogFromAddress delegations={{ setReload, reload }} />
							</Grid>
						}
						/>
						<CardContent>
							<Grid container direction="column">
								<Grid item xs={12} md={6} className={classes.root}>
									{
										address && address.length > 0 ? (
											<>
												<SelectOptionContainer
													id = "address"
													valueSelect={selectedAddress}
													options={address}
													onChange={onChangeAddress}
													label = "Selecciona domicilio de entrega" />
											</>
										) : (
											<Typography>
												No hay direcciones guardadas.
											</Typography>
										)
									}
								</Grid>
								<Divider light />
								<Grid item container className={classes.root}>
									{selectedAddress != null &&
										<CardDescription
											description={details(selectedAddress)}
											icon={<FaMapMarkerAlt />}
										/>}
								</Grid>
							</Grid>
						</CardContent>
					</Card>
				</Grid>
				<Grid item xs={12} className={classes.root}>
					<FormControlLabel
						control={
							<Switch
								checked={billable}
								onChange={handleChangeBilling}
								name="checkedB"
								color="primary"
							/>
						}
						label="Requiero factura"
					/>
					{
						billable && (
							<Card>
								<CardHeader title={
									<Grid container justify="space-between">
										<Typography type="body2" fontWeight={600}>Datos de facturación</Typography>
										<DialogFromBilling delegations={{ setReload, reload }} />
									</Grid>
								}
								/>
								<CardContent>
									<Grid container direction="column">
										<Grid item xs={12} md={6} className={classes.root}>
											{
												billings ? (
													<SelectOptionContainer
														id = "billings"
														valueSelect={selectedBillings}
														options={billings}
														onChange={onChangeBilling}
														label = "Selecciona tus datos de facturación" />
												) : (
													<Typography>
														No hay datos de facturación
													</Typography>
												)
											}
										</Grid>
										<Divider light />{}
										{ selectedBillings &&
										<CardDescription
											description={detailsBillings(selectedBillings)}
											icon={<FaFileInvoiceDollar />}
										/>}
									</Grid>
								</CardContent>
							</Card>
						)
					}
				</Grid>
				<Grid item xs={12} className={classes.root}>
					<Card>
						<CardContent>
							<Grid container direction="column">
								{
									cart && Object.values(cart).map((item, index) => (
										<Grid item key={`item-list-${index}`}>
											<ShoppingCartItem edit={false} delegations={{ item }} />
											<Divider light />
										</Grid>
									))
								}
							</Grid>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</Grid>

	);

	return (
		<GridContainer
			leftItems={[<Left key={"cart-list"} />]}
			rightItems={[
				<ResumeCart
					insertOrder={insertOrder}
					selectedAddress={selectedAddress}
					selectedBillings={selectedBillings}
					checkout
					key={"details-list"}
				/> ]}
		/>
	);
};

Checkout.propTypes = {
	delegations : PropTypes.object.isRequired,
	insertOrder : PropTypes.func.isRequired,
};

export default Checkout;
