import { PropTypes } from "prop-types";
import {
	Paper,
	Container,
	Grid,
	Divider,
} from "@material-ui/core";

/* import our components */
import useStyles          from "./styles";
import MultipleCarousel   from "../MultipleCarousel/MultipleCarousel";
import { FaMapMarkerAlt } from "~/Resources/icons/fal";
import CardDescription    from "~/Components/CardDescription";
import {
	Typography,
	Button,
} from "~/ToolKit";
import toCurrency from "~/Util/formatToCurrency";

const Checkout = ({ delegations :
	{
		products,
		order,
		orderDetails,
		details,
		toRouter,
	},
}) => {
	const classes = useStyles();
	const responsiveProps = {
		superLargeDesktop : {
			breakpoint : { max : 4000, min : 3000 },
			items      : 4,
		},
		desktop : {
			breakpoint : { max : 3000, min : 960 },
			items      : 3,
		},
		tablet : {
			breakpoint : { max : 960, min : 500 },
			items      : 2,
		},
		mobile : {
			breakpoint : { max : 500, min : 0 },
			items      : 1,
		},
	};

	return (
		<Container className={classes.root}>
			<Typography className={classes.title} type="header1">Finalizado</Typography>
			<Paper className={classes.paper}>
				{ order &&  orderDetails && (
					<Grid
						container
						direction="column"
						justify="center"
						alignItems="center"
					>
						<Grid item xs={12} className={classes.headerConfirmation}>
							<Grid
								item
								container
								direction="column"
								justify="center"
								alignItems="center"
							>
								<Typography
									className={classes.subtitle}
									type="header4"
									fontWeight="400">
									{`No. de pedido # ${order.code}`}
								</Typography>
								<Typography
									className={classes.subtitle}
									type="header2"
								>
									Tu pedido ha sido realizado
								</Typography>
							</Grid>
						</Grid>
						<Grid
							item
							xs={11}
							md={8}
							lg={5}
							style={{
								padding : "1rem 0 0 0",
								width   : "100%",
							}}
						>
							<Typography type="header4" fontWeight="700">
								Productos ({products.length})
							</Typography>
							<MultipleCarousel
								responsiveProps={responsiveProps}
								settingsProps={{
									swipeable          : false,
									draggable          : false,
									showDots           : false,
									infinite           : true,
									autoPlaySpeed      : 600,
									keyBoardControl    : false,
									customTransition   : "all .5",
									transitionDuration : 500,
								}}
							>
								{products.map((item, index) => (
									<Grid
										key={item.id}
										container
										direction="row"
										justify="center"
										alignItems="center"
										className={classes.carouselItem}
									>
										<Grid item xs={12} container justify="center">
											<img className={classes.carouselImage} src={item.image} />
										</Grid>
										<Grid item xs={12} container justify="center">
											<Typography>
												{`(${index + 1}) ${item.name}`}
											</Typography>
										</Grid>
										<Grid item xs={12} container justify="center">
											<Typography>
												{item.quantity} kgs.
											</Typography>
										</Grid>
										<Grid item xs={12} container justify="center">
											<Typography
												fontWeight="bold"
												type="subtitle1"
											>
												{item.tradeName}
											</Typography>
										</Grid>
									</Grid>
								) )}
							</MultipleCarousel>
							<Divider />
						</Grid>
						<Grid
							item
							xs={11}
							md={8}
							lg={5}
							container
							justify="center"
							direction="row"
						>
							<Grid item xs={12} container justify="center">
								<CardDescription
									customerName={`${order.customer.first_name} ${order.customer.last_name}`}
									description={details(order.customer.customer_address)}
									icon={<FaMapMarkerAlt />}
								/>
							</Grid>
							{
								orderDetails && (
									<Grid item xs={12} className={classes.details}>
										<Typography className={classes.textRight}
											type="header4">
											<b>Subtotal: </b>
											{toCurrency( orderDetails.amount + (orderDetails.discount * 1.16))}
										</Typography>
										<Typography className={classes.textRight}
											type="header4">
											<b>Costo de envio: </b>
											{toCurrency(orderDetails.shippingCost)}
										</Typography>
										{
											orderDetails.discount > 0 && (
												<Typography className={classes.textRight}
													type="header4">
													<b>Descuento: </b>
													{toCurrency(orderDetails.discount * 1.16)}
												</Typography>
											)
										}
										<Divider />
										<Typography
											type="header4" className={classes.textRight}>
											<b>Total: </b>
											{toCurrency(orderDetails.amount)}
										</Typography>
									</Grid>
								)
							}
							<Grid
								item
								xs={11}
								container
								justify="center"
								direction="row"
							>
								<Grid item xs={12} container justify="center">
									<Button
										onClick={e => toRouter("/cliente/ordenes")}
										className={classes.buttonPagar}
										color="primary"
									>
										Pagar
									</Button>
								</Grid>
								<Grid item xs={12} container justify="center">
									<Button
										onClick={e => toRouter("/productos")}
										className={classes.buttonPagar}
										color="white"
									>
										Continuar comprado
									</Button>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				)}
			</Paper>
		</Container>
	);
};

Checkout.propTypes = {
	delegations : PropTypes.object.isRequired,
	insertOrder : PropTypes.func.isRequired,
};

export default Checkout;
