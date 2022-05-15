
import { Container } from "@material-ui/core";
import { PropTypes } from "prop-types";
import { connect }   from "react-redux";
import {
	useEffect,
	useState,
	useCallback,
} from "react";
import { useRouter } from "next/router";
/*import our components*/
import { bindAll }    from "~/Util";
import ProductActions from "~/Components/Products/ProductsStore/store/actions";
import CustomerLayout from "~/Components/Customer/CustomerLayout";
import Service        from "~/Service";
import { Typography } from "~/ToolKit";
import Confirmation   from "./Confirmation";

const CheckoutContainer = ({ productActions, customer, orderInfo }) => {
	const [order, setOrder] = useState();
	const [orderDetails, setOrderDetails] = useState();
	const [products, setProducts] = useState([]);

	const router = useRouter();

	const toRouter = useCallback((route) => router.push(route), [router]);

	const details = useCallback((value) => {
		const { address } = value;
		return <>
			<Typography type="caption" color="grey">
				{`${address.street} #${address.ext_number},
				${address.int_number ? `interior: ${address.int_number},` : ""}`}
			</Typography><br />
			<Typography type="caption" color="grey">
				{`${address.neighborhood}, ${address.city}, ${address.state}, ${address.country},
				${address.zip_code}`}
			</Typography><br />
			<Typography type="caption" color="grey">
				{address.telephone}
			</Typography>
		</>;
	}, []);

	useEffect(() => () => {
		  productActions.emptyCart();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		(async () => {
			if (orderInfo.id) {
				const { body : response } = await Service.api.customer.getOrderDetails(orderInfo.code);
				if (response) {
					setOrder(response);
					const productsArr = [];
					response.sale_orders.forEach(saleOrder => {
						saleOrder.products.forEach(product => {
							product.tradeName = saleOrder.trade_name;
							productsArr.push(product);
						});
					});
					setProducts(productsArr);
					setOrderDetails({
						amount :
							response.sale_orders.reduce((accum, item) => accum = accum +
								(item.amount + item.shipping_cost ), 0),
						shippingCost :
							response.sale_orders.reduce((accum, item) => accum = accum +
							item.shipping_cost, 0),
						discount :
							response.sale_orders.reduce((accum, item) => accum = accum +
							item.discount, 0),
						subtotal : response.sale_orders.reduce((accum, item) => accum = accum +
						( (item.amount / 116) * 100 ), 0),
					});
				}
			}
		})();
	}, [orderInfo]);

	return (
		<CustomerLayout>
			<Container fixed>
				<Confirmation
					delegations={{ productActions, products, order, orderDetails, details, toRouter }}
				/>
			</Container>
		</CustomerLayout>
	);
};

CheckoutContainer.propTypes = {
	productActions : PropTypes.object.isRequired,
	cart           : PropTypes.object.isRequired,
	customer       : PropTypes.object.isRequired,
	products       : PropTypes.object.isRequired,
	orderInfo      : PropTypes.object.isRequired,
};

const mapStateToProps = ({ userReducer : { customer }, productsReducer : { orderInfo } }) => ({
	customer,
	orderInfo,
});

const mapDispatchToProps = bindAll({ ProductActions });

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutContainer);
