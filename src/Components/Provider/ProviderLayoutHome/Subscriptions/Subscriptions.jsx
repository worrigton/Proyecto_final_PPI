import PropTypes from "prop-types";
import {
	Fade,
	Zoom,
	Flip,
} from "react-reveal";
import {
	Container,
	Grid,
	Hidden,
} from "@material-ui/core";

// Import Own Components
import Typography       from "~/ToolKit/Typography";
import MultipleCarousel from "~/Components/MultipleCarousel";
import CardSusbription  from "~/Components/Provider/CardSubscription";
import useStyles        from "./styles";

const Subscriptions = ({ subscriptions }) => {
	const classes = useStyles();

	return (
		<div className={classes.container} id="planes">
			<Container fixed>
				<Grid
					container
					direction="row"
					justify="space-between"
					alignItems="stretch"
					alignContent="center"
					id="Subscriptions"
				>
					<Grid
						item
						xs={12}
						className={classes.titlePadding}
					>
						<Fade bottom delay={500} duration={1500}>
							<Typography
								type="title"
								fontWeight="700"
							>
								Los mejores planes para ti
							</Typography>
							<br />
							<Typography
								type="header3"
								fontWeight="400"
								color="grey"
							>
								¡Vea las opciones disponibles y aumenta tus ventas con nosotros!
							</Typography>
						</Fade>
					</Grid>
					{subscriptions?.subs && (<>
						<Hidden mdDown>
							{subscriptions.subs?.map((item, i) => (
								<Grid item key={i}>
									<Zoom>
										<CardSusbription data={item} />
									</Zoom>
								</Grid>
							))}
						</Hidden>
						<Hidden lgUp>
							<Grid
								item
								xs={12}
								className={classes.titlePadding}
							>
								<MultipleCarousel settingsProps={null}>
									{subscriptions.subs?.map((item, i) => (
										<CardSusbription data={item} key={i} />
									))}
								</MultipleCarousel>
							</Grid>
						</Hidden>
					</>)}
					<Grid
						item
						xs={12}
						className={classes.titlePadding}
					>
						<Flip bottom delay={500} duration={1500}>
							<Typography
								type="body2"
								fontWeight="400"
								color="grey"
							>
								Todos nuestros precios se encuentran en pesos mexicanos.
								Todos nuestros servicios están sujetos a nuestras condiciones generales.
							</Typography>
						</Flip>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
};

Subscriptions.propTypes = {
	subscriptions : PropTypes.array.isRequired,
};

Subscriptions.defaultProps = {
	subscriptions : [],
};

export default Subscriptions;
