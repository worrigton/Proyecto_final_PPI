import { useState, useEffect } from "react";
import { connect }             from "react-redux";
import { PropTypes }           from "prop-types";
import {
	Grid,
	Card,
	CardContent,
	Divider,
} from "@material-ui/core";

import { Button } from "~/ToolKit";
import Typography from "~/ToolKit/Typography/Typography";
import toCurrency from "~/Util/formatToCurrency";
import useStyle   from "./styles";

const ResumeCart = ({
	cart,
	redirecToCheckout,
	insertOrder,
	checkout,
	selectedAddress,
	selectedBillings,
}) => {
	const [resumeInfo, setResumeInfo] = useState();

	useEffect(() => {
		const subTotalProduct = (cart.reduce((accum, item) => accum + Number(item.providerPrice * item.quantity), 0));
		//const discount        = (cart.reduce((accum, item)=> accum + Number(item.discount), 0));
		const discount        = (cart.reduce((accum, item) => (accum + Number(item.discount)) * 1.16, 0));
		// const subtotal        = (subTotalProduct / 116) * 100;
		//const iva             = (subtotal - discount) * 0.16;
		const total           = (subTotalProduct - discount);

		setResumeInfo (
			{
				total,
				discount,
				subTotalProduct,
			}
		);
	}, [cart]);

	const classes = useStyle();

	return (

		<Grid container direction="column">
			<Grid item>
				<Typography className={classes.titleResume} fontWeight="600" type="header2">Resumen</Typography>
			</Grid>
			<Card>
				{resumeInfo && (
					<CardContent>
						<Grid container justify="space-between">
							<Grid>
								<Typography type="subtitle1" fontWeight="600">Subtotal</Typography>
							</Grid>
							<Grid>
								<Typography
									type="subtitle1"
									fontWeight="600">{toCurrency(resumeInfo.subTotalProduct)}</Typography>
							</Grid>
						</Grid>
						{/* <Grid container justify="space-between">
							<Grid>
								<Typography type="subtitle1" fontWeight="600">IVA</Typography>
							</Grid>
							<Grid>
								<Typography type="subtitle1" fontWeight="600">{toCurrency(resumeInfo.iva)}</Typography>
							</Grid>
						</Grid> */}
						<Grid container justify="space-between">
							<Grid>
								<Typography type="subtitle1" fontWeight="600">Descuento</Typography>
							</Grid>
							<Grid>
								<Typography
									type="subtitle1"
									fontWeight="600">{toCurrency(resumeInfo.discount)}</Typography>
							</Grid>
						</Grid>
						<br />
						<Grid container justify="space-between">
							<Grid>
								<Typography type="header4" fontWeight="600">Total</Typography>
							</Grid>
							<Grid>
								<Typography type="header4" fontWeight="600">{toCurrency(resumeInfo.total)}</Typography>
							</Grid>
						</Grid>
						<br />
						<Divider />
						<br />
						<Grid container direction="column" alignItems="center">
							{
								!checkout && (
									<Button
										onClick={redirecToCheckout("/checkout")}
										color="primary"
										grow
										disabled={resumeInfo.total == 0}
										style={{ maxWidth : "15rem" }}
									>
										Continuar con la compra
									</Button>
								)
							}
							{
								checkout && (
									<Button
										onClick={insertOrder}
										color="primary"
										grow
										disabled={!selectedAddress}
										style={{ maxWidth : "15rem" }}
									>
										Finalizar pedido
									</Button>
								)
							}

						</Grid>
					</CardContent>
				) }
			</Card>
		</Grid>
	);
};

ResumeCart.propTypes = {
	cart              : PropTypes.object.isRequired,
	redirecToCheckout : PropTypes.func.isRequired,
	insertOrder       : PropTypes.func.isRequired,
	checkout          : PropTypes.object.isRequired,
	selectedAddress   : PropTypes.any,
	selectedBillings  : PropTypes.any,
};

ResumeCart.defaultProps = {
	checkout : false,
};

const mapStateToProps = ({ productsReducer : { cartProducts } }) => ({
	cart : cartProducts,
});

export default connect(mapStateToProps, null)(ResumeCart);
