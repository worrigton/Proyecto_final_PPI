import {
	Container,
} from "@material-ui/core";
import Flash from "react-reveal/Flash";

// Import Own Components
import Parallax               from "~/Components/Parallax";
import banner                 from "~/Resources/img/Proveedor/banner-clientes.jpg";
import { FaArrowCircleRight } from "~/Resources/icons/fal";
import useStyles              from "./styles";

const ParallaxSecondary = () => {
	const classes = useStyles();

	return (
		<div className={classes.containerParallax}>
			<Container fixed>
				<Parallax
					title="¿Deseas comprar en ZoKo?"
					subtitle="Ir al sitio para clientes"
					height="300px"
					btnContainer={<Flash delay={100} duration={2000}>
						<FaArrowCircleRight className={classes.iconButtonClass} />
					</Flash>}
					btnColor="white"
					alignment="right"
					background={banner}
					color={false}
					btn={false}
					url="/"
				/>
			</Container>
		</div>
	);
};

export default ParallaxSecondary;
