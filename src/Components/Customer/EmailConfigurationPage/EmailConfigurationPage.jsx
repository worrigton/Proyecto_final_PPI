import {
	Container,
	Grid,
	Paper,
	FormControl,
} from "@material-ui/core";
import PropTypes                from "prop-types";
import { Typography, CheckBox, Button } from "~/ToolKit";

// Import Own Components
import PrivateCustomerRoute from "~/Components/Customer/PrivateCustomerRoute";
import CustomerLayout       from "~/Components/Customer/CustomerLayout";
import TitlePage            from "~/Components/TitlePage";
import useStyles            from "./styles";

const NotificationsPage = ({
	delegations : {
		handleChange,
		handleSubmit,
		checked,
	},
}) => {
	const classes = useStyles();

	return (
		<PrivateCustomerRoute>
			<CustomerLayout>
				<Container fixed className={classes.container}>
					<TitlePage
						title="Notificaciones"
						url="/cliente"
						nameUrl="Mi cuenta"
					/>
					<Grid
						container
						direction="row"
						justify="space-between"
						alignItems="flex-start"
					>
						<Grid
							item
							xs={12}
							md={4}
							className={classes.gridPadding}
						>
							<Typography
								type="header4"
								fontWeight="600"
							>
								Configuración de notificaciones
							</Typography>
							<br />
							<Typography
								type="paragraph"
								className={classes.description}
							>
								{"Elige las notificaciones que deseas recibir via correo electrónico sobre el "}
								{"estado de cuenta de un pedido. Recibirás automáticamete las notificaciones "}
								{"de la casillas marcadas."}
							</Typography>
						</Grid>
						<Grid
							container
							item
							xs={12}
							md={8}
						>
							<Paper className={classes.paperPadding}>
								<FormControl className={classes.formControl}>
									<Typography
										type="header4"
										fontWeight="600"
									>
										Estado de los pedidos
									</Typography>
									<br />
									<CheckBox
										label="Pedido realizado"
										description="Te enviaremos un email al finalizar tu pedido
										con las instrucciones para realizar el pago de tu compra"
										size="small"
										name="1"
										checked={checked[1]}
										onChange={handleChange}
									/>
									<hr className={classes.hr} />
									<CheckBox
										label="Pago aprobado"
										description="Te notificaremos automáticamente cuando el vendedor
										haya recibido tu pago"
										size="small"
										name="2"
										checked={checked[2]}
										onChange={handleChange}
									/>
									<hr className={classes.hr} />
									<CheckBox
										label="Pedido preparado"
										description="Te notificaremos automáticamente cuando el vendedor
										tenga listo tu pedido y haya iniciado el envío a tu dirección
										seleccionada"
										size="small"
										name="3"
										checked={checked[3]}
										onChange={handleChange}
									/>
									<hr className={classes.hr} />
									<CheckBox
										label="Pedido entregado"
										description="Te notificaremos automáticamente una confirmación de
										que la entrega de tu pedido fue exitosa"
										size="small"
										name="4"
										checked={checked[4]}
										onChange={handleChange}
									/>
									<hr className={classes.hr} />
									<CheckBox
										label="Pedido rechazado"
										description="Te notificaremos automáticamente si un vendedor ha cancelado
										alguno de tus pedidos y la razón por la cual no procedió la venta"
										name="5"
										size="small"
										checked={checked[5]}
										onChange={handleChange}
									/>
								</FormControl>
							</Paper>
							<Grid
								item
								xs={12}
								className={classes.gridButton}
							>
								<Button
									type="submit"
									color="primary"
									onClick={handleSubmit}
								>
									Guardar
								</Button>
							</Grid>
						</Grid>
					</Grid>
				</Container>
			</CustomerLayout>
		</PrivateCustomerRoute>
	);
};

NotificationsPage.propTypes = {
	delegations : PropTypes.object,
};

export default NotificationsPage;
