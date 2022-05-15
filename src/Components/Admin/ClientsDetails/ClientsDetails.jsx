/* eslint-disable max-len */
/* eslint-disable camelcase */
import PropTypes from "prop-types";
import {
	Paper,
	Divider,
	Grid,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

// Import Own Compoents
import AdminLayout   from "~/Components/Admin/AdminLayout";
import CardMedia     from "~/Components/CardMedia";
import GridContainer from "~/Components/GridContainer";
import TitlePage     from "~/Components/TitlePage";
import StarRating    from "~/Components/StarRating";
import flecha        from "~/Resources/img/flecha.png";
import {
	Typography,
	Select2,
	Button,
	ButtonWithoutStyles as Clicker,
} from "~/ToolKit";
import useStyles from "./styles";

const ClientsDetails = ({
	delegations : {
		userData : {
			data,
			address,
			billing,
			orders,
			pagination,
		},
		handleDelete,
		message,
		registryData,
		addressDetails,
		billingProfilesDetails,
		handleSelect,
		billingSelect,
		id,
		statusFlagsCancel,
		statusFlags,
		shippingFlags,
		invoicedFlags,
		invoicedBtn,
		hasComprobant,
		handleClickOpen,
		TotalAmount,
		page,
		activePage,
		handleQualifyClient,
	},
}) => {
	const classes = useStyles();
	return (
		<AdminLayout>
			<TitlePage
				title={data?.user?.email}
				url="/admin/clients"
				nameUrl="Clientes"
			/>
			{message && (
				<Typography type="header3" color="grey">
					{message}
				</Typography>
			)}
			{data?.id && (
				<GridContainer
					leftItems={[
						<Paper key={1} className={classes.paper}>
							<CardMedia
								classesProps={classes.img}
								image={`/api/images/users/lg/${data.user_id}`}
								title={(<>
									<Typography type="header4" fontWeight="700">
										{data.user?.username}
									</Typography>
								</>)}
								body={
									<>
										<div className={classes.rating}>
											<StarRating
												rank={data.rating}
												size={1}
												className={classes.left}
											/>
											<span className={classes.ratingQty}>{ data.rating / 2 }</span>
										</div>
										<Typography type="body2">
											Cliente desde {registryData(data.user?.created_at)}
										</Typography>
										<Typography type="caption" color="grey">
											{data.total_orders} Pedidos realizados
										</Typography>
										<Clicker onClick={() => handleQualifyClient(data.customer.id)}>
											<Typography
												type="caption"
												color="secondary"
											>
												Calificar cliente
											</Typography>
										</Clicker>
									</>
								}
								height={120}
								otherClass
							/>
						</Paper>,
						<Paper key={2} className={classes.paper}>
							<Typography type="header4" fontWeight="700">
								Pedidos realizados
							</Typography>
							{ orders.length > 0 ? (<>
								{orders.map(items => (
									<Grid
										key={items.id}
										container
										direction="row"
										justify="center"
										alignItems="flex-start"
										item xs={12}
										className={classes.paddingY}
									>
										<Paper className={classes.divider} variant="outlined">
											<Grid
												container
												direction="row"
												justify="center"
												alignItems="flex-start"
												xs={12}
												className={classes.header}
											>
												<Grid item md={4} xs={12}>
													Realizado el {registryData(items[0].timestamp)}
												</Grid>
												<Grid item md={4} xs={12} className={classes.left2}>
													Total {TotalAmount(items)}
												</Grid>
												<Grid item md={4} xs={12} className={classes.right}>
													No. de pedido  {items[0].code}
												</Grid>
											</Grid>
											{ items.map( details => ( <>
												<Grid
													key={details.id}
													container
													direction="row"
													justify="center"
													alignItems="flex-start"
													xs={12}
													className={classes.body}
												>
													<Grid container item md={6}>
														{details.products && details.products.map(product =>
															<Grid item container key={product.id}>
																<Grid item sm={9} xs={12} className={classes.flex}>
																	<img
																		src={
																			`/api/images/products/xs/${product.file_id}`
																		}
																	/>
																	<Grid item className={classes.description}>
																		<Typography type="body2" fontWeight="600">
																			{product.name}
																		</Typography>
																		<Typography type="caption">
																			{`Calidad ${product.quality}. 
																			Tamaño ${product.size}`}
																		</Typography><br />
																		<Typography type="caption" color="grey">
																			{`Vendido por ${details.trade_name}`}
																		</Typography>
																	</Grid>
																</Grid>
																<Grid item sm={3} xs={12} className={classes.flex}>
																	<Grid className={classes.description}>
																		<Typography type="body2" fontWeight="600">
																			{Intl.NumberFormat(
																				"es-MX",
																				{ style : "currency", currency : "MXN" }
																			).format(product.cost)}
																		</Typography>
																		<Typography type="caption" color="grey">
																			{`${product.quantity.toFixed(2)}kg`}
																		</Typography>
																	</Grid>
																</Grid>
															</Grid>
														)}
													</Grid>
													<Grid
														item
														container
														md={6}
														direction="row"
														justify="center"
														alignItems="flex-start"
													>
														<Grid item md={8} sm={6} lg={8} className={classes.paddingY}>
															{details.status === "CANCELED"
															|| details.status === "DECLINED" ? (
																	statusFlagsCancel(details)
																) : ( <>
																	{statusFlags(details)}
																	{shippingFlags(details)}
																	{invoicedFlags(details)}
																</>)}
														</Grid>
														<Grid
															container
															direction="row"
															justify="center"
															alignItems="flex-start"
															item
															md={4}
															lg={4}
															sm={6}
															className={classes.flex2}
														>
															{details.status != "CANCELED"
															&& details.status != "DECLINED" && (
																<>
																	{ invoicedBtn(details) &&
																		<Button
																			color="white"
																			variant="outlined"
																			size="small"
																			className={classes.button}
																		>
																			Descargar factura
																		</Button>}
																	{ !hasComprobant(details) && ( <>
																		<Button
																			color="white"
																			variant="outlined"
																			size="small"
																			className={classes.button}
																			onClick={() => handleClickOpen(items[0].id)}
																		>
																			Cargar comprobante
																		</Button>
																	</>)}
																	{ hasComprobant(details) && ( <>
																		<Button
																			color="white"
																			variant="outlined"
																			size="small"
																			className={classes.button}
																		>
																			Descargar ficha de pago
																		</Button>
																	</>)}
																</>
															)}
														</Grid>
													</Grid>
												</Grid>
												<Divider className={classes.divider} />
											</>
											))}
										</Paper>
									</Grid>
								))}
							</>) : (
								<div className={classes.center}>
									<img src={flecha} />
									<div />
									<Typography type="caption" color="grey">
										Este cliente aún no tiene pedidos
									</Typography>
								</div>
							)}
						</Paper>,
						<Grid key="paginado" item className={classes.padding}>
							{ orders.length > 0 &&
								<Pagination
									className={classes.pagination}
									color="primary"
									count={pagination.pageCount}
									page={page}
									onChange={activePage}
								/>}
						</Grid>,
					]}
					rightItems={[
						<Paper key={3} className={classes.paper}>
							<Typography type="header4" fontWeight="600">
								Información del cliente
							</Typography>
							<Typography type="caption">
								{`${data.first_name} ${data.last_name}`}
							</Typography>
							<br />
							<Typography type="caption">
								{data.user?.email}
							</Typography>
							<Divider className={classes.hr} />
							<Typography type="header4" fontWeight="600">
								Dirección predeterminada
							</Typography>
							{ address &&
								address?.collection?.length <= 0 ? (
									<Typography type="caption" color="grey">
										Este cliente aun no tiene direcciones.
									</Typography>
								) : ( <>
									{addressDetails(address?.collection[0]?.address)}
								</>)}
							<Divider className={classes.hr} />
							<Typography type="header4" fontWeight="600">
								Perfiles de facturación
							</Typography>
							{ billing &&
								billing?.collection?.length <= 0 ? (
									<Typography type="caption" color="grey">
										Este cliente no tiene perfiles de facturación
									</Typography>
								) : ( <>
									<Select2
										id="billing"
										name="billing"
										options={billing.collection}
										onChange={handleSelect()}
										className={classes.select2}
									/>
									{ billingSelect }
								</>)}
						</Paper>,
						<Grid key="eliminar-cuenta" className={classes.separator} container justify="flex-end">
							<Button
								type="button"
								onClick={() => {
									handleDelete(data.user_id);
								}}
								color="warning">Eliminar cuenta
							</Button>
						</Grid>,
					]}
				/>
			)}
		</AdminLayout>
	);
};

ClientsDetails.propTypes = {
	delegations : PropTypes.object,
};

export default ClientsDetails;
