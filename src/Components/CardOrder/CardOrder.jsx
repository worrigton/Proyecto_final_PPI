import { useRouter } from "next/router";
import PropTypes     from "prop-types";
import Zoom          from "react-reveal/Zoom";
import {
	Card,
	CardContent,
	CardMedia,
	Hidden,
	Grid,
} from "@material-ui/core";

// Import Own Components
import {
	Typography,
	ButtonWithoutStyles as Clicker,
	Span,
} from "~/ToolKit";
import useStyles  from "./styles";
import toCurrency from "~/Util/formatToCurrency";

import moment from "moment";

/** Component to find an image with title and information */
const CardOrders = ({
	ago,
	code,
	amount,
	product,
	customerName,
	numberOfProducts,
}) => {
	const classes = useStyles();
	const router  = useRouter();
	const toProductDetails = (() =>
		router.push(`/proveedor/ordenes/detalles/${code}?provider_id=${product.provider_id}`));

	const agoDate = (ago) => {
		const currenDate = moment();
		const agoDate    = moment(ago);
		const afterHours = currenDate.diff(agoDate, "hours");

		if (afterHours > 24) {
			return "Hace mas de 24 horas";
		}

		return `Hace ${afterHours} horas`;
	};

	return (
		<Clicker
			className={classes.root}
			onClick={toProductDetails}
		>
			<Card elevation={0}>
				<Grid container>
					<Grid
						item
						container
						xs={4}
						sm={5}
						md={6}
						lg={4}
						justify="center"
						alignItems="center"
					>
						<Hidden smUp>
							<Zoom clear>
								<CardMedia
									className={classes.img}
									component="img"
									image={product.image}
									height={120}
									title={customerName}
								/>
							</Zoom>
						</Hidden>
						<Hidden xsDown>
							<Zoom clear>
								<CardMedia
									className={classes.img}
									component="img"
									image={product.image}
									height={220}
									title={customerName}
								/>
							</Zoom>
						</Hidden>
					</Grid>
					<Grid
						item
						container
						xs={8}
						sm={7}
						md={6}
						lg={4}
						alignItems="center"
					>
						<CardContent className={classes.cardContent}>
							<Grid
								container
								justify="center"
							>
								<Span
									type="warning"
									text={agoDate(ago)}
								/>
							</Grid>
							<br />
							<Typography
								type="caption"
								color="grey"
								fontWeight="700"
							>
								Cliente: {customerName}
							</Typography>
							<br />
							<Typography
								type="caption"
								color="grey"
								fontWeight="700"
							>
								{numberOfProducts > 1 ? `${numberOfProducts} productos` :
								 `${numberOfProducts} producto` }
							</Typography>
							<Grid
								item
							>
								<Typography
									color="dark"
									fontWeight="600"
									type="header3"
								>
									{toCurrency( amount )}
								</Typography>
							</Grid>
						</CardContent>
					</Grid>
				</Grid>
			</Card>
		</Clicker>
	);
};

CardOrders.propTypes = {
	id               : PropTypes.number,
	ago              : PropTypes.string,
	code             : PropTypes.string,
	amount           : PropTypes.number,
	product          : PropTypes.string,
	customerName     : PropTypes.string,
	numberOfProducts : PropTypes.number,
};

CardOrders.defaultProps = {
	cardActions      : <></>,
	numberOfProducts : "",
};

export default CardOrders;
