/* eslint-disable max-len */
/* eslint-disable camelcase */
import PropTypes   from "prop-types";
import { connect } from "react-redux";
import {
	useEffect,
	useState,
	useCallback,
} from "react";

// Import Own Compoents
import PlusCircle    from "~/Resources/img/plusCircle.png";
import AlertActions  from "~/Components/Alert/store/actions";
import LoaderActions from "~/Components/Loader/store/actions";
import Service       from "~/Service";
import Home          from "./Home";
import { bindAll }   from "~/Util";

const HomeContainer = ({
	providerId,
	userId,
	token,
	alertActions,
	loaderActions,
}) => {
	const [data, setData] = useState({
		likedProducts  : [],
		newOrders      : [],
		pausedProducts : [],
		providerData   : [],
		message01      : "",
		message02      : "",
		message03      : "",
	});
	const [total, setTotal]               = useState();
	const [activeChange, setActiveChange] = useState(false);
	const [open, setOpen]                 = useState(false);
	const [productAct, setProductAct]     = useState(null);

	const handleClose = useCallback(() => {
		setOpen(false);
	}, []);

	const handleClickOpen = useCallback(() => {
		setOpen(true);
	}, []);

	const activeProduct = useCallback(product_details_id => async () => {
		const activeProd = await Service.api.provider.activeProduct({
			product_details_id,
			provider_id : providerId,
		});
		if (!activeProd) {
			alertActions.openAlert({
				message  : "Ups!, hubo un error al tratar de activar tu producto, inténtalo más tarde",
				type     : "warning",
				duration : 3000,
			});
		}
		else {
			setActiveChange(!activeChange);
			alertActions.openAlert({
				message  : "Producto activado",
				type     : "success",
				duration : 3000,
			});
		}
		handleClose();
	}, [activeChange, alertActions, handleClose, providerId]);

	useEffect(() => {
		(async () => {
			loaderActions.closeLoader();
			if (providerId) {
				const [{ body : responseNew }, { body : responseLiked }, { body : responsePaused }, { body : responseProvider }]
					// eslint-disable-next-line no-undef
					= await Promise.all([
						Service.api.provider.getOrder(
							1,
							`status=REQUESTED&page_size=10&provider_id=${providerId}`,
							token
						),
						Service.api.product.productsPage(
							1,
							`page_size=10&cheaper_product=true&image_size=md&provider_id&user_liked_product=${userId}&only_offered=true`
						),
						Service.api.product.productsPage(
							1,
						`page_size=10&cheaper_product=true&image_size=md&provider_id=${providerId}&paused_products=true`
						),
						Service.api.provider.userDetails(providerId),
					]);

				responseLiked?.collection.unshift({
					id         : 0,
					name       : "Añadir",
					image      : PlusCircle,
					label      : "Nuevo Producto",
					otherClass : true,
				});

				if (responseLiked?.collection && responseNew?.collection && responsePaused?.collection) {
					setData({
						...data,
						likedProducts  : responseLiked?.collection,
						newOrders      : responseNew?.collection,
						pausedProducts : responsePaused?.collection,
						providerData   : responseProvider,
						message01      : responseNew?.collection?.length > 0 ? "" : "No tienes órdenes nuevas",
						message02      : responseLiked?.collection?.length > 0 ? "" : "No estás siguiendo ningún producto",
						message03      : responsePaused?.collection?.length > 0 ? "" : "No tienes productos en pausa",
					});
					responseNew.collection.map((n, index) => n.shipping_status === "NOT_READY" ?
						setTotal(index + 1) : "");
				}
			}
		})();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [providerId, activeChange]);

	return (
		<Home
			delegations={{
				data,
				total,
				productAct,
				setProductAct,
				activeProduct,
				handleClose,
				handleClickOpen,
				setOpen,
				open,
			}}
		/>
	);
};

HomeContainer.propTypes = {
	providerId    : PropTypes.any,
	userId        : PropTypes.any,
	token         : PropTypes.string,
	alertActions  : PropTypes.func,
	loaderActions : PropTypes.object.isRequired,
};

const mapStateToProps = ({ userReducer : { provider } }) => ({
	providerId : provider?.data?.provider.id,
	userId     : provider?.data?.id,
	token      : provider?.token,
});

const mapDispatchToProps = bindAll({
	AlertActions,
	LoaderActions,
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
