
import PropTypes from "prop-types";
import { Zoom }  from "react-reveal";
import {
	Dialog,
	AppBar,
	Toolbar,
	Grid,
} from "@material-ui/core";

// Import Own Components
import {
	Button,
	Typography,
	ButtonWithoutStyles as Clicker,
} from "~/ToolKit";
import CardSusbription from "~/Components/Provider/CardSubscription";
import { FaTimes }     from "~/Resources/icons/fal";
import useStyles       from "./styles";

const CardDialog = ({
	delegations : {
		handleSubmit,
		data,
		Transition,
		handleClickOpen,
		handleClose,
		open,
		submit,
		membership,
		selectSubscription,
	},
}) => {
	const classes = useStyles();

	return ( <>
		<Button color="primary" onClick={handleClickOpen}>
			Adquiere otro plan
		</Button>
		<Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar>
					<Clicker onClick={handleClose} aria-label="close">
						<FaTimes className={classes.Icon} />
					</Clicker>
					<Typography type="header3" color="white" className={classes.title}>
						Cambia tu membresía actual
					</Typography>
					<Button autoFocus color="white" textColor="primary" onClick={handleSubmit} disabled={!submit}>
						Guardar
					</Button>
				</Toolbar>
			</AppBar>
			{data?.subs && (
				<Grid
					container
					direction="row"
					justify="center"
					alignItems="center"
					alignContent="center"
					id="Subscriptions"
				>
					<Grid item xs={12} className={classes.gridPadding}>
						<Typography type="header3" color="grey">
							Elige la mejor opción para hacer crecer tus ventas
						</Typography>
					</Grid>
					{data.subs?.map((item, i) => (<>
						{ item.id != membership.subscription_id && (
							<Clicker
								onClick={selectSubscription(item.id)}
								key={i}
							>
								<Grid item>
									<Zoom>
										<CardSusbription data={item} />
									</Zoom>
								</Grid>
							</Clicker>
						)}
					</>))}
					<Grid item xs={12} className={classes.gridPadding}>
						<Typography type="caption" color="grey">
							* La subscripción se actualizara hasta tu siguiente factura.
						</Typography>
					</Grid>
				</Grid>
			)}
		</Dialog>
	</>
	);
};

CardDialog.propTypes = {
	delegations : PropTypes.object,
};

export default CardDialog;
