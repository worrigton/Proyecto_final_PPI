/* eslint-disable react/jsx-indent */
import { Container } from "@material-ui/core";
import {
	Grid,
	FormControl,
	Divider,
} from "@material-ui/core";


// Import Own Components
import PrivateProviderRoute from "~/Components/Provider/PrivateProviderRoute";
import ProviderLayout       from "~/Components/Provider/ProviderLayout";
import TitlePage            from "~/Components/TitlePage";
import ContentLayout        from "~/Components/ContentLayout";
import useStyles            from "./styles";

const ShippingProfile = () => {
	const classes = useStyles();

	return (
		<PrivateProviderRoute>
			<ProviderLayout>
				<Container fixed className={classes.container}>
					<TitlePage
						title="Perfiles de Envíos"
						url="/proveedor/cuenta"
						nameUrl="Configuración"
					/>
					<ContentLayout
						title="Costos de envío"
						description={`
								El costo de envío es la cantidad que paga tus clientes para
								recibir sus pedidos en cada una de las regiones. Puedes administrar las
								regiones desde la sección de ajustes General.
								Si el pedido de un cliente supera el volumen máximo del último perfil, se
								realizará el envío en dos o más partes, dependiendo del vehículo que cumpla
								con los requisitos del volumen.`}
					>
						<FormControl className={classes.formControl}>
							<Grid
								container
								direction="row"
								justify="flex-start"
								alignItems="center"
							>
								{/*Se requiere traer los lugares de distribución*/}
								<></>
							</Grid>
						</FormControl>
					</ContentLayout>
					<Divider className={classes.hr} />
				</Container>
			</ProviderLayout>
		</PrivateProviderRoute>
	);
};

export default ShippingProfile;
