/* eslint-disable camelcase */
import PropTypes  from "prop-types";
import Pagination from "@material-ui/lab/Pagination";
import {
	Grid,
	Paper,
	Tabs,
	Tab,
	Container,
	Divider,
	Hidden,
	FormControl,
} from "@material-ui/core";

// Import Own Components
// eslint-disable-next-line no-unused-vars
import {
	ButtonWithoutStyles as Clicker,
	Typography,
	Select2,
	Button,
} from "~/ToolKit";
import CustomerLayout       from "~/Components/Customer/CustomerLayout";
import PrivateCustomerRoute from "~/Components/Customer/PrivateCustomerRoute";
import useStyles            from "./styles";

const Orders = ({
	delegations : {
		tabs,
		tabValue,
		handleChange,
		registryData,
		TotalAmount,
		shippingFlags,
		statusFlags,
		invoicedFlags,
		statusFlagsCancel,
		toOrderDetail,
		invoicedBtn,
		page,
		activePage,
		paidBtn,
		hasComprobant,
		tableData : {
			data,
			pagination,
			message,
		},
		handleClickOpen,
		handleDownloadFile,
	},
}) => {
	const classes = useStyles();

	return (
		<PrivateCustomerRoute>
			<CustomerLayout>
				<Container fixed className={classes.container}>
					<Grid
						container
						direction="row"
						justify="center"
						alignItems="flex-start"
					>
						<Grid item xs={12} className={classes.paddingY}>
							<Typography type="header2">
								Mis pedidos
							</Typography>
						</Grid>
						<Hidden smDown>
							<Grid item xs={12}>
								<Tabs
									value={tabValue}
									onChange={handleChange}
									indicatorColor={"primary"}
									aria-label="Table tabs"
									className={classes.tabs}
									classes={{
										indicator : classes.indicator,
									}}
								>
									{ tabs.map((item) => (
										<Tab
											key={item.id}
											label={item.label}
											className={classes.tab}
										/>
									)) }
								</Tabs>
								<Divider className={classes.divider} />
							</Grid>
						</Hidden>
						<Hidden mdUp>
							<Grid item xs={12}>
								<FormControl variant="outlined" className={classes.formControl}>
									<Select2
										id="billing"
										name="billing"
										options={tabs}
										valueSelect={tabs[tabValue]}
										onChange={handleChange}
										className={classes.select2}
									/>
								</FormControl>
							</Grid>
						</Hidden>
						{data && data.map(items => (
							<Grid
								key={items.id}
								container
								direction="row"
								justify="center"
								alignItems="flex-start"
								item xs={12}
								className={classes.paddingY}
							>
								<Paper className={classes.divider}>
									<Grid
										container
										direction="row"
										justify="center"
										alignItems="flex-start"
										xs={12}
										className={classes.header}
									>
										<Grid item md={5} xs={12}>
											Realizado el {registryData(items[0].timestamp)}
										</Grid>
										<Grid item md={4} xs={12} className={classes.left}>
											Total {TotalAmount(items)}
										</Grid>
										<Grid item md={3} xs={12} className={classes.right}>
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
											<Grid container item md={7}>
												{details.products && details.products.map(product =>
													<Grid item container key={product.id}>
														<Grid item md={9} xs={12} className={classes.flex}>
															<Hidden smDown>
																<img
																	src={
																		`/api/images/products/sm/${product.file_id}`
																	}
																/>
															</Hidden>
															<Hidden mdUp>
																<img
																	src={
																		`/api/images/products/xs/${product.file_id}`
																	}
																/>
															</Hidden>
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
														<Grid item md={3} xs={12} className={classes.flex}>
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
												md={5}
												direction="row"
												justify="center"
												alignItems="flex-start"
											>
												<Grid item xs={12} md={6} className={classes.paddingY}>
													{details.status === "CANCELED" || details.status === "DECLINED" ? (
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
													item xs={12}
													md={6}
													className={classes.flex2}
												>
													{details.status != "CANCELED" && details.status != "DECLINED" && (
														<>
															{ invoicedBtn(details) &&
																<Button
																	color="white"
																	variant="outlined"
																	size="small"
																	className={classes.button}
																	onClick={() => handleDownloadFile(items[0].bill_id)}
																>
																	Descargar factura
																</Button>}
															{ !hasComprobant(details) && ( <>
																<Button
																	color="white"
																	variant="outlined"
																	size="small"
																	className={classes.button}
																	onClick={()=>handleClickOpen(
																		items[0].id, "VOUCHER")}
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
																	onClick={() => handleDownloadFile(
																		items[0].voucher_id)}
																>
																	Descargar ficha de pago
																</Button>
															</>)}
															<Clicker
																className={classes.button}
																onClick={toOrderDetail(
																`/customer/orders/details/${details.code}
																?provider_id=${details?.products[0]?.provider_id}`
																)}>
																<Typography color="primary" type="body2">
																	Ver detalles
																</Typography>
															</Clicker>
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
						{ message &&
							<Grid item className={classes.paddingY}>
								<Typography type="header3">
									{ message }
								</Typography>
							</Grid>}
						{pagination && !message &&
							<Grid item className={classes.padding}>
								<Pagination
									className={classes.pagination}
									color="primary"
									count={pagination.pageCount}
									page={page}
									onChange={activePage}
								/>
							</Grid>}
					</Grid>
				</Container>
			</CustomerLayout>
		</PrivateCustomerRoute>
	);
};

Orders.propTypes = {
	delegations : PropTypes.object,
};

export default Orders;
