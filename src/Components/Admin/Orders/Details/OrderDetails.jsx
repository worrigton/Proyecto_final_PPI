import { Paper, Grid } from "@material-ui/core";
import { PropTypes }   from "prop-types";

// Import own components
import GridContainer        from "~/Components/GridContainer/GridContainer";
import OrderDetailsProducts from "~/Components/OrderDetails/OrderDetailsProducts";
import OrderDetailsResume   from "~/Components/OrderDetails/OrderDetailsResume";
import OrderDetailsHeader   from "~/Components/OrderDetails/OrderDetailsHeader";
import OrderDataCustomer    from "~/Components/OrderDetails/OrderDataCustomer";
import useStyles            from "./styles";

const OrderDetails = ({
	delegations : {
		data,
		orderDetails,
		customer,
		handleClickOpen,
		handleQualifyClient,
	},
}) => {
	const classes = useStyles();

	return (
		<>
			{ data && (
				<>
					<OrderDetailsHeader administrator delegations={{ data }} />
					<GridContainer
						leftItems={[
							<Paper className={classes.root} key="1">
								<Grid container direction="column">
									{
										data && (
											<OrderDetailsProducts delegations= {{ data }}
												products={data.sale_orders[0].products}
											/>
										)
									}
								</Grid>
							</Paper>,
							<Grid key="2">{
								data && (
									<OrderDetailsResume delegations={{ data, orderDetails, handleClickOpen }} />
								)
							}</Grid>,
						]}
						rightItems={[<OrderDataCustomer delegations={{
							data,
							customer,
							handleQualifyClient,
						}} key="summary details" /> ]}
					/>
				</>
			) }
		</>
	);
};

OrderDetails.propTypes = {
	delegations : PropTypes.object.isRequired,
};

export default OrderDetails;
