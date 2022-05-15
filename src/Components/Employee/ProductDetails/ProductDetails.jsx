import PropTypes from "prop-types";
import {
	Divider,
	useTheme,
	useMediaQuery,
} from "@material-ui/core";

// Import Own Components
import { useRedirectTo }          from "~/Util/Hooks";
import { Button }                 from "~/ToolKit";
import BackButton                 from "~/Components/BackButton";
import EmployeeLayout             from "~/Components/Employee/EmployeeLayout";
import { ProductDetailsProvider } from "~/Components/Provider/ProductDetails";
import ProductInfo                from "~/Components/Provider/ProductDetails/ProductInfo";
import VolumeDiscounts            from "~/Components/Provider/ProductDetails/VolumeDiscounts";
import QualityAndSize             from "~/Components/Provider/ProductDetails/QualityAndSize";
import Summary                    from "~/Components/Provider/ProductDetails/Summary";
import { ProductDetailsContext }  from "~/Components/Provider/ProductDetails";
import PublishProduct 			  from "~/Components/Provider/ProductDetails/PublishProduct/PublishProductContainer";
import useStyles                  from "./styles";

const ProductDetails = (props) => {
	const { providerId } = props;
	const theme   = useTheme();
	const classes = useStyles();
	const redirectTo = useRedirectTo();
	const onMobile = useMediaQuery(theme.breakpoints.down("sm"));
	return (
		<EmployeeLayout>
			<ProductDetailsProvider
				{...props}
				type="employee"
				onSuccess={redirectTo(`/employee/products/${providerId}`)}
				onFail={redirectTo("/employee")}
			>
				<div className={classes.root}>
					<div className="limits">
						<BackButton
							className="backButton"
							text="Buscar producto"
							redirectTo = {`/employee/products/${providerId}/add`}
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
			</ProductDetailsProvider>
		</EmployeeLayout>
	);
};

ProductDetails.propTypes = {
	providerId : PropTypes.number.isRequired,
};

export default ProductDetails;
