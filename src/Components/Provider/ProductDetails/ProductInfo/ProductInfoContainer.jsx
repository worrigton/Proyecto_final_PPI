/* eslint-disable camelcase */
/* eslint-disable react-hooks/exhaustive-deps */
import {
	useEffect,
	useState,
	useMemo,
	useCallback,
	useContext,
} from "react";
import PropTypes    from "prop-types";
import { connect }  from "react-redux";
import { useTheme } from "@material-ui/core";

// Import Own Components
import { bindAll }               from "~/Util";
import Service                   from "~/Service";
import DialogActions             from "~/Components/Dialog/store/actions";
import { ProductDetailsContext } from "~/Components/Provider/ProductDetails";
import SuggestApprovalDialog     from "~/Components/Provider/ProductDetails/SuggestApprovalDialog";
import ProductInfo               from "./ProductInfo.jsx";

const ProductInfoContainer = ({ dialogActions }) => {
	const theme = useTheme();

	const {
		data : {
			name,
			images,
			description,
			features,
			remaining_varieties,
			category,
			category_id,
			like : initialLiked,
		},
		productId,
		providerId,
	} = useContext(ProductDetailsContext);

	const [liked, setLiked] = useState(initialLiked);

	useEffect(() => {
		setLiked(initialLiked);
	}, [initialLiked]);

	const handleLikedOrDisliked = useCallback(() => {
		if (liked) {
			Service.api.product.dislikeProduct(productId, providerId, "provider");
		} else {
			Service.api.product.likeProduct(productId, providerId, "provider");
		}

		setLiked(!liked);
	}, [liked]);

	const [tabIndex, setTabIndex] = useState(0);

	const tabs = useMemo(() => [
		{ label : "Descripción" },
		{ label : "Características" },
	], []);

	const handleTabChange = useCallback((evnt, newTabIndex) => setTabIndex(newTabIndex), []);

	const handleOpenNewSuggestion = useCallback(() => {
		dialogActions.openDialog({
			title   : "Sugerir cambio de producto",
			size    : "sm",
			content : SuggestApprovalDialog,
			cancel  : true,
			ok      : {
				text  : "Enviar para revisión",
				color : theme.palette.primary.main,
			},

			productData : {
				name,
				images,
				description,
				features,
				remaining_varieties,
				currentCategory : {
					id   : category_id,
					name : category,
				},
				productId,
				providerId,
			},
		});
	}, [
		dialogActions,
		name,
		images,
		description,
		features,
		remaining_varieties,
	]);

	return (
		<ProductInfo
			productName={name}
			images={images}
			tabs={tabs}
			value={tabIndex}
			liked={liked}
			handleLikedOrDisliked={handleLikedOrDisliked}
			handleTabChange={handleTabChange}
			description={description}
			features={features}
			handleOpenNewSuggestion={handleOpenNewSuggestion}
		/>
	);
};

ProductInfoContainer.propTypes = {
	dialogActions : PropTypes.object.isRequired,
};

const mapDispatchToProps = bindAll({ DialogActions });

export default connect(null, mapDispatchToProps)(ProductInfoContainer);
