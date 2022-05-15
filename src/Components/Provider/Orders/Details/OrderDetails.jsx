import { Paper, Grid }      from "@material-ui/core";
import { PropTypes }        from "prop-types";

// Import own components
import useStyles            from "./styles";
import GridContainer        from "~/Components/GridContainer/GridContainer";
import OrderDetailsProducts from "~/Components/OrderDetails/OrderDetailsProducts";
import OrderDetailsResume   from "~/Components/OrderDetails/OrderDetailsResume";
import OrderDetailsHeader   from "~/Components/OrderDetails/OrderDetailsHeader";
import OrderDataCustomer    from "~/Components/OrderDetails/OrderDataCustomer";

const OrderDetails = ({ delegations : {
	data,
	orderDetails,
	customer,
	handleAction,
	handleClickOpen,
	handleQualifyClient,
	handleQualifyProvider,
	downloadFile,
} }) => {
	const classes = useStyles();
	const Left = () => (
		<>
			<Paper className={classes.root}>
				<Grid container direction="column">
					<OrderDetailsProducts
						products={data.sale_orders[0].products} delegations={{ data, handleAction }} />
				</Grid>
			</Paper>
			<OrderDetailsResume delegations={{ data, orderDetails, handleAction, handleClickOpen, downloadFile }} />
		</>
	);

	return (
		<>
			<OrderDetailsHeader provider delegations={{ data, handleAction }} />
			<GridContainer
				leftItems={[<Left key={"cart-list"} />]}
				rightItems={[<OrderDataCustomer delegations={{
					data,
					customer,
					handleQualifyClient,
					handleQualifyProvider,
			 }} key={"summary details"} /> ]}
			/>
		</>
	);
};

OrderDetails.propTypes = {
	delegations : PropTypes.object.isRequired,
};

export default OrderDetails;
