/* eslint-disable camelcase */
import {
	Grid,
	Hidden,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
} from "@material-ui/core";
import PropTypes from "prop-types";

// Import Own Components
import { Typography, Button }           from "~/ToolKit";
import PrivateProviderRoute             from "~/Components/Provider/PrivateProviderRoute";
import ProviderLayout                   from "~/Components/Provider/ProviderLayout";
import RoundedTable                     from "~/Components/RoundedTable";
import CardOrderCarousel                from "~/Components/CardOrderCarousel";
import CardProductCarousel              from "~/Components/CardProductCarousel";
import CardPausedProductCarousel        from "~/Components/CardPausedProductCarousel";
import CardsTable                       from "~/Components/CardsTable/CardsTable";
import Suscripcion                      from "~/Resources/img/Proveedor/suscripcion.png";
import { FaBoxes, FaMoneyCheckEditAlt } from "~/Resources/icons/fal";
import useStyles                        from "./styles";

const Home = ({
	delegations : {
		data : {
			newOrders,
			likedProducts,
			pausedProducts,
			providerData,
			message01,
			message02,
			message03,
		},
		total,
		activeProduct,
		handleClickOpen,
		handleClose,
		open,
		setOpen,
		productAct,
		setProductAct,
	},
}) => {
	const classes = useStyles();

	const objetosTabla1 = [
		{
			icon : <FaBoxes />,
			text : <>
				<Typography type="header4" fontWeight="700">
					{!total ? "No hay pedidos pendientes" :
						total > 1 ?
							`${providerData?.not_ready_sale_orders} pedidos necesitan prepararse`
							: `${providerData?.not_ready_sale_orders} pedido necesita prepararse`}
				</Typography>
			</>,
		},
		{
			icon : <FaMoneyCheckEditAlt className={classes.icon} />,
			text : <>
				<Typography type="header4" fontWeight="700">
					{ `${providerData?.not_payed_sale_orders} pagos ` }
				</Typography>
				<Typography>
					&nbsp; por capturar
				</Typography>
			</>,
		},
	];

	const objetosTabla2 = [
		{
			icon : <img
				src={Suscripcion}
				alt="Suscripcion"
				className={classes.img} />,
			text : <>
				<Typography type="header4">
					{ providerData?.membership
						? providerData?.membership.status === "ACTIVE"
							? `Suscripción: ${providerData?.membership?.membership}`
							: "Tu membresía a caducado"
						: "Aún no cuentas con una membresia" }
				</Typography>
			</>,
		},
		{
			text : <>
				<Typography type="header4" fontWeight="600">
					{
						providerData.membership?.status !== "ACTIVE" &&
						"Para publicar productos adquiere una membresia!"
					}
					{
						providerData.membership?.status === "ACTIVE" && providerData.membership?.subscription_id == 4
							&& `${providerData?.total_active_products} Productos publicados`

					}
					{
						providerData.membership?.status === "ACTIVE" && providerData.membership?.subscription_id !== 4
							&& `${providerData?.membership?.quantity_product - providerData?.total_active_products} 
							Productos disponibles`
					}
				</Typography>
			</>,
		},
	];

	return (
		<PrivateProviderRoute>
			<ProviderLayout>
				<Hidden smDown>
					<Grid
						item
						xs={12}
						className={classes.gridPadding}>
						<Typography
							type="header1"
							fontWeight="bold"
						>
							Inicio
						</Typography>
					</Grid>
					<Grid
						container
						direction="row"
						justify="space-between"
						alignItems="center"
					>
						<Grid
							item
							md={5}
							className={classes.gridPadding}
						>
							<RoundedTable objetos={objetosTabla1} />
						</Grid>
						<Grid
							item
							md={4}
							className={classes.gridPadding}
						>
							<RoundedTable objetos={objetosTabla2} />
						</Grid>
					</Grid>
					<Grid
						item
						xs={12}
						className={classes.gridPadding}
					>
						<CardsTable
							title="Nuevos pedidos"
							buttonText="Ir a pedidos"
							route="/proveedor/ordenes"
						>
							<CardOrderCarousel objetos={newOrders} message={message01} />
						</CardsTable>
					</Grid>
					<Grid
						item
						xs={12}
						className={classes.gridPadding}
					>
						<CardsTable
							title="Productos que estás siguiendo"
							buttonText="Actualizar precios"
							route="/proveedor/productos"
						>
							<CardProductCarousel objetos={likedProducts} message={message02} />
						</CardsTable>
					</Grid>
					<Grid
						item
						xs={12}
						className={classes.gridPadding}
					>
						<CardsTable
							title="Tus productos en pausa"
							buttonText=""
						>
							<CardPausedProductCarousel
								delegations={{
									objetos : pausedProducts,
									setOpen,
									open,
									setProductAct,
								}}
								message={message03}
							/>
						</CardsTable>
					</Grid>
				</Hidden>

				<Hidden mdUp>
					<Grid
						item
						xs={12}
						className={classes.gridPadding}>
						<Typography
							type="header2"
							fontWeight="bold"
						>
							Inicio
						</Typography>
					</Grid>
					<Grid
						container
						direction="row"
						justify="space-between"
						alignItems="center"
					>
						<Grid
							item
							xs={12}
							sm={6}
							className={classes.gridPadding}
						>
							<RoundedTable objetos={objetosTabla1} />
						</Grid>
						<Grid
							item
							xs={12}
							sm={5}
							className={classes.gridPadding}
						>
							<RoundedTable objetos={objetosTabla2} />
						</Grid>
					</Grid>
					<Grid
						item
						xs={12}
						className={classes.gridPadding}
					>
						<CardsTable
							title="Nuevos pedidos"
							buttonText="Ir a pedidos"
							route="/proveedor/ordenes"
						>
							<CardOrderCarousel objetos={newOrders} message={message01} />
						</CardsTable>
					</Grid>
					<Grid
						item
						xs={12}
						className={classes.gridPadding}
					>
						<CardsTable
							title="Productos que estás siguiendo"
							buttonText="Actualizar precios"
							route="/proveedor/productos"
						>
							<CardProductCarousel objetos={likedProducts} message={message02} />
						</CardsTable>
					</Grid>
					<Grid
						item
						xs={12}
						className={classes.gridPadding}
					>
						<CardsTable
							title="Tus productos en pausa"
							buttonText=""
						>
							<CardPausedProductCarousel
								delegations={{
									objetos : pausedProducts,
									setOpen,
									open,
									setProductAct,
								}}
								message={message03}
							/>
						</CardsTable>
					</Grid>
				</Hidden>
				<Dialog
					open={open}
					onClose={handleClose}
				>
					<DialogTitle>{"Activar productos"}</DialogTitle>
					<DialogContent>
						¿Estás seguro de activar este producto en pausa?
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} textColor color="white">
							Cancelar
						</Button>
						<Button onClick={activeProduct(productAct)} color="primary" autoFocus>
							Activar producto
						</Button>
					</DialogActions>
				</Dialog>
			</ProviderLayout>
		</PrivateProviderRoute>
	);
};

Home.propTypes = {
	suscription : PropTypes.string,
	delegations : PropTypes.object,
};

export default Home;
