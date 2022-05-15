/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable max-len */
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
} from "@material-ui/core";

// import Own Components
import cccard        from "~/Resources/cc-card-logo.png";
import { Button }    from "~/ToolKit";
import GridContainer from "~/Components/GridContainer";
import FormsContext  from "~/Components/Forms/context";
import StripeInput   from "./StripeInput";
import useStyles     from "./styles";
import CardSusbriptionPay from "~/Components/Provider/CardSubscription/CardSubscriptionPay";

const stripePromise = loadStripe("pk_test_51GzR1qHxpLT0Kq13ZUqJUtrEPCUylHBiwOeSN0Nh5ojAlcnu7ezEyQqZMTSaEnRj9zpMLQaBuBojMYT6DCTadNn800GDhGUVjX");

const FormStripe = () => {
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
			}) => (
				<Grid
					container
					justify="center"
					item
					xs={12}
					md={10}
					className="Demo"
				>
					<form onSubmit={handleSubmit}>

						<GridContainer
							leftItems={[
								<Grid container key={"strip"}>
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
											<label htmlFor="">Codigo validador</label>
											<TextField
												className={classes.textField}
												variant = "outlined"
												name="ccnumber"
												required
												fullWidth
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
									<Grid item xs={12} className={classes.inputContainer}>
										<Button
											type="submit"
											variant="contained"
											color="primary"
											className={classes.button}
											disabled={!stripe}
										>
											Pagar y Registrarme
										</Button>
									</Grid>
								</Grid>,
							]}
							rightItems={[
								<CardSusbriptionPay key={2} data={selectSubs} delegations={{ stripe }} />,
							]}
						/>
					</form>
				</Grid>
			) }
		</FormsContext.Consumer>
	);
};

const Stripe = () => (
	<Elements stripe={stripePromise}>
		<FormStripe />
	</Elements>
);

export default Stripe;
