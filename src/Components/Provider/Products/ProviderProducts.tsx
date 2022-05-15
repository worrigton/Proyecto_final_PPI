import { connect } from "react-redux";

import PrivateProviderRoute from "~/Components/Provider/PrivateProviderRoute";
import ProviderLayout       from "~/Components/Provider/ProviderLayout";
import ProductsOfProvider   from "~/Components/Products/ProductsOfProvider";
import useStyles            from "./styles";

interface Props {
	token : string;
};

const ProviderProducts: React.FC<Props> = ({ token }) => {
	const classes = useStyles();
	return (
		<PrivateProviderRoute>
			<ProviderLayout>
				<div className={classes.root}>
					<ProductsOfProvider token={token} />
				</div>
			</ProviderLayout>
		</PrivateProviderRoute>
	);
};

const mapStateToProps    = ({ userReducer }) => ({
	token : userReducer?.provider?.token,
});

export default connect(mapStateToProps, null)(ProviderProducts);
