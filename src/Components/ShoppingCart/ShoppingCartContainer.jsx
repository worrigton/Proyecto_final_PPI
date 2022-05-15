/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
import { useCallback } from "react";
import PropTypes       from "prop-types";
import { connect }     from "react-redux";
import { useRouter }   from "next/router";
import { Container }   from "@material-ui/core";

// Import Own Components
import CustomerLayout   from "~/Components/Customer/CustomerLayout";
import { bindAll } 		from "~/Util";
import ProductActions   from "~/Components/Products/ProductsStore/store/actions";
import AlertActions     from "~/Components/Alert/store/actions";
import ShoppingCart     from "./ShoppingCart";
import useStyles        from "./styles";

const ShoppingCartContainer = ({
	productActions,
	cart,
	alertActions,
	state,
}) => {
	const classes = useStyles();
	const router = useRouter();

	const onDeleteCart = useCallback(() => {
		productActions.emptyCart();
	}, [productActions]);

	const delProductCart = useCallback((index) => {
		productActions.removeFromCart(index);
		alertActions.openAlert({
			message  : "Producto eliminado de la lista",
			type     : "success",
			duration : 2000,
		});
	}, [productActions, alertActions]);

	const onChangeQuantity = useCallback((index, value) => {
		productActions.updateToCart({ index, value });
		alertActions.openAlert({
			message  : "Lista actualizada",
			type     : "success",
			duration : 2000,
		});
	}, [productActions, alertActions]);

	const toProducts        = useCallback(() => router.push("/productos"), [state]);
	const redirecToCheckout = useCallback(url =>() => {
		router.push(url);
	}, [router]);

	return (
		<CustomerLayout>
			<Container fixed className={classes.container}>
				<ShoppingCart delegations={{
					onDeleteCart,
					cart,
					delProductCart,
					onChangeQuantity,
					redirecToCheckout,
					toProducts,
				}} />
			</Container>
		</CustomerLayout>
	);
};

ShoppingCartContainer.defaultProps = {};

ShoppingCartContainer.propTypes = {
	productActions : PropTypes.object.isRequired,
	alertActions   : PropTypes.object.isRequired,
	cart           : PropTypes.array.isRequired,
	state          : PropTypes.string.isRequired,
};

const mapStateToProps = ({ productsReducer : { cartProducts, state } }) => ({
	cart  : cartProducts,
	state : state || "jalisco",
});

const mapDispatchToProps = bindAll({ ProductActions, AlertActions });

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartContainer);
