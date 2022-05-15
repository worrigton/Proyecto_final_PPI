import PropTypes from "prop-types";

// Import Own Compoents
import withStateLoaded from "~/Store/withStateLoaded";
import Parallax        from "~/Components/Parallax";
import banner          from "~/Resources/img/Cliente/ribbon-cliente.png";
import useStyles       from "./styles";

const ParallaxBanner = ({ token }) => {
	const classes = useStyles();

	return (
		<div className={classes.containerParallax}>
			{token ? (
				<Parallax
					title="<p>Encuentra los mejores</p><p>proveedores y precios</p>"
					subtitle={"Siempre cerca de ti"}
					height="400px"
					background={banner}
				/>
			) : (
				<Parallax
					title="<p>Encuentra los mejores</p><p>proveedores y precios</p>"
					subtitle={"Siempre cerca de ti"}
					height="400px"
					url={"/customer/registry"}
					background={banner}
					btnContainer="Registrarme"
				/>
			)}
		</div>
	);
};

ParallaxBanner.propTypes = {
	token : PropTypes.any,
};

const mapStateToProps = ({ userReducer : { customer } }) => ({ token : customer?.token || null });

export default withStateLoaded(mapStateToProps, null)(ParallaxBanner);
