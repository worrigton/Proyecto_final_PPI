import { Paper, Grid } from "@material-ui/core";
import { PropTypes }   from "prop-types";
import { connect }     from "react-redux";

// Import own components
import GridContainer        from "~/Components/GridContainer/GridContainer";
import TitlePage            from "~/Components/TitlePage/TitlePage";
import OrderDetailsProducts from "~/Components/OrderDetails/OrderDetailsProducts";
import OrderDetailsResume   from "~/Components/OrderDetails/OrderDetailsResume";
import OrderDetailsHeader   from "~/Components/OrderDetails/OrderDetailsHeader";
import OrderDataProvider    from "~/Components/OrderDetails/OrderDataProvider";
import useStyles            from "./styles";

const OrderDetails = ({
	delegations : {
		data,
		orderDetails,
		provider,
		handleCancelOrder,
		downloadFile,
		handleClickOpen,
		handleQualifyClient,
		handleAction,
	},
	customer,
}) => {
	const classes = useStyles();
	return (
		<>
			<TitlePage
				url="/cliente/ordenes/"
				nameUrl="Pedidos"
			/>
			<OrderDetailsHeader delegations={{ data, handleCancelOrder }} />
			<GridContainer
				leftItems={[
					<Paper className={classes.root} key="1">
						<Grid container direction="column">
							<OrderDetailsProducts
								products={data.sale_orders[0].products}
								delegations={{ data, handleAction }}
								customer={customer} />
						</Grid>
					</Paper>,
					<OrderDetailsResume
						key="2"
						delegations={{ data, orderDetails, downloadFile, handleClickOpen }}
						customer={customer}
					/>,
				]}
				rightItems={[<OrderDataProvider delegations={{
					data,
					provider,
					customer,
					handleQualifyClient,
				}} key={"summary details"} /> ]}
			/>
		</>
	);
};

OrderDetails.propTypes = {
	delegations : PropTypes.object.isRequired,
	customer    : PropTypes.any,
};

const mapStateToProps = (
	{ userReducer : { customer } }) => (
	{ customer : customer }
);

export default connect(mapStateToProps, null)(OrderDetails);
