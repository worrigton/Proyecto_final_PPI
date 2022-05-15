/* eslint-disable max-len */
import PropTypes               from "prop-types";
import { useEffect, useState } from "react";

// Import Own Compoents
import { bindAll }     from "~/Util";
import LoaderActions   from "~/Components/Loader/store/actions";
import withStateLoaded from "~/Store/withStateLoaded";
import Service         from "~/Service";
import Home            from "./Home";

const HomeContainer = ({ customerId, userId, loaderActions }) => {
	const [likeProduct, setLikeProducts] = useState([]);
	const [topProducts, setTopProducts]     = useState([]);
	const [message, setMessage]             = useState("");
	const [message2, setMessage2]           = useState("");

	useEffect(() => {
		(async () => {
			loaderActions.closeLoader();
			if (customerId) {
				const [{ body : responseLiked }, { body : responseTop }]
					// eslint-disable-next-line no-undef
					= await Promise.all([
						Service.api.product.productsPage(
							1,
							`page_size=10&cheaper_product=true&image_size=md&customer_id&user_liked_product=${userId}&only_offered=true`
						),
						Service.api.product.productsPage(
							1,
						`page_size=10&cheaper_product=true&image_size=md&customer_id=${customerId}&only_offered=true`
						),
					]);

				if (responseLiked?.collection?.length > 0) {
					setLikeProducts(responseLiked?.collection);
				} else {
					setMessage("No estás siguiendo ningún producto");
				}

				if (responseTop?.collection?.length > 0) {
					setTopProducts(responseTop?.collection);
				} else {
					setMessage2("No hay productos para mostrar en esta categoría");
				}
			}
		})();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [customerId]);

	return (
		<Home
			delegations={{
				likeProduct,
				topProducts,
				message,
				message2,
			}}
		/>
	);
};

HomeContainer.propTypes = {
	customerId    : PropTypes.any,
	userId        : PropTypes.any,
	loaderActions : PropTypes.object.isRequired,
};

const mapStateToProps = ({ userReducer : { customer } }) => ({
	customerId : customer?.data?.customer.id,
	userId     : customer?.data?.id,
});

const mapDispatchToProps = bindAll({
	LoaderActions,
});

export default withStateLoaded(mapStateToProps, mapDispatchToProps)(HomeContainer);
