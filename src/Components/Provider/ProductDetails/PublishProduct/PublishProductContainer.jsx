/* eslint-disable max-len */
import PropTypes from "prop-types";
import {
	useCallback,
	useContext,
	useEffect,
	useState } from "react";

// Import Own Components
import { bindAll }               from "~/Util";
import AlertActions              from "~/Components/Alert/store/actions";
import { ProductDetailsContext } from "~/Components/Provider/ProductDetails";
import PublishProduct            from "./PublishProduct";
import withStateLoaded           from "~/Store/withStateLoaded";
import Service                   from "~/Service";

const PublishProductContainer = ({ alertActions }) => {
	const [provider, setProvider] = useState({});
	const {
		data : {
			name,
			images,
			variants,
		},
		providerId,
		open,
		toggleDrawer,
		handleSubmit,
	} = useContext(ProductDetailsContext);

	useEffect(() => {
		(async () => {
			const { body : response } = await Service.api.provider.getProviderById(providerId);
			if (response) {
				setProvider(response);
			}
		})();
	}, [providerId]);

	const handleSubmitProduct = useCallback(()=>{
		const remaining = provider.membership.quantity_product - provider.total_active_products;
		if (remaining == 1) {
			alertActions.openAlert({
				message  : "Haz llegado al máximo de productos publicados, para publicar mas productos te recomendamos que adquieras un plan superior.",
				type     : "warning",
				duration : 3000,
			});
		} else {
			handleSubmit();
		}
	}, [provider, alertActions, handleSubmit]);

	return (
		<PublishProduct delegations = {{
			toggleDrawer,
			handleSubmitProduct,
			name,
			images,
			open,
			variants,
			provider }} />
	);
};

PublishProductContainer.propTypes = {
	alertActions : PropTypes.object,
};

const mapDispatchToProps = bindAll({
	AlertActions,
});

export default withStateLoaded(null, mapDispatchToProps)(PublishProductContainer);
