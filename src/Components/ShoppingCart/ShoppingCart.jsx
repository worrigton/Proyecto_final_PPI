
/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import {
	Grid,
	Card,
	CardContent,
	Divider,
} from "@material-ui/core";
import Swing       from "react-reveal/Swing";
import { Fade }    from "react-reveal";
import { connect } from "react-redux";

// Import Own Components
import GridContainer     from "~/Components/GridContainer";
import ShoppingCartItem  from "./ShoppingCartItem";
import useStyles         from "./styles";
import { Typography }    from "~/ToolKit";
import ResumeCart        from "./ResumeCart";
import mainArt           from "~/Resources/img/Cliente/main-art.png";
import { FaLocation }    from "~/Resources/icons/fal";

import Button from "~/ToolKit/Button/Button";
import { FaExclamationTriangle } from "~/Resources/icons/fas";

const ShoppingCart = ({
	cart,
	delegations : {
		resume,
		delProductCart,
		onChangeQuantity,
		redirecToCheckout,
		toProducts,
	} }) => {

	const classes = useStyles();
	const List = () => (
		<Grid container direction="column">
			<Typography
				className={classes.titleResume}
				fontWeight="700"
				type="header2"
			>
				Lista de Compras
			</Typography>
			<Card>
				<Divider />
				<CardContent>
					<Grid container direction="column">
						{
							cart && cart.length > 0 ? (Object.values(cart).map((item, index) => (
								<Grid item key={Object.keys(index)}>
									<ShoppingCartItem delegations={{ item, delProductCart, onChangeQuantity, index }} />
									<Divider light />
								</Grid>
							))) : (
								<Grid container>
									<Grid item xs={8}>
										<Typography
											type="header3"
											className={classes.noProducts}
											color="grey"
											fontWeight="600"
										>
											<FaExclamationTriangle className={classes.iconNoProducts} />
											No hay productos en el carrito
										</Typography>
										<Typography
											type="header4"
											className={`${classes.titleResume} ${classes.noProducts}`}
										>
											Encuentra proveedores en tu región
										</Typography>
										<Swing delay={100}>
											<div className={`${classes.titleResume} ${classes.noProducts}`}>
												<Button
													color={"primary"}
													startIcon={
														<FaLocation className={classes.icon} />
													}
													onClick={toProducts}
												>
													Buscar productos
												</Button>
											</div>
										</Swing>
									</Grid>
									<Grid item xs={4} className={classes.fullWidthcover}>
										<Fade right delay={100} duration={1500}>
											<img
												src={mainArt}
												alt="Arte principal"
												className={classes.widthFull} />
										</Fade>
									</Grid>
								</Grid>
							)
						}
					</Grid>
				</CardContent>
			</Card>
		</Grid>
	);

	return (
		<GridContainer
			leftItems={[<List key={"cart-list"} />]}
			rightItems={[<ResumeCart key={"details-list"} resume={resume} redirecToCheckout={redirecToCheckout} /> ]}
		/>
	);
};

ShoppingCart.propTypes = {
	delegations : PropTypes.string.isRequired,
	cart        : PropTypes.array.isRequired,
};

const mapStateToProps = ({ productsReducer : { cartProducts } }) => ({
	cart : cartProducts,
});

export default connect(mapStateToProps, null)(ShoppingCart);
