import {
	Paper,
	Grid,
	Divider,
	Avatar,
} from "@material-ui/core";
import { PropTypes } from "prop-types";
import { useRouter } from "next/router";

// Import own compoents
import StarRating                                     from "~/Components/StarRating/";
import { ButtonWithoutStyles as Clicker, Typography } from "~/ToolKit";
import useStyles                                      from "./styles";

const OrderDataCustomer = ({ delegations : { data, customer, handleQualifyClient } }) => {
	const classes = useStyles();
	const router  = useRouter();

	return (
		<Paper className={classes.root}>
			<Grid container>
				<Grid item xs={12} container alignItems="center">
					<Grid container justify="space-between" alignItems="center">
						<Grid>
							<Typography type="body2" fontWeight="700">
								Cliente
							</Typography>
						</Grid>
						<Grid>
							<Avatar alt="cliente" src={customer.images.xs} />
						</Grid>
					</Grid>
					<Grid>
						<br />
						<Typography type="body2">
							{`${data.customer.first_name} ${data.customer.last_name}`}
						</Typography>
					</Grid>
					<Grid container justify="space-between">
						<Grid item>
							<StarRating
								rank={customer.rating}
								size={1}
								className={classes.left}
							/>
						</Grid>
						{ router.pathname !== "/admin/orders/details/[id]" && <>
							<Grid item>
								<Clicker onClick={() => handleQualifyClient(data.customer.id)}>
									<Typography
										type="caption"
										color="secondary"
									>
										Calificar cliente
									</Typography>
								</Clicker>
							</Grid>
						</>}
					</Grid>
				</Grid>
				<Grid item xs={12} container direction="column">
					<Typography type="body2">
						{`${customer.total_orders} pedidos realizados`}
					</Typography>
					<Divider className={classes.separator} />
				</Grid>
				<Grid item xs={12} container direction="column">
					<Typography type="body2" fontWeight="700">
						INFORMACIÓN DE CONTACTO
					</Typography>
					<br />
					<Typography type="body2" color="secondary">
						{customer.user.email}
					</Typography>
					<Typography type="body2">
						Tel. {data.customer.customer_address.address.telephone}
					</Typography>
					<Divider className={classes.separator} />
				</Grid>
				<Grid item xs={12} container direction="column">
					<Typography type="body2" fontWeight="700">
						DIRECCIÓN DE ENVIO
					</Typography>
					<br />
					<Typography type="body2">
						{`${data.customer.customer_address.address.street} 
						${data.customer.customer_address.address.ext_number}`}
					</Typography>
					<Typography type="body2">
						{`CP. ${data.customer.customer_address.address.zip_code} 
						${data.customer.customer_address.address.city}, 
						${data.customer.customer_address.address.state}`}
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

OrderDataCustomer.propTypes = {
	delegations : PropTypes.object.isRequired,
};

export default OrderDataCustomer;
