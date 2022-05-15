import {
	Container,
	Grid,
	Paper,
} from "@material-ui/core";
import PropTypes from "prop-types";

// Import Own Components
//import shipping                from "~/Resources/img/Proveedor/envios.png";
//import volumeProfiles          from "~/Resources/img/Proveedor/perfiles-de-volumen.png";
import PrivateProviderRoute      from "~/Components/Provider/PrivateProviderRoute";
import ProviderLayout            from "~/Components/Provider/ProviderLayout";
import ConfigurationCard         from "~/Components/ConfigurationCard";
import general                   from "~/Resources/img/Proveedor/general.png";
import paymentMethods            from "~/Resources/img/Proveedor/metodos-de-pago.png";
import suscription               from "~/Resources/img/Proveedor/suscripcion.png";
import info                      from "~/Resources/img/Proveedor/info-de-inicio.png";
import { Typography, NavLink }   from "~/ToolKit";
import withStateLoaded           from "~/Store/withStateLoaded";
import { FaExclamationTriangle } from "~/Resources/icons/fas";
import useStyles                 from "./styles";

const ConfigurationPage = ({ data }) => {
	const classes = useStyles();

	const infoCard = [
		{
			id          : 1,
			url         : "/proveedor/general",
			img         : general,
			title       : "General",
			description : "Añade y actualiza los detalles de tu tienda.",
		},
		/*{
			id          : 2,
			url         : "/proveedor/shipping",
			img         : shipping,
			title       : "Perfil de envíos",
			description : "Editar los costos de los envíos para entregas",
		},*/
		/*{
			id          : 3,
			url         : "/proveedor/volume-profiles",
			img         : volumeProfiles,
			title       : "Perfiles de volumen",
			description : "Crea perfiles para ofrecer descuento por volumne de algún producto",
		},*/
		{
			id          : 4,
			url         : "/proveedor/suscripcion",
			img         : suscription,
			title       : "Subscripción Zoko",
			description : "Consulta los beneficios y los datos de la subcripción contratada.",
		},
		{
			id          : 5,
			url         : "/proveedor/metodos-de-pago",
			img         : paymentMethods,
			title       : "Métodos de pago",
			description : "Administra tus método de pago para el cobro mensual de tu suscripción.",
		},
		{
			id          : 6,
			url         : "/proveedor/perfil",
			img         : info,
			title       : "Información de inicio",
			description : "Edita tu información como usuario.",
		},
	];

	return (
		<PrivateProviderRoute>
			<ProviderLayout>
				<Container fixed className = {classes.container}>
					<Grid
						container
						direction="row"
						alignItems="stretch"
					>
						<Grid
							item
							xs={12}
							className={classes.gridPadding}>
							<Typography
								type="header2"
								fontWeight="bold"
							>
								Configuración
							</Typography>
						</Grid>
						<Grid
							item
							xs={12}
							className={classes.gridPadding}
						>
							{ data.membership.status !== "ACTIVE" && (
								<Paper>
									<Grid container className={classes.flex}>
										<Grid item className={classes.flex}>
											<FaExclamationTriangle className={classes.icon} />
										</Grid>
										<Grid item>
											<Typography
												type="header3"
												className={classes.noProducts}
												color="grey"
												fontWeight="600"
											>
												No cuentas con una subscripción activa
											</Typography>
											<Typography
												type="header4"
											>
												Actualiza tu método de pago para renovar tu subscripción desde
												<NavLink
													href="/proveedor/metodos-de-pago"
													name="aquí"
													hover="primary"
													color="secondary"
												/>
											</Typography>
										</Grid>
									</Grid>
								</Paper>
							)}
						</Grid>
						{ infoCard.map((info) => (
							<Grid
								item
								xs={12}
								sm={6}
								md={4}
								className={classes.gridPadding}
								key={info.id}
							>
								<ConfigurationCard
									url={info.url}
									img={info.img}
									title={info.title}
									description={info.description}
									className={classes.alignCenter}
								/>
							</Grid>
						)) }
					</Grid>
				</Container>
			</ProviderLayout>
		</PrivateProviderRoute>
	);
};

ConfigurationPage.propTypes = {
	data : PropTypes.any,
};

const mapStateToProps = ({ userReducer : { provider } }) => ({ data : provider?.data?.provider });

export default withStateLoaded(mapStateToProps, null)(ConfigurationPage);

