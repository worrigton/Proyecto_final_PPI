import PropTypes from "prop-types";

// Import own Components
import Parallax  from "~/Components/Parallax";
import banner    from "~/Resources/img/Proveedor/ribbon-proveedor.jpg";
import useStyles from "./styles";

const ParallaxBanner = ({ loggedIn }) => {
	const classes = useStyles();

	return (
		<div className={classes.containerParallax}>
			{!loggedIn ? (
				<Parallax
					title="<p>Forma parte de ZoKo</p><p>e incrementa tus ventas</p>"
					height="400px"
					btnContainer="Registrarme"
					background={banner}
					btnColor="white"
					color={false}
					textColor
					url="/provider/registry"
				/>
			) : (
				<Parallax
					title="<p>Vende más con Zoko</p><p>e incrementa tus ventas</p>"
					height="400px"
					btnContainer="Mis productos"
					background={banner}
					btnColor="white"
					color={false}
					textColor
					url="/provider/products"
				/>
			)}
		</div>
	);
};

ParallaxBanner.propTypes = {
	loggedIn : PropTypes.bool,
};


export default ParallaxBanner;
