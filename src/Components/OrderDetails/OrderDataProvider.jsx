import {
	Paper,
	Grid,
	Avatar,
	Divider,
} from "@material-ui/core";
import { PropTypes } from "prop-types";
import { useRouter } from "next/router";

import { ButtonWithoutStyles as Clicker, Typography } from "~/ToolKit";
import StarRating                                     from "~/Components/StarRating/";
import useStyles                                      from "./styles";

const OrderDataProvider = ({ delegations : {
	data,
	provider,
	customer,
	handleQualifyClient,
} }) => {
	const classes = useStyles();
	const router  = useRouter();
	return (
		<Paper className={classes.root}>
			<Grid container>
				<Grid item xs={12} container alignItems="center">
					<Grid container justify="space-between" alignItems="center">
						<Grid>
							<Typography type="header3" fontWeight="bold">
								Proveedor
							</Typography>
						</Grid>
						<Grid>
							<Avatar alt={provider.trade_name} src={provider.images?.sm} />
						</Grid>
					</Grid>
					<Typography type="body2" fontWeight="700">
						{provider.trade_name}
					</Typography>
					<Grid container justify="space-between">
						<Grid item container>
							<StarRating
								rank={provider.rating}
								size={1}
								className={classes.left}
							/>
							<span>&nbsp;{provider.rating}</span>
						</Grid>
						{ router.pathname !== "/admin/orders/details/[id]" && <>
							<Grid item>
								<Clicker
									style={{ padding : 0 }}
									onClick={() => handleQualifyClient(data.customer.id)}
								>
									<Typography
										type="caption"
										color="secondary"
									>
										Calificar vendedor
									</Typography>
								</Clicker>
							</Grid>
						</>}
					</Grid>
				</Grid>
				<Grid item xs={12} container direction="column">
					<Typography type="header5" fontWeight="bold">
						{provider.not_ready_sale_orders} ventas realizadas
					</Typography>
					<Divider className={classes.separator} />
				</Grid>
				<Grid item xs={12} container direction="column">
					<Typography type="body2">
						{provider.trade_name}
					</Typography>
					<Typography type="body2">
						{provider.store_email}
					</Typography>
					<Typography type="body2">
						{provider.address?.telephone && (
							`Tel. ${provider.address?.telephone}`
						)}
					</Typography>
					<Divider className={classes.separator} />
				</Grid>
				<Grid item xs={12} container direction="column">
					<Typography type="body2" fontWeight="700">
						DIRECCIÓN DE ENVIO
					</Typography>
					<Typography type="body2">
						{ `${data.customer.customer_address.address.street} 
						${data.customer.customer_address.address.ext_number}, 
						${data.customer.customer_address.address.neighborhood}` }
					</Typography>
					<Typography type="body2">
						{`${data.customer.customer_address.address.zip_code} 
							${data.customer.customer_address.address.city} 
							${data.customer.customer_address.address.state}
						`}
					</Typography>
					<Typography type="body2">
						{data.customer.customer_address.address.telephone}
					</Typography>
					<Divider className={classes.separator} />
				</Grid>
				{
					data.billing_profiles_id ? (
						<Grid item xs={12} container direction="column">
							<Typography type="body2" fontWeight="700">
								DIRECCIÓN DE FACTURACIÓN
							</Typography>
							<Typography type="body2">
								{`${data.customer.billing_profile.address.street} 
								${data.customer.billing_profile.address.ext_number}, 
								${data.customer.billing_profile.address.neighborhood}` }
							</Typography>
							<Typography type="body2">
								{`CP. ${data.customer.billing_profile.address.zip_code} 
								${data.customer.billing_profile.address.city}, 
								${data.customer.billing_profile.address.state}`}
							</Typography>
						</Grid>
					) : (
						<Typography type="body2" fontWeight="700">
							No solicito factura
						</Typography>
					)
				}
			</Grid>
		</Paper>
	);
};

OrderDataProvider.propTypes = {
	delegations : PropTypes.object.isRequired,
};

export default OrderDataProvider;
