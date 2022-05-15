import {
	Divider,
	useTheme,
	useMediaQuery,
} from "@material-ui/core";

// Import Own Components
import { useRedirectTo }          from "~/Util/Hooks";
import withStateLoaded            from "~/Store/withStateLoaded";
import { Button }                 from "~/ToolKit";
import PrivateProviderRoute       from "~/Components/Provider/PrivateProviderRoute";
import ProviderLayout             from "~/Components/Provider/ProviderLayout";
import BackButton                 from "~/Components/BackButton";
import { ProductDetailsProvider } from "~/Components/Provider/ProductDetails";
import ProductInfo                from "./ProductInfo";
import VolumeDiscounts            from "./VolumeDiscounts";
import QualityAndSize             from "./QualityAndSize";
import Summary                    from "./Summary";
import { ProductDetailsContext }  from ".";
import useStyles                  from "./styles";
import PublishProduct 			  from "./PublishProduct/PublishProductContainer";

const ProductDetails = (props) => {
	const theme      = useTheme();
	const classes    = useStyles();
	const redirectTo = useRedirectTo();

	const onMobile = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<ProductDetailsProvider
			{...props}
			type="provider"
			onSuccess={redirectTo("/proveedor/productos")}
			onFail={redirectTo("/proveedor/inicio")}
		>
			<PrivateProviderRoute>
				<ProviderLayout>
					<div className={classes.root}>
						<div className="limits">
							<BackButton
								className="backButton"
								text="Buscar producto"
								redirectTo="/proveedor/nuevo-producto"
							/>

							<div className="content">
								<div className="mainContent">
									<ProductInfo />

									<VolumeDiscounts />

									<QualityAndSize />
								</div>

								{ !onMobile && (
									<Summary />
								)}
							</div>

							<Divider />

							<div className="submitBtnContainer">
								<div className={classes.grow} />
								<ProductDetailsContext.Consumer>
									{ ({ toggleDrawer }) => (
										<Button
											color="primary"
											onClick={toggleDrawer(true)}
										>
											Continuar
										</Button>
									) }
								</ProductDetailsContext.Consumer>
							</div>

							<div className="publishProduct">
								<PublishProduct />
							</div>
						</div>
					</div>
				</ProviderLayout>
			</PrivateProviderRoute>
		</ProductDetailsProvider>
	);
};

const mapStateToProps = ({ userReducer : { provider } }) => ({ providerId : provider?.data?.provider?.id });

export default withStateLoaded(mapStateToProps, null)(ProductDetails);
