import { Grid } from "@material-ui/core";
import Stripe   from "./Stripe/Stripe";

const FormPay = () => (
	<Grid item xs={12} container>
		<Stripe />
	</Grid>
);

export default FormPay;
