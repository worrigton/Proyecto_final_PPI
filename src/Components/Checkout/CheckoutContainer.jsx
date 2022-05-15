/* eslint-disable camelcase */
import {
	useEffect,
	useState,
	useCallback,
} from "react";
import { useRouter } from "next/router";
import { Container } from "@material-ui/core";
import { connect }   from "react-redux";
import PropTypes     from "prop-types";
import _             from "lodash";

/*import our components*/
import { bindAll }    from "~/Util";
import ProductActions from "~/Components/Products/ProductsStore/store/actions";
import CustomerLayout from "~/Components/Customer/CustomerLayout";
import Service        from "~/Service";
import { Typography } from "~/ToolKit";
import useStyles      from "./styles";
import Checkout       from "./Checkout";

const CheckoutContainer = ({ cart, customer, productActions }) => {
	const router = useRouter();

	const [info, setInfo] = useState({
		address          : [],
		billings         : [],
		selectedAddress  : null,
		selectedBillings : null,
	});
	const [reload, setReload] = useState(false);

	const [billable, setBillable] = useState(false);

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

	const detailsBillings = useCallback((value) => {
		const { address } = value;
		return <>
			<Typography type="caption" color="grey">
				{value.name}
			</Typography><br />
			<Typography type="caption" color="grey">
				{value.rfc}
			</Typography><br />
			<Typography type="caption" color="grey">
				{`${address.street} #${address.ext_number},
				${address.int_number ? `interior: ${address.int_number},` : ""}
				 ${address.neighborhood}, ${address.city}, ${address.state}, ${address.country},
				${address.zip_code}`}
			</Typography><br />
			<Typography type="caption" color="grey">
				{address.telephone}
			</Typography>
		</>;
	}, []);

	useEffect(()=>{
		 (async () => {
			if (customer) {
				// eslint-disable-next-line no-undef
				const [responseAddress, responseBilling ] = await Promise.all([
					Service.api.customer.getCustomerAddress(
						1,
						`per_page=50&customer_id=${customer.data.customer.id}`,
						"customer",
						customer.token,
					),
					Service.api.customer.getBillingProfiles(
						1,
						`page_size=50&customer_id=${customer.data.customer.id}`,
						customer.token,
					),
				]);
				if (responseAddress.status && responseBilling.status) {
					setInfo({
						...info,
						address          : responseAddress.body.collection,
						billings         : responseBilling.body.collection,
						selectedAddress  : responseAddress.body.collection[0],
						selectedBillings : null,
					});
				}
			}
		})();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [customer, reload]);

	const onChangeAddress = useCallback((event, newInputValue) => {
		// console.log(event.target, newInputValue);
		// const value = newInputValue != null ? newInputValue : null;
		setInfo({
			...info,
			selectedAddress : event.target.value,
		});
	}, [info]);

	const onChangeBilling = useCallback((event, newInputValue) => {
		setInfo({
			...info,
			selectedBillings : event.target.value,
		});
	}, [info]);

	const insertOrder = async () => {
		const products = cart.map(product => (_.pick(product, [
			"provider_has_product_id",
			"p_discount",
			"price",
			"provider_id",
			"quantity",
			"shipping_cost",
			"discount",
		])));
		const newOrder = {
			"customer_id"         : customer.data.customer.id,
			"billing_profiles_id" : info.selectedBillings ? info.selectedBillings.id : null,
			"customer_address_id" : info.selectedAddress.id,
			"products"            : products,
		};
		const response = await Service.api.customer.placeOrder(newOrder);
		if (response) {
			const orderInfo = {
				id   : response.body.id,
				code : response.body.code,
			};
			productActions.setOrderSuccess({ ...orderInfo });
			router.push("/confirmation");
		} else {
			alert("error");
		}
	};

	const handleChangeBilling = () => {
		setInfo({
			...info,
			selectedBillings : null,
		});
		setBillable(!billable);
	};

	const classes = useStyles();
	return (
		<CustomerLayout>
			<Container fixed className={classes.container}>
				<Checkout
					delegations={{
						cart,
						customer,
						info,
						reload,
						onChangeAddress,
						onChangeBilling,
						detailsBillings,
						insertOrder,
						details,
						setReload,
						billable,
						handleChangeBilling,
					}}
				/>
			</Container>
		</CustomerLayout>
	);
};

CheckoutContainer.propTypes = {
	productActions : PropTypes.object.isRequired,
	cart           : PropTypes.array.isRequired,
	customer       : PropTypes.object.isRequired,
};

const mapStateToProps = ({ userReducer : { customer }, productsReducer : { cartProducts } }) => ({
	customer,
	cart : cartProducts,
});

const mapDispatchToProps = bindAll({ ProductActions });

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutContainer);
