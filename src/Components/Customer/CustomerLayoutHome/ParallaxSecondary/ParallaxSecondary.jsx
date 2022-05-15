import {
	Container,
	Grid,
} from "@material-ui/core";
import Zoom from "react-reveal/Zoom";

// Import Own Components
import Typography             from "~/ToolKit/Typography";
import Parallax               from "~/Components/Parallax";
import banner                 from "~/Resources/img/Cliente/banner-proveedores.jpg";
import logo                   from "~/Resources/img/logo-O.png";
import { FaArrowCircleRight } from "~/Resources/icons/fal";
import useStyles              from "./styles";

const ParallaxSecondary = () => {
	const classes = useStyles();

	return (
		<div className={classes.containerParallax}>
			<Zoom clear delay={20}>
				<Container fixed>
					<Grid container
						direction="column"
						justify="center"
						alignItems="center"
					>
						<img src={logo} alt="logo" />
						<Typography
							type="header2"
							fontWeight="lighter"
							className={classes.containerTitle}
						>
							Ideal para agricultores, productos, distribuidores e importadores de MAYOREO.
						</Typography>
					</Grid>
				</Container>
			</Zoom>
			<Container fixed>
				<Parallax
					title="¿Deseas anunciarte?"
					subtitle="Ir al sitio para proveedores"
					height="300px"
					btnContainer={<FaArrowCircleRight className={classes.iconButtonClass} />}
					btnColor="white"
					alignment="right"
					background={banner}
					color={false}
					btn={false}
					url="/proveedor"
				/>
			</Container>
		</div>
	);
};

export default ParallaxSecondary;
