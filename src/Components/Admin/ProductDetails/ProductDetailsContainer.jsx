import PropTypes from "prop-types";
import {
	useState,
	useMemo,
	useEffect,
	useCallback,
} from "react";
import { useRouter } from "next/router";

// IMport Own Components
import { isValidArray } from "~/Util";
import ProductDetails   from "./ProductDetails";

const ProductDetailsContainer = ({ data, max, min }) => {
	const [total, setTotal]     = useState(0);
	const [product, setProduct] = useState();
	const [filter, setFilter]   = useState({
		quality : "PREMIUM",
		size    : "SMALL",
	});
	const [quantity, setQuantity]   = useState(1);
	const [providers, setProviders] = useState([]);

	useEffect(() => {
		const productData =
			data.products?.filter(data => data.quality == filter?.quality && data.size == filter?.size );
		if (isValidArray(productData)) {
			setProduct(productData[0]);

			const providersArray = productData[0].providers?.reduce((accum, provider) => {
				accum.push({ name : provider.trade_name, id : provider.provider_id });
				return accum;
			}, []);

			setProviders(providersArray);

			setTotal(productData[0]?.providers[0]?.price * quantity);
		}
	}, [data.products, filter, quantity]);

	const handleVariantChange = (event, newValue, type) => {
		setFilter((prevState)=>({
			...prevState,
			[type] : newValue,
		}));
	};

	const handleProvider = (event, newValue, type) => {
	};

	const router = useRouter();

	const handleTabChange = (event, newValue) => {
		setTabIndex(newValue);
	};

	const [tabIndex, setTabIndex] = useState(0);

	const maxQuantity = useMemo(() => max || 10, [max]);
	const minQuantity = useMemo(() => min || 1, [min]);

	const changeQuantityWith = useCallback(updaterFn => () => {
		setQuantity(prevQuantity => {
			const newQuantity = updaterFn(prevQuantity);

			return newQuantity > maxQuantity || newQuantity < minQuantity
				? prevQuantity
				: newQuantity;
		});
	}, [maxQuantity, minQuantity]);
	const redirect = useCallback(() => router.push(`/admin/products/edit/${data.id}`), [router, data]);
	return (
		<ProductDetails
			delegations={{
				handleVariantChange,
				handleProvider,
				quantity,
				changeQuantityWith,
				handleTabChange,
				tabIndex,
				redirect,
				data,
				filter,
				product,
				total,
				providers,
			}}
		/>
	);
};

ProductDetailsContainer.propTypes = {
	max  : PropTypes.number.isRequired,
	min  : PropTypes.number.isRequired,
	data : PropTypes.object.isRequired,
};


export default ProductDetailsContainer;
