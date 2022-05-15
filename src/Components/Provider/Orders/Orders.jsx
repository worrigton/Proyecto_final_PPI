/* eslint-disable camelcase */
import PropTypes  from "prop-types";
import {
	Grid,
	Paper,
	Tabs,
	Tab,
	Container,
	Divider,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	TablePagination,
	TableFooter,
	Menu,
	MenuItem,
	Hidden,
} from "@material-ui/core";

// Import Own Components
// eslint-disable-next-line no-unused-vars
import {
	//ButtonWithoutStyles as Clicker,
	Button,
	Typography,
	NativeInput,
} from "~/ToolKit";
import ProviderLayout       from "~/Components/Provider/ProviderLayout";
import PrivateProviderRoute from "~/Components/Provider/PrivateProviderRoute";
import { FaSearch }         from "~/Resources/icons/fas";
import { FaChevronDown }    from "~/Resources/icons/fal";
import useStyles            from "./styles";

const Orders = ({
	delegations : {
		page,
		tabs,
		tabValue,
		rowsPerPage,
		columns,
		activePage,
		handleChange,
		handleChangePage,
		handleChangeRowsPerPage,
		registryData,
		statusFlags,
		shippingFlags,
		anchorEl,
		handleOpen,
		handleClose,
		selectFlags,
		handleOpen2,
		handleClose2,
		anchorEl2,
		selectShipping,
		handleChangeOrder,
		handleChangeInput,
		tableData : {
			rowsData,
			pagination,
		},
		toOrderDetail,
	},
}) => {
	const classes = useStyles();
	return (
		<PrivateProviderRoute>
			<ProviderLayout>
				<Container maxWidth="lg" className={classes.container}>
					<Typography className={classes.title} type="header2">
						Pedidos
					</Typography>
					<TableContainer component={Paper} className={classes.marginY}>
						<Table className={classes.table} aria-label="caption table">
							<Tabs
								value={tabValue}
								onChange={handleChange}
								indicatorColor={"secondary"}
								aria-label="Table tabs"
								className={classes.tabs}
								classes={{
									indicator : classes.indicator,
								}}
							>
								{ tabs.map(({ label }, index) => (
									<Tab
										key={index}
										label={label}
										className={classes.tab}
									/>
								)) }
							</Tabs>
							<Divider />
						</Table>
						{ tabValue == 0 &&
							<Table className={classes.table} aria-label="caption table">
								<Grid
									container
									direction="row"
									justify="flex-start"
									alignItems="flex-start"
									className={classes.padding}
								>
									<Grid item xs={12} md={7}>
										<NativeInput
											id="admin-products-searchbar"
											placeholder="Filtrar pedidos"
											startAdornment={FaSearch}
											className={classes.input}
											onChange={handleChangeInput}
										/>
									</Grid>
									<Grid item>
										<Button
											className={classes.borderButton}
											color="white"
											variant="outlined"
											endIcon={<FaChevronDown />}
											onClick={handleOpen}
										>
											Estado del pago
										</Button>
										<Menu
											id="simple-menu"
											anchorEl={anchorEl}
											keepMounted
											open={Boolean(anchorEl)}
											onClose={handleClose}
											disableScrollLock={true}
											anchorOrigin={{ vertical : "bottom", horizontal : "center" }}
											transformOrigin={{ vertical : "top", horizontal : "center" }}
										>
											<MenuItem
												onClick={selectFlags(1)}
											>
												Pagado
											</MenuItem>
											<MenuItem onClick={selectFlags(2)}>Pago pendiente</MenuItem>
											<MenuItem onClick={selectFlags(3)}>Todos</MenuItem>
											{/*<MenuItem onClick={selectFlags(4)}>Pago por confirmar</MenuItem>*/}
										</Menu>
									</Grid>
									<Grid item>
										<Button
											className={classes.borderButton}
											color="white"
											variant="outlined"
											endIcon={<FaChevronDown />}
											onClick={handleOpen2}
										>
											Estado de preparación
										</Button>
										<Menu
											id="simple-menu"
											anchorEl={anchorEl2}
											keepMounted
											open={Boolean(anchorEl2)}
											onClose={handleClose2}
											disableScrollLock={true}
											anchorOrigin={{ vertical : "bottom", horizontal : "center" }}
											transformOrigin={{ vertical : "top", horizontal : "center" }}
										>
											<MenuItem onClick={selectShipping(1)}>No preparado</MenuItem>
											<MenuItem onClick={selectShipping(2)}>Preparado</MenuItem>
											<MenuItem onClick={selectShipping(3)}>Enviado</MenuItem>
											<MenuItem onClick={selectShipping(4)}>Entregado</MenuItem>
											<MenuItem onClick={selectShipping(5)}>Cancelado</MenuItem>
											<MenuItem onClick={selectShipping(6)}>Cancelado por el cliente</MenuItem>
											<MenuItem onClick={selectShipping(7)}>Todos</MenuItem>
										</Menu>
									</Grid>
									<Grid item>
										<Button
											className={classes.borderButton}
											color="white"
											variant="outlined"
											startIcon="⇵"
											onClick={handleChangeOrder}
										>
											Ordenar
										</Button>
									</Grid>
								</Grid>
							</Table>}
						<Hidden smDown>
							<Table className={classes.table} aria-label="caption table">
								{(Array.isArray(rowsData) && rowsData.length > 0) && ( <>
									<TableHead>
										<TableRow>
											{
												columns.map(item =>
													<TableCell key={item.field}>{item.title}</TableCell>
												)
											}
										</TableRow>
									</TableHead>
									<TableBody>
										{rowsData.map((row, index) => (
											<TableRow className={classes.tableRowClicker} key={index} onClick={
												toOrderDetail(
													`/proveedor/ordenes/detalles/${row.order}
													?provider_id=${row.provider_id}`
												)
											}
											>
												<TableCell component="th" scope="row">
													<Typography color="secondary">
														#{row.order}
													</Typography>
												</TableCell>
												<TableCell align="left">
													<Typography type="caption" color="grey">
														{registryData(row.date)}
													</Typography>
												</TableCell>
												<TableCell align="left">
													{row.customer_name}
												</TableCell>
												<TableCell align="left">
													{statusFlags(row.paid_status, row.status)}
												</TableCell>
												<TableCell align="left">
													{shippingFlags(row.shipping_status, row.status)}
												</TableCell>
												<TableCell align="left">
													{Intl.NumberFormat(
														"es-MX",
														{ style : "currency", currency : "MXN" }
													).format(row.total)}

												</TableCell>
											</TableRow>
										))}
									</TableBody>
									<TableFooter>
										<TableRow>
											<TablePagination
												rowsPerPageOptions={[5, 10, 25, 50, 100]}
												count={pagination.rowCount}
												page={page}
												onChangePage={handleChangePage}
												rowsPerPage={rowsPerPage}
												onChangeRowsPerPage={handleChangeRowsPerPage}
											/>
										</TableRow>
									</TableFooter>
								</>)}
							</Table>
						</Hidden>
						<Hidden mdUp>
							{(Array.isArray(rowsData) && rowsData.length > 0) &&
								rowsData.map((row, index) => (
									<>
										<Divider />
										<Grid
											key={index}
											className={classes.padding}
											onClick={
												toOrderDetail(
													`/proveedor/ordenes/detalles/${row.order}
													?provider_id=${row.provider_id}`
												)
											}
										>
											<Grid
												container
												direction="row"
												justify="space-between"
												alignItems="flex-start"
											>
												<Grid item>
													<Typography type="caption" color="secondary">
														#{row.order}
													</Typography>
												</Grid>
												<Grid item>
													<Typography type="caption" color="grey">
														{registryData(row.date)}
													</Typography>
												</Grid>
											</Grid>
											<Grid
												container
												direction="row"
												justify="space-between"
												alignItems="flex-start"
											>
												<Grid item>
													<Typography type="body2" fontWeight="600">
														{row.customer_name}
													</Typography>
												</Grid>
												<Grid item>
													<Typography type="body2" color="grey">
														{Intl.NumberFormat(
															"es-MX",
															{ style : "currency", currency : "MXN" }
														).format(row.total)}
													</Typography>
												</Grid>
											</Grid>
											<Grid>
												<p />
												{statusFlags(row.paid_status)}
												{shippingFlags(row.shipping_status)}
											</Grid>
										</Grid>
									</>
								))}
							<Divider />
							<TablePagination
								component="div"
								rowsPerPageOptions={[5, 10, 25, 50, 100]}
								count={pagination.rowCount}
								page={page}
								onChangePage={handleChangePage}
								rowsPerPage={rowsPerPage}
								onChangeRowsPerPage={handleChangeRowsPerPage}
							/>
						</Hidden>
					</TableContainer>
				</Container>
			</ProviderLayout>
		</PrivateProviderRoute>
	);
};

Orders.propTypes = {
	delegations : PropTypes.object,
};

export default Orders;
