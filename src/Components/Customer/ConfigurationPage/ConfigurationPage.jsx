import {
	Container,
	Grid,
} from "@material-ui/core";

// Import Own Components
import PrivateCustomerRoute from "~/Components/Customer/PrivateCustomerRoute";
import CustomerLayout       from "~/Components/Customer/CustomerLayout";
import ConfigurationCard    from "~/Components/ConfigurationCard";
import address              from "~/Resources/img/Cliente/direcciones.png";
import orders               from "~/Resources/img/Cliente/mis-pedidos.png";
import bill                 from "~/Resources/img/Cliente/facturacion.png";
import emails               from "~/Resources/img/Cliente/e-mails.png";
import sesion               from "~/Resources/img/Cliente/inicio-de-sesion.png";
import { Typography }       from "~/ToolKit";
import useStyles            from "./styles";

const ConfigurationPage = () => {
	const classes = useStyles();

	const infoCard = [
		{
			id          : 1,
			url         : "/cliente/direcciones",
			img         : address,
			title       : "Direcciones",
			description : "Editar direcciones para entregas y pedidos",
		},
		{
			id          : 2,
			url         : "/cliente/ordenes",
			img         : orders,
			title       : "Mis pedidos",
			description : "Consulta la información de tus pedidos",
		},
		{
			id          : 3,
			url         : "/cliente/perfil",
			img         : sesion,
			title       : "Inicio de seguridad",
			description : "Edita tu inicio de sesión y la información personal",
		},
		{
			id          : 4,
			url         : "/cliente/perfiles-de-facturacion",
			img         : bill,
			title       : "Facturación",
			description : "Modifica los perfiles para la facturación de tu compra",
		},
		{
			id          : 5,
			url         : "/cliente/notificaciones",
			img         : emails,
			title       : "Configuración de email",
			description : "Configura las notificaciones que deseas recibir por email",
		},
	];

	return (
		<PrivateCustomerRoute>
			<CustomerLayout>
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
			</CustomerLayout>
		</PrivateCustomerRoute>
	);
};

export default ConfigurationPage;
