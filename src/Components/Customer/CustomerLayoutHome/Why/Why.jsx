import Fade from "react-reveal/Fade";
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
import imgBetsProviders from "~/Resources/img/Cliente/BetsProviders.png";
import imgPrice         from "~/Resources/img/Cliente/Price.png";
import imgAvailability  from "~/Resources/img/Cliente/Availability.png";
import useStyles        from "./styles";

const Why = () => {
	const classes = useStyles();

	return (
		<div className={classes.container} id="por-que-zoko">
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
						<Fade top delay={50} duration={1000}>
							<Typography
								type="header1"
								fontWeight="600"
							>
								¿Por qué tocar a
							</Typography>
							<Typography
								type="header1"
								fontWeight="600"
							>
								nuestra puerta?
							</Typography>
						</Fade>
					</Grid>
					<Grid
						item
						xs={12}
					>
						<Hidden xsDown>
							<MultipleCarousel settingsProps={null}>
								<Fade top delay={50} duration={1000}>
									<CardMedia
										image={imgBetsProviders}
										title={"Los mejores proveedores"}
										body={`
											Elige entre cientos de productos de nuestra lista.
											Gran variedad de opciones, tamaño y calidades
											publicados por los mejores proveedores.
										`}
										height={250}
									/>
								</Fade>
								<Fade bottom delay={50} duration={1000}>
									<CardMedia
										image={imgPrice}
										title={"Comparador de precios"}
										body={`
											Compara todos los precios al instante y escoge el 
											mejor para ti. Tus compras nunca habían sido tan 
											sencillas.
										`}
										height={250}
									/>
								</Fade>
								<Fade top delay={50} duration={1000}>
									<CardMedia
										image={imgAvailability}
										title={"Disponibilidad 24/7"}
										body={`
											Compra en todo momento, cuando quieras y donde quieras.
										`}
										height={250}
									/>
								</Fade>
							</MultipleCarousel>
						</Hidden>

						<Hidden smUp>
							<Zoom bottom delay={50} duration={1000}>
								<CardMedia
									image={imgBetsProviders}
									title={"Los mejores proveedores"}
									body={`
										Elige entre cientos de productos de nuestra lista.
										Multitud de opciones, tamaño y calidades
										publicados por los mejores proveedores
									`}
									height={250}
								/>
							</Zoom>
							<Zoom bottom delay={50} duration={1000}>
								<CardMedia
									image={imgPrice}
									title={"Comparador de precios"}
									body={`
										Compara todos los precios al instante y escoge el 
										mejor para ti. Tus compras nunca habían sido tan 
										sencillas 
									`}
									height={250}
								/>
							</Zoom>
							<Zoom bottom delay={50} duration={1000}>
								<CardMedia
									image={imgAvailability}
									title={"Disponibilidad 24/7"}
									body={`
										Compra en todo momento, cuando quieras y donde quieras.
									`}
									height={250}
								/>
							</Zoom>
						</Hidden>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
};

export default Why;
