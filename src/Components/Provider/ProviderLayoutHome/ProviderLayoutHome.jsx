import PropTypes from "prop-types";

// Import Own Components
import withStateLoaded   from "~/Store/withStateLoaded";
import Footer            from "~/Components/Customer/Footer";
import BannerHome        from "./BannerHome";
import Why               from "./Why";
import ParallaxHome      from "./ParallaxHome";
import ParallaxSecondary from "./ParallaxSecondary";
import Affiliate         from "./Affiliate";
import Subscriptions     from "./Subscriptions";
import Doubts            from "./Doubts";

const ProviderLayoutHome = ({ loggedIn }) => (
	<>
		<BannerHome loggedIn={loggedIn} />
		<Why />
		<Affiliate loggedIn={loggedIn} />
		<ParallaxHome loggedIn={loggedIn} />
		<Subscriptions loggedIn={loggedIn} />
		<Doubts />
		<ParallaxSecondary />
		<Footer />
	</>
);

ProviderLayoutHome.propTypes = {
	loggedIn : PropTypes.bool,
};

ProviderLayoutHome.defaultProps = {
	loggedIn : false,
};


const mapStateToProps = ({ userReducer : { provider } }) => ({ loggedIn : Boolean(provider) });

export default withStateLoaded(mapStateToProps, null)(ProviderLayoutHome);
