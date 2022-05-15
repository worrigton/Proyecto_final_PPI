/* eslint-disable camelcase */
/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes     from "prop-types";
import { Container } from "@material-ui/core";
import { connect }   from "react-redux";
import { useRouter } from "next/router";
import {
	useState,
	useMemo,
	useEffect,
	useCallback,
} from "react";
import _ from "lodash";

// IMport Own Components
import { bindAll }      from "~/Util";
import DialogDiscount   from "~/Components/Products/ProductsStore/components/DialogDiscount";
import ProductActions   from "~/Components/Products/ProductsStore/store/actions";
import AlertActions     from "~/Components/Alert/store/actions";
import ProductDetails   from "./ProductDetails";
import Services         from "~/Service";
import useStyles        from "./styles";
import Service      	from "~/Service";

import ProductDetailsWhithoutOffer from "~//Components/Admin/ProductDetails/ProductDetailsWithoutOffer.jsx";

const ProductDetailsContainer = ({
	data,
	adminLayout,
	max,
	min,
	productActions,
	alertActions,
	customerId,
	userId,
}) => {
	const classes = useStyles();
	const [tabIndex, setTabIndex]                 = useState(0);
	const [discount, setDiscount]                 = useState();
	const [noneProviders, setNoneProviders]       = useState(false);
	const [open, setOpen]                         = useState(false);
	const [show, setShow]                         = useState(false);
	const [providerInfo, setProviderInfo]         = useState();
	const [product, setProduct]                   = useState();
	const [quantity, setQuantity]                 = useState(1);
	const [selectedProvider, setSelectedProvider] = useState();
	const [total, setTotal]                       = useState(0);
	const [varieties, setVarieties]               = useState();
	const [sizes, setSizes]                       = useState();
	const [providerInfoAll, setProviderInfoAll]   = useState({});
	const [filter, setFilter]                     = useState({
		quality : "",
		size    : "",
	});
	const [changeProvider, setChangeProvider]     = useState(false);
	const [liked, setLiked]                       = useState();

	const maxQuantity = useMemo(() => max || 100000, [max]);
	const minQuantity = useMemo(() => min || 0, [min]);
	const router = useRouter();

	useEffect(() => {
		(async () => {
			if (data.products.length > 0 && data.products[0].providers.length == 0) {
				router.push("/error");
				return false;
			}
			if ( !product ) {
				if (data.products.length > 0) {
					let productProviderMinPrice = _.minBy(
						_.flatten(
							data.products.map(
								product => product.providers.map(
									provider => provider
								)
							)));
					productProviderMinPrice = {
						...productProviderMinPrice,
						..._.find(data.products, { "id" : productProviderMinPrice.product_id }),
					};
					setProduct(productProviderMinPrice);
					setProviderInfo(data.providers[productProviderMinPrice.provider_id]);
					setVarieties(data.providers[productProviderMinPrice.provider_id].varieties);
					setSizes(
						data.providers[productProviderMinPrice.provider_id].varieties[productProviderMinPrice.quality]
					);
					setFilter({
						quality : productProviderMinPrice.quality,
						size    : productProviderMinPrice.size,
					});
					if (!changeProvider) {
						setSelectedProvider(productProviderMinPrice);
					} else {
						setChangeProvider(data.products, filter.size);
					}
				} else {
					setNoneProviders(true);
				}
			}

			if (providerInfo) {
				checkDiscount(quantity);
			}

			if (discount) {
				const discountTotal = selectedProvider?.price * quantity * (discount / 100);
				const newTotal = (selectedProvider?.price * quantity - discountTotal);
				setTotal(newTotal);
			} else {
				setTotal(selectedProvider?.price * quantity);
			}

			if (selectedProvider) {
				if (!providerInfoAll[selectedProvider.provider_id]) {
					const proveedor = {};
					const { body } = await Services.api.provider.userDetails(
						selectedProvider?.provider_id
					);
					proveedor[selectedProvider.provider_id] = {
						regions        : body.regions,
						rating         : body.rating,
						trade_name     : body.trade_name,
						total_products : body.total_active_products,
						finish_orders  : body.finish_sale_orders,
					},
					setProviderInfoAll({
						...providerInfoAll,
						...proveedor,
					});
				}
			}
			getLikeData();
		})();
	}, [quantity, discount, filter, providerInfo, selectedProvider]);

	const handleVariantChange = (type => (event, newValue) => {
		let product;
		let currentProductProvider;

		if (type === "quality" && newValue != null) {
			setSizes(varieties[newValue]);
			product = _.filter(
				data.products,
				{
					"quality" : newValue,
				}
			);

			const productProvider = _.filter(_.flatten(
				product.map(
					product => product.providers.map(provider => provider)
				)), { "provider_id" : selectedProvider.provider_id });

			currentProductProvider  = {
				..._.find(data.products, { "id" : productProvider[0].product_id }),
				...productProvider[0],
			};
			setFilter({
				size    : currentProductProvider.size,
				quality : newValue,
			});
		} else {
			product = _.find(
				data.products,
				{ "size" : newValue, "quality" : filter.quality }
			);

			const productProvider = _.find(product.providers, { "provider_id" : selectedProvider.provider_id });

			currentProductProvider  = {
				...product,
				...productProvider,
			};

			setFilter((prevState)=>({
				...prevState,
				[type] : newValue,
			}));
		}

		setQuantity(1);
		setSelectedProvider(currentProductProvider);
	});

	const providerChange = (providerId) => {
		providerId = parseInt(providerId);
		if (selectedProvider.provider_id !== providerId) {
			setQuantity(1);
			let productProviderMinPrice = _.minBy(
				_.filter(
					_.flatten(
						data.products.map(
							product => product.providers.map(
								provider => provider
							)
						)), { "provider_id" : providerId }));

			productProviderMinPrice = {
				...productProviderMinPrice,
				..._.find(data.products, { "id" : productProviderMinPrice.product_id }),
			};
			setVarieties(data.providers[productProviderMinPrice.provider_id].varieties);
			setSizes(
				data.providers[productProviderMinPrice.provider_id].varieties[productProviderMinPrice.quality]
			);
			setFilter({
				quality : productProviderMinPrice.quality,
				size    : productProviderMinPrice.size,
			});
			setProduct(productProviderMinPrice);
			setSelectedProvider(productProviderMinPrice);
			setProviderInfo(data.providers[productProviderMinPrice.provider_id]);
			setChangeProvider(true);
		}
	};

	const handleTabChange = (event, newValue) => {
		setTabIndex(newValue);
	};

	const checkDiscount = useCallback((dato)=>{
		providerInfo.discounts.forEach(element => {
			if (dato >= element.min_weight && dato <= element.max_weight && dato >= 1  ) {
				setDiscount(element.discount);
				const total = total * (element.discount / 100);
				setTotal(total);
			} else {
				setDiscount(0);
			 }
		});
	}, [providerInfo]);

	const changeQuantityWith = useCallback(updaterFn => (event, newValue) => {
		setQuantity(prevQuantity => {
			const newQuantity = updaterFn(prevQuantity);
			if (newQuantity < 1) {
				return 1;
			} else if (newQuantity == 11) {
				return 10;
			}
			checkDiscount(newQuantity);
			return newQuantity > maxQuantity || newQuantity < minQuantity
				? prevQuantity
				: newQuantity;
		});
	}, [maxQuantity, minQuantity, checkDiscount]);

	const changeQuantity = useCallback(({ target : { value } }) => {
		if (value === "" | value < 1) {
			return 1;
		}
		setQuantity(parseInt(value));
	}, []);

	const addToCart = useCallback(() => {
		const discountsInfo = providerInfo.discounts;
		const info = {
			product,
			data,
			quantity,
			discount,
			discountsInfo,
			filter,
		};
		productActions.addToCart(info);
		alertActions.openAlert({
			message  : "Producto agregado a la lista",
			type     : "success",
			duration : 2000,
		});

	}, [productActions, data, product, quantity, alertActions, discount]);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = (value) => {
		setOpen(false);
	};

	const handleLikedOrDisliked = useCallback(() => {
		if (liked) {
			Services.api.product.dislikeProduct(data.products[0].product_details_id, customerId, "customer");
		} else {
			Services.api.product.likeProduct(data.products[0].product_details_id, customerId, "customer");
		}

		setLiked(!liked);
	}, [liked]);

	const redirectEditProduct = useCallback(() => router.push(`/admin/products/edit/${data.id}`), [router, data]);

	const getLikeData = useCallback( async () => {
		const response = await Service.api.customer.getProductDetails(userId, data.id, "customer");
		if (response) {
			setLiked(response.like);
		}
	}, [userId, data]);

	return (
		<>
			<Container fixed className={`${classes.container} ${!adminLayout ? classes.paddingY : ""}`}>
				{!noneProviders ? (
					<ProductDetails
						delegations={{
							handleVariantChange,
							providerChange,
							changeQuantityWith,
							handleTabChange,
							addToCart,
							handleClickOpen,
							handleClose,
							changeQuantity,
							setShow,
							handleLikedOrDisliked,
							redirectEditProduct,
							show,
							selectedProvider,
							providerInfoAll,
							quantity,
							tabIndex,
							data,
							filter,
							product,
							total,
							providerInfo,
							discount,
							sizes,
							liked,
							varieties,
							adminLayout,
						}}
					/>
				) : (
					<ProductDetailsWhithoutOffer
						delegations={{
							handleTabChange,
							redirectEditProduct,
							data,
							tabIndex,
						}}
					/>
				)}
			</Container>
			{
				(providerInfo && providerInfoAll[selectedProvider?.provider_id]) && (
					<DialogDiscount
						discounts={providerInfo.discounts}
						open={open}
						handleClose={handleClose}
						tradeName={providerInfoAll[selectedProvider?.provider_id]?.trade_name}
					/>
				)
			}
		</>
	);
};


ProductDetailsContainer.propTypes = {
	max            : PropTypes.number,
	min            : PropTypes.number,
	data           : PropTypes.object.isRequired,
	productActions : PropTypes.object.isRequired,
	alertActions   : PropTypes.object.isRequired,
	customerId     : PropTypes.number,
	userId         : PropTypes.number,
	adminLayout    : PropTypes.bool,
};

ProductDetailsContainer.defaultProps = {
	adminLayout : false,
};

const mapStateToProps = ({ userReducer : { customer } }) => ({
	customerId : customer?.data?.customer.id,
	userId     : customer?.data?.id,
});

const mapDispatchToProps = bindAll({ ProductActions, AlertActions });


export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailsContainer);
