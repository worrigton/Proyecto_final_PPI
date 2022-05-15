import { Grid } from "@material-ui/core";

// Import Own Components
import CardSusbription from "~/Components/Provider/CardSubscription";
import FormsContext    from "~/Components/Forms/context";
import { ButtonWithoutStyles as Clicker } from "~/ToolKit";

const FormAccount = () => (
	<FormsContext.Consumer>
		{ ({
			subscription,
			selectSubscription,
			selectSubs,
		}) => (
			<Grid
				container
				direction="row"
				justify="center"
				alignItems="center"
				xs={12}
			>
				{subscription?.map((subs, i) => (
					<Clicker
						onClick={selectSubscription(subs)}
						key={i}
					>
						<Grid item>
							<CardSusbription data={subs} currentTarget={selectSubs?.id} />
						</Grid>
					</Clicker>
				))}
			</Grid>
		) }
	</FormsContext.Consumer>
);
export default FormAccount;
