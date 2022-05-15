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

const VolumeProfile = () => {
	const classes = useStyles();

	return (
		<PrivateProviderRoute>
			<ProviderLayout>
				<Container fixed className={classes.container}>
					<TitlePage
						title="Perfiles de volumen"
						url="/proveedor/cuenta"
						nameUrl="Configuración"
					/>
					<ContentLayout
						title="Detalles de la tienda"
						description={`
								Los perfiles te permiten ofrecer un descuento a tus clientes, las
								 compras se encuentran dentro del rango de volumen registrado, aplican
								 el descuento señalado al precio por unidad (kg).`}
					>
						<FormControl className={classes.formControl}>
							<Grid
								container
								direction="row"
								justify="flex-start"
								alignItems="center"
							>
								{/*Se requiere traer los productos vendidos*/}
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

export default VolumeProfile;
