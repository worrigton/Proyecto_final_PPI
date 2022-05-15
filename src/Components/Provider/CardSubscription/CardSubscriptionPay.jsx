import PropTypes from "prop-types";
import {
	Card,
	CardMedia,
	Divider,
	Grid,
	TextField,
} from "@material-ui/core";

// Import Own Components
import { Typography, Button } from "~/ToolKit";
import useStyles              from "./styles";
import toCurrency             from "~/Util/formatToCurrency";

/** Component to find an image with title and information */
const CardSusbriptionPay = ({
	data,
	delegations : {
		stripe,
		validateCoupon,
		handleCouponChange,
		coupon,
		couponInfo,
	},
}) => {
	const classes = useStyles();
	return (
		<Card className={classes.pricingPriceTwo}>
			<CardMedia>
				<div>
					<Typography type="header4">
						Subscripción mensual
					</Typography>
				</div>
				<Divider />
				<div className={classes.pricingPriceTwo}>
					<Typography type="header4">
						<b>{data.quantity_product}</b> Productos
					</Typography>
					<span className={classes.priceTwo}>
						<span
							className={classes.pricingCurrency}
						>$ </span> {data.price / data.quantity_product}
					</span>
					<span>
						<span className={classes.pricingPeriodTwo}>
							/mes
						</span>
					</span>
				</div>
				<Divider />
				<Grid container justify="space-between">
					<Grid item>
						<Typography
							type="caption"
							fontWeight="400"
						>
							Productos
						</Typography>
					</Grid>
					<Grid>
						<Typography
							type="caption"
							fontWeight="400"
						>
							{data.quantity_product} Productos
						</Typography>
					</Grid>
				</Grid>
				<Grid container justify="space-between">
					<Grid item>
						<Typography
							type="caption"
							fontWeight="400"
						>
							Precio por producto
						</Typography>
					</Grid>
					<Grid>
						<Typography
							type="caption"
							fontWeight="400"
						>
							{toCurrency(data.price)}
						</Typography>
					</Grid>
				</Grid>
				<br />
				<Grid container justify="space-between">
					<Grid item>
						<Typography
							type="body2"
							fontWeight="600"
						>
							Cobro mensual recurrente
						</Typography>
					</Grid>
					<Grid>
						{
							!couponInfo && (
								<Typography
									type="body2"
									fontWeight="600"
								>
									{toCurrency(data.price)}
								</Typography>
							)
						}
						{
							couponInfo && (
								<>
									<Typography
										type="body2"
										fontWeight="600"
									>
										{
											couponInfo.percent_off ?
												toCurrency(data.price - (data.price * (couponInfo.percent_off / 100))) :
												toCurrency(data.price - couponInfo.amount_off)
										}
									</Typography>
									<Typography
										type="body2"
										fontWeight="600"
										className={classes.discount}
									>
										{toCurrency(data.price)}
									</Typography>
								</>
							)
						}
					</Grid>
				</Grid>
				<br />
				{/* // TODO : agregar validacion de codigo */}
				<Grid item container justify="space-between">
					<TextField
						value={coupon}
						onChange={handleCouponChange("coupon")}
						id="outlined-basic"
						label="Código de descuento"
						variant="outlined"
						size="small" />
					<Button
						onClick={validateCoupon}
						color="primary"
						// disabled={!selectedAddress}
						style={{ maxWidth : "15rem" }}
					>
						Agregar
					</Button>
				</Grid>
				<Grid container justify="space-between">
					<Button
						type="submit"
						variant="contained"
						color="primary"
						className={classes.button}
						disabled={!stripe}
					>
						Regístrarme
					</Button>
				</Grid>
			</CardMedia>
		</Card>
	);
};

CardSusbriptionPay.propTypes = {
	data        : PropTypes.object,
	delegations : PropTypes.any,
};

CardSusbriptionPay.defaultProps = {
	data : {},
};

export default CardSusbriptionPay;
