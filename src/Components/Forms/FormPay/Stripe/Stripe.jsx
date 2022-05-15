/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable max-len */
import PropTypes     from "prop-types";
import React, {
	useState,
	useContext,
	useCallback,
} from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
	useStripe,
	useElements,
	CardNumberElement,
	CardCvcElement,
	CardExpiryElement,
	Elements,
} from "@stripe/react-stripe-js";
import {
	TextField,
	Grid,
	Paper,
} from "@material-ui/core";
import { connect } from "react-redux";

// import Own Components
import cccard             from "~/Resources/cc-card-logo.png";
import { Typography }     from "~/ToolKit";
import CardSusbriptionPay from "~/Components/Provider/CardSubscription/CardSubscriptionPay";
import GridContainer      from "~/Components/GridContainer";
import FormsContext       from "~/Components/Forms/context";
import StripeInput        from "./StripeInput";
import useStyles          from "./styles";
import { bindAll }        from "~/Util";
import AlertActions       from "~/Components/Alert/store/actions";

const settings = require("~/Server/settings.json");
const stripePromise = loadStripe(settings.stripe.mode === "sandbox" ? settings.stripe.sandbox.public_key : settings.stripe.live.public_key);

const FormStripe = ( { alertActions } ) => {
	const { clientSecret, submit } = useContext(FormsContext);
	const stripe           = useStripe();
	const elements         = useElements();
	const classes          = useStyles();
	const [customerInfo, setCustomerInfo] = useState({
		name        : "",
		postal_code : "",
	});

	const handleChange = useCallback(prop => ({ target : { checked, value } }) => {
		setCustomerInfo({ [prop] : value });
	}, [setCustomerInfo]);

	const handleSubmit = async event => {
		event.preventDefault();

		if (!stripe || !elements) {
			// Stripe.js has not loaded yet. Make sure to disable
			// form submission until Stripe.js has loaded.
			return;
		}

		stripe.confirmCardSetup(clientSecret, {
			payment_method : {
				card            : elements.getElement(CardNumberElement),
				billing_details : {
					address : {
						postal_code : customerInfo.postal_code,
					},
					// Include any additional collected billing details.
					name : customerInfo.name,
				},
			},
		})
			.then(function(result) {
				if (result.error) {
					alertActions.openAlert({
						message  : "La tarjeta ha sido declinada por el proveedor de pagos",
						type     : "warning",
						duration : 3000,
					});
					console.log(result.error);
				} else {
					stripe.retrieveSetupIntent(clientSecret).then(function(result) {
						const setupIntent = result.setupIntent;
						submit(setupIntent);
					});
				}
			});
	};

	return (
		<FormsContext.Consumer>
			{({
				selectSubs,
				validateCoupon,
				handleCouponChange,
				coupon,
				couponInfo,
				alertActions,
			}) => (
				<Grid
					container
					justify="center"
					item
					xs={12}
					md={12}
					className="Demo"
				>
					<form onSubmit={handleSubmit}>

						<GridContainer
							leftItems={[
								<Paper key={"strip"} className={classes.inputContainer}>
									<Grid container>
										<Grid item xs={12} className={classes.inputContainer}>
											<Typography
												type="body2"
												fontWeight="600"
											>
												Información de pago
											</Typography>
										</Grid>
										<Grid item xs={6} className={classes.inputContainer}>
											<label htmlFor="">Nombre en la tarjeta</label>
											<TextField
												value={customerInfo.name}
												onChange = {handleChange("name")}
												className={classes.textField}
												variant="outlined"
												name="card_holder"
												required
												fullWidth
												InputLabelProps={{ shrink : true }}
											/>
										</Grid>
										<Grid item xs={6} className={classes.inputContainer}>
											<label htmlFor="">Código Postal</label>
											<TextField
												value={customerInfo.postal_code}
												onChange = {handleChange("postal_code")}
												className={classes.textField}
												variant = "outlined"
												name	="code_postal"
												type="number"
												required
												fullWidth
												InputLabelProps={{ shrink : true }}
											/>
										</Grid>
										<Grid item xs={12} className={classes.inputContainer}>
											<label htmlFor="">Número de tarjeta</label>
											<TextField
												className={classes.textField}
												variant = "outlined"
												name="ccnumber"
												required
												fullWidth
												type="number"
												InputProps={{
													inputComponent : StripeInput,
													inputProps     : {
														component : CardNumberElement,
													},
												}}
											/>
											<img src={cccard} alt="Logotipo tarjetas" />
										</Grid>
										<Grid item container>
											<Grid item xs={12} md={6} className={classes.inputContainer}>
												<label htmlFor="">Expiración</label>
												<TextField
													className={classes.textField}
													variant = "outlined"
													name="ccnumber"
													required
													fullWidth
													InputProps={{
														inputComponent : StripeInput,
														inputProps     : {
															component : CardExpiryElement,
														},
													}}
													InputLabelProps={{ shrink : true }}
												/>
											</Grid>
											<Grid item xs={12} md={6} className={classes.inputContainer}>
												<label htmlFor="">Código validador</label>
												<TextField
													className={classes.textField}
													variant = "outlined"
													name="ccnumber"
													required
													fullWidth
													type="number"
													InputProps={{
														inputComponent : StripeInput,
														inputProps     : {
															component : CardCvcElement,
														},
													}}
													InputLabelProps={{ shrink : true }}
												/>
											</Grid>
										</Grid>
									</Grid>
								</Paper>,
							]}
							rightItems={[
								<CardSusbriptionPay
									key  = {"cardpay"}
									data = {selectSubs}
									delegations = {{
										stripe,
										coupon,
										validateCoupon,
										handleCouponChange,
										couponInfo,
									}}
								/>,
							]}
						/>
					</form>
				</Grid>
			) }
		</FormsContext.Consumer>
	);
};

const Stripe = ({ alertActions }) => (
	<Elements stripe={stripePromise}>
		<FormStripe alertActions = {alertActions} />
	</Elements>
);

Stripe.propTypes = {
	alertActions : PropTypes.object.isRequired,
};


FormStripe.propTypes = {
	alertActions : PropTypes.object.isRequired,
};

const mapDispatchToProps = bindAll({
	AlertActions,
});


export default connect(null, mapDispatchToProps)(Stripe);
