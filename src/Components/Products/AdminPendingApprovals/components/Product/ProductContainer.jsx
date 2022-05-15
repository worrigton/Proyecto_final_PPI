/* eslint-disable react-hooks/exhaustive-deps */
import {
	useState,
	useEffect,
	useCallback,
	useMemo,
} from "react";
import PropTypes     from "prop-types";
import { useRouter } from "next/router";
import { useTheme }  from "@material-ui/core";

// Import Own Components
import Product from "./Product.jsx";

const ProductContainer = ({ data }) => {
	const router     = useRouter();
	const theme      = useTheme();
	const identifier = useMemo(() => `productContainer${data.id}`, [data.id]);

	const [withColumnStyles, setWithColumnStyles] = useState(false);

	useEffect(() => {
		const el                      = document.querySelector(`#${identifier}`);
		const setColumnStylesIfNeeded = () => setWithColumnStyles(el?.clientWidth < theme.spacing(48));

        window?.addEventListener("resize", setColumnStylesIfNeeded);

        setColumnStylesIfNeeded();

        return () => {
            window?.removeEventListener("resize", setColumnStylesIfNeeded);
        };
	}, [identifier, theme, withColumnStyles]);

	const approveProduct = useCallback(() => {
		router.push(`/admin/products/approve/${data.id}`);
	}, [data]);

	return (
		<Product
			delegations={{
				identifier,
				withColumnStyles,
				approveProduct,
			}}
			data={data}
		/>
	);
};

ProductContainer.propTypes = {
	data : PropTypes.object.isRequired,
};

export default ProductContainer;
