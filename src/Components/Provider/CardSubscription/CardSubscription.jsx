import { useRouter }    from "next/router";
import PropTypes        from "prop-types";
import { useCallback }  from "react";

import {
	Card,
	CardContent,
	CardMedia,
	CardActionArea,
	ListItem,
	List,
	ListItemText,
	ListItemIcon,
} from "@material-ui/core";

// Import Own Components
import { Button, Typography } from "~/ToolKit";
import { FaCheckCircle }      from "~/Resources/icons/fas";
import useStyles              from "./styles";

/** Component to find an image with title and information */
const CardSusbription = ({
	data,
	currentTarget,
}) => {
	const classes = useStyles();
	const router  = useRouter();

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const toRegister = useCallback((suscriptionId) =>
		router.push(`/proveedor/registro?suscriptionId=${suscriptionId}`));

	return (
		<div className={classes.root}>
			<Card className={`${classes.card} ${currentTarget === data?.id ? classes.active : "" }`}>
				<CardActionArea>
					<CardMedia
						className={`${classes.media}`}
					>
						<div className={classes.numProducts}>
							<Typography
								color="white"
								type="header3"
								fontWeight="400"
								style={{ lineHeight : "100%" }}
							>
								{data.name}
							</Typography>
						</div>
						<div className={classes.pricingPrice}>
							<span className={classes.price}>
								<span
									className={classes.pricingCurrency}
								>$ </span> {data.price / data.quantity_product}
							</span>
							<span>
								<span className={classes.pricingPeriod}>
									/mes
								</span>
							</span>
							<Typography style={{ color : "white" }}>
								Por producto
							</Typography>
						</div>
					</CardMedia>
					<CardContent className={classes.CardContent}>
						<List>
							{ data.features.map((item, id) => (
								<ListItem className={classes.list} key={id}>
									<ListItemIcon>
										<FaCheckCircle className={classes.icon} />
									</ListItemIcon>
									<ListItemText secondary={item.description} />
								</ListItem>
							))}
						</List>
						{ !router.route.includes("registry") && (
							<Button
								color={"primary"}
								className={classes.button}
								onClick={() => toRegister(data.id)}
							>
								Continuar
							</Button>
						)}
					</CardContent>
				</CardActionArea>
			</Card>
		</div>
	);
};

CardSusbription.propTypes = {
	data          : PropTypes.object,
	currentTarget : PropTypes.number,
};

CardSusbription.defaultProps = {
	data : {},
};

export default CardSusbription;
