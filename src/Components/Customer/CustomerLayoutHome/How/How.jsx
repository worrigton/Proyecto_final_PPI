import Bounce from "react-reveal/Bounce";
import Zoom   from "react-reveal/Zoom";
import {
	Container,
	Grid,
	Hidden,
} from "@material-ui/core";

// Import Own Components
import Typography       from "~/ToolKit/Typography";
import MultipleCarousel from "~/Components/MultipleCarousel";
import CardMedia        from "~/Components/CardMedia";
import imgRegistrate    from "~/Resources/img/Cliente/registrate.png";
import imgEncuentra     from "~/Resources/img/Cliente/encuentra.png";
import imgPedido        from "~/Resources/img/Cliente/levanta-pedido.png";
import useStyles        from "./styles";

const How = () => {
	const classes = useStyles();

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
					>
						<Hidden xsDown>
							<Grid
								item
								xs={12}
								className={classes.titlePadding}
							>
								<Bounce bottom delay={10} duration={1500}>
									<Typography
										type="header1"
										fontWeight="600"
									>
										Fácil y Sencillo
									</Typography>
								</Bounce>
							</Grid>
							<MultipleCarousel settingsProps={null}>
								<Bounce bottom delay={10} duration={1500}>
									<CardMedia
										image={imgRegistrate}
										title={"1. Regístrate"}
										height={186}
										typeTitle={"header3"}
										body={`
											Crear una cuenta es gratis y podrás 
											disfrutar de todos los beneficios al instante.
										`}
									/>
								</Bounce>
								<Bounce bottom delay={10} duration={1500}>
									<CardMedia
										image={imgEncuentra}
										title={"2. Encuentra tus productos"}
										height={186}
										typeTitle={"header3"}
										body={`
											Busca en nuestro catálogo que incluye decenas 
											de productos y cientos de variedades.
										`}
									/>
								</Bounce>
								<Bounce bottom delay={10} duration={1500}>
									<CardMedia
										image={imgPedido}
										title={"3. Levanta tu pedido"}
										height={186}
										typeTitle={"header3"}
										body={`
											Añade tantos productos como desees y 
											realiza tu pedido en cuestión de minutos.
										`}
									/>
								</Bounce>
							</MultipleCarousel>
						</Hidden>

						<Hidden smUp>
							<Grid
								item
								xs={12}
								className={classes.titlePadding}
							>
								<Zoom clear delay={10} duration={1500}>
									<Typography
										type="header1"
										fontWeight="400"
									>
										Fácil y Sencillo
									</Typography>
								</Zoom>
							</Grid>
							<Zoom clear delay={10} duration={1500}>
								<CardMedia
									image={imgRegistrate}
									title={"1. Regístrate"}
									height={186}
									typeTitle={"header2"}
									fontWeight={700}
									body={`
										Crear una cuenta es gratis y podrás 
										disfrutar de todos los beneficios al instante.
									`}
								/>
							</Zoom>
							<Zoom clear delay={10} duration={1500}>
								<CardMedia
									image={imgEncuentra}
									title={"2. Encuentra tus productos"}
									height={186}
									typeTitle={"header2"}
									fontWeight={700}
									body={`
										Busca en nuestro catálogo que incluye decenas 
										de productos y cientos de variedades.
									`}
								/>
							</Zoom>
							<Zoom clear delay={10} duration={1500}>
								<CardMedia
									image={imgPedido}
									title={"3. Levanta tu pedido"}
									height={186}
									typeTitle={"header2"}
									fontWeight={700}
									body={`
										Añade tantos productos como desees y 
										realiza tu pedido en cuestión de minutos.
									`}
								/>
							</Zoom>
						</Hidden>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
};

export default How;
