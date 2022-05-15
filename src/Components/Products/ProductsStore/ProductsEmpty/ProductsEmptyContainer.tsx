/* eslint-disable react/prop-types */
import { useCallback } from "react";
import { connect }     from "react-redux";
import  PropTypes      from "prop-types";

// Import Own Components
import { bindAll }     from "~/Util";
import ProductsActions from "~/Components/Products/ProductsStore/store/actions";
import ProductsEmpty, {
	MouseClick,
} from "./ProductsEmpty";

interface Props {
    productsActions : any;
}

const ProductsEmptyContainer = ({ productsActions }) => {
	const handleCleanFiltersMethod = useCallback<MouseClick>(productsActions.removeFilters, [productsActions]);

	return (
		<ProductsEmpty handleCleanFilters={handleCleanFiltersMethod} />
	);
};

const mapDispatchToProps = bindAll({ ProductsActions });

ProductsEmptyContainer.propTypes = {
	productsActions : PropTypes.object.isRequired,
};

export default connect(null, mapDispatchToProps)(ProductsEmptyContainer);
