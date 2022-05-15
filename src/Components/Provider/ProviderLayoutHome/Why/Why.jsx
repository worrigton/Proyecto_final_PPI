import Zoom from "react-reveal/Zoom";
import {
	Container,
	Grid,
	Hidden,
} from "@material-ui/core";

// Import Own Components
import Typography       from "~/ToolKit/Typography";
import MultipleCarousel from "~/Components/MultipleCarousel";
import CardMedia        from "~/Components/CardMedia";
import venderMasFacil   from "~/Resources/img/Proveedor/vende-mas-facil.png";
import llegaMasLejos    from "~/Resources/img/Proveedor/llega-mas-lejos.png";
import gannancias       from "~/Resources/img/Proveedor/ganancias-247.png";
import useStyles        from "./styles";

const Why = () => {
	const classes = useStyles();
	const info = [
		{
			image : venderMasFacil,
			title : "Vende más fácil",
			body  : `Maneja tus pedidos de una manera más rápida, simple y eficaz.
			 Monitorea el proceso de venta y administra tus ganancias desde el mismo lugar.`,
		},
		{
			image : llegaMasLejos,
			title : "LLega más lejos",
			body  : `Nos encargamos de hacer llegar tus productos a miles de clientes.
			 Olvídate de la labor de venta, jamás había sido tan sencillo darte a conocer.`,
		},
		{
			image : gannancias,
			title : "Ganancias 24/7",
			body  : `Vende en todo momento, incluso cuando tu competencia duerme. Puedes
			 ofertar tus productos y recibir ganancias cuando quieras.`,
		}];

	return (
		<div className={classes.container} id="como-funciona">
			<Container fixed>
				<Grid
					container
					direction="row"
					justify="center"
					alignItems="center"
				>
					<Grid
						item
						xs={12}
						className={classes.titlePadding}
					>
						<Zoom bottom delay={1} duration={1000}>
							<Typography
								type="header1"
								fontWeight="600"
							>
								Haz llegar tus productos a miles de
							</Typography>
							<Typography
								type="header1"
								fontWeight="600"
							>
								negocios en toda la ciudad
							</Typography>
						</Zoom>
					</Grid>
					<Hidden xsDown>
						<Grid
							item
							xs={12}
						>
							<MultipleCarousel settingsProps={null}>
								{info.map((item, id) => (
									<Zoom bottom delay={1} duration={1000} key={id}>
										<CardMedia
											image={item.image}
											title={item.title}
											body={item.body}
											height={220}
											typeTitle={"header3"}
										/>
									</Zoom>
								))}
							</MultipleCarousel>
						</Grid>
					</Hidden>

					<Hidden smUp>
						<Grid
							item
							xs={12}
						>
							{info.map((item, id) => (
								<Zoom
									bottom
									delay={1}
									duration={1000}
									key={id}
								>
									<CardMedia
										image={item.image}
										title={item.title}
										body={item.body}
										height={220}
										typeTitle={"header3"}
									/>
								</Zoom>
							))}
						</Grid>
					</Hidden>
				</Grid>
			</Container>
		</div>
	);
};

export default Why;
