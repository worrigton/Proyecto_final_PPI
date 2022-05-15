// import { useMemo } from "react";
import {
	Container,
	Grid,
	Hidden,
} from "@material-ui/core";
import PropTypes from "prop-types";

// Import Own Components
import {
	Typography,
} from "~/ToolKit";
import PrivateCustomerRoute from "~/Components/Customer/PrivateCustomerRoute";
import CustomerLayout       from "~/Components/Customer/CustomerLayout";
import withStateLoaded      from "~/Store/withStateLoaded";
import BannerProducts       from "./BannerProducts/BannerProducts";
import HomeProducts         from "./HomeProducts/HomeProducts";
import useStyles            from "./styles";

const Home = ({
	firstName,
	delegations : {
		likeProduct,
		topProducts,
		message,
		message2,
	},
}) => {
	const classes = useStyles();

	return (
		<PrivateCustomerRoute>
			<CustomerLayout>
				<Hidden smDown>
					<Container maxWidth="lg" className={classes.container}>
						<Grid
							item
							xs={12}
							className={classes.gridPadding}>
							<Typography
								type="header1"
								fontWeight="600"
							>
								Bienvenido {firstName}
							</Typography>

							<BannerProducts />
							<HomeProducts
								title="Productos que estás siguiendo"
								message={message}
								productos={likeProduct}
							/>
							<HomeProducts
								title="Productos más vendidos"
								message={message2}
								productos={topProducts}
							/>
						</Grid>
					</Container>
				</Hidden>

				<Hidden mdUp>
					<Container className={classes.container}>
						<Grid
							item
							xs={12}
							className={classes.gridPadding}>
							<Typography
								type="header1"
								fontWeight="600"
							>
								Bienvenido {firstName}
							</Typography>
						</Grid>
						<BannerProducts />
						<Grid
							item
							xs={12}
							className={classes.gridPadding}>
							<HomeProducts
								title="Productos que estás siguiendo"
								message={message}
								productos={likeProduct}
							/>
							<HomeProducts
								title="Productos más vendidos"
								message={message}
								productos={topProducts}
							/>
						</Grid>
					</Container>
				</Hidden>
			</CustomerLayout>
		</PrivateCustomerRoute>
	);
};

Home.propTypes = {
	firstName   : PropTypes.string,
	delegations : PropTypes.object,
};

const mapStateToProps = ({ userReducer : { customer } }) => ({
	// eslint-disable-next-line camelcase
	firstName : customer?.data?.customer?.first_name,
});

export default withStateLoaded(mapStateToProps, null)(Home);
