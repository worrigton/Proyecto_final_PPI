import Header            from "~/Components/Customer/Header";
import Footer            from "~/Components/Customer/Footer";
import BannerHome        from "./BannerHome";
import Why               from "./Why";
import ParallaxHome      from "./ParallaxHome";
import How               from "./How";
import ParallaxSecondary from "./ParallaxSecondary";
import { Hidden }        from "@material-ui/core";

const CustomerLayoutHome = () => (
	<>
		<Hidden smDown>
			<Header />
		</Hidden>
		<BannerHome />
		<Why />
		<ParallaxHome />
		<How />
		<ParallaxSecondary />
		<Footer />
		<style global jsx>{`
			body {
				background : #ffffff !important;
				scroll-behavior: smooth;
			}
		`}</style>
	</>
);

export default CustomerLayoutHome;
