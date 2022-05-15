/* eslint-disable camelcase */
import PropTypes       from "prop-types";
import {
	useCallback,
	useState,
	useMemo,
	useEffect,
} from "react";
import {
	Grid,
	FormControl,
	Divider,
	Container,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableBody,
	TableCell,
	TableFooter,
	TablePagination,
} from "@material-ui/core";

// Import own Components
import Service              from "~/Service";
import withStateLoaded      from "~/Store/withStateLoaded";
import { Typography, Span } from "~/ToolKit";
import PrivateProviderRoute from "~/Components/Provider/PrivateProviderRoute";
import ProviderLayout       from "~/Components/Provider/ProviderLayout";
import TitlePage            from "~/Components/TitlePage";
import ContentLayout        from "~/Components/ContentLayout";
import stripe               from "~/Resources/stripe.png";
import useStyles            from "./styles";

const PaymentMethodPage = ({ provider, membership }) => {
	const classes = useStyles();
	const [page, setPage]               = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const [tableData, setTableData] = useState({
		rowsData   : [],
		pagination : {},
	});

	const registryData = useCallback((param) => {
		const date = new Date(param);
		const options = {
			year  : "numeric",
			month : "long",
			day   : "numeric",
		};
		return date.toLocaleDateString("es-ES", options);
	}, []);

	const handleChangePage = useCallback((event, newPage) => {
		setPage(newPage);
	}, []);

	const handleChangeRowsPerPage = useCallback((event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
	}, []);

	useEffect(() => {
		(async () => {
			if (provider.token) {
				let response = {};
				response = await Service.api.provider.historyPayments(
					page + 1,
					`provider_id=${provider.data.provider.id}&page_size=${rowsPerPage}`,
					provider.token);
				const rowData = response?.body?.collection.reduce((accum, data) => {
					accum.push({
						date   : data.created_at,
						status : {
							flags  : data.payment_status,
							status : data.status,
						},
						total : data.price,
					},
					);
					return accum;
				}, []);

				setTableData({
					...tableData,
					rowsData   : rowData,
					pagination : response.body?.pagination,
					message    : response.body?.collection?.length > 0 ? "" : "Aún no hay registros",
				});
			}
		})();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, rowsPerPage]);

	const columns = useMemo(() => [
		{
			title : "Cliclo de facturación",
			field : "date",
		},
		{
			title : "Estado",
			field : "state",
		},
		{
			title : "Monto",
			field : "total",
		},
	], []);

	return (
		<PrivateProviderRoute>
			<ProviderLayout>
				<Container fixed className={classes.container}>
					<TitlePage
						title="Método de pago"
						url="/proveedor/cuenta"
						nameUrl="Configuración"
					/>
					<ContentLayout
						title="Datos de facturación"
						// eslint-disable-next-line max-len
						description="Tus facturas se pagan usando este método de pago"
					>
						<FormControl className={classes.formControl}>
							<Grid
								container
								direction="row"
								alignItems="flex-start"
							>
								<Grid item xs={12} md={4}>
									<img src={stripe} style={{ height : "6rem" }} />
								</Grid>
							</Grid>
						</FormControl>
					</ContentLayout>
					<Divider className={classes.hr} />
					<ContentLayout
						title="Facturas y otros cargos"
						description="Tu factura mensual está en un ciclo de 30 días. Incluye tu subscripción a Zoko"
					>
						<FormControl className={classes.formControl}>
							<Typography type="body2">
								Ciclo de facturación actual:
							</Typography>
							<div className={classes.gridPadding} />
							<Grid
								container
								direction="row"
								justify="space-between"
								alignItems="center"
							>
								<Grid xs={6}>
									<Typography type="body2">
										Cargos de Subscripción
									</Typography>
								</Grid>
								<Grid xs={6}>
									<Typography type="body2">
										{Intl.NumberFormat(
											"es-MX",
											{ style : "currency", currency : "MXN" }
										).format(membership.price)} MNX
									</Typography>
								</Grid>
								<Grid xs={12}>
									<Divider className={classes.hr2} />
								</Grid>
								<Grid xs={6}>
									<Typography type="body2" fontWeight="700">
										Total Acumulado
									</Typography>
								</Grid>
								<Grid xs={6}>
									<Typography type="body2" fontWeight="700">
										{Intl.NumberFormat(
											"es-MX",
											{ style : "currency", currency : "MXN" }
										).format(membership.price)} MNX
									</Typography>
								</Grid>
							</Grid>

						</FormControl>
					</ContentLayout>
					<div className={classes.hr} />
					<ContentLayout>
						<FormControl className={classes.formControl}>
							<TableContainer className={classes.marginY}>
								<Table className={classes.table} aria-label="caption table">
									<TableHead>
										Facturas recientes
										<TableRow>
											{
												columns.map(item =>
													<TableCell key={item.field}>{item.title}</TableCell>
												)
											}
										</TableRow>
									</TableHead>
									<TableBody>
										{tableData.rowsData.map((row) => (
											<TableRow key={row.date}>
												<TableCell component="th" scope="row">
													<Typography type="caption" color="grey">
														{registryData(row.date)}
													</Typography>
												</TableCell>
												<TableCell align="left">
													{ row.status.flags === "PAID_OUT" && (
														<Span
															type="alert"
															text={"Pagado"}
														/>
													)}
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
												count={tableData.pagination.rowCount}
												page={page}
												onChangePage={handleChangePage}
												rowsPerPage={rowsPerPage}
												onChangeRowsPerPage={handleChangeRowsPerPage}
											/>
										</TableRow>
									</TableFooter>
								</Table>
							</TableContainer>
						</FormControl>
					</ContentLayout>
				</Container>
			</ProviderLayout>
		</PrivateProviderRoute>
	);
};

PaymentMethodPage.propTypes = {
	provider   : PropTypes.any,
	membership : PropTypes.any,
};


const mapStateToProps = ({ userReducer : { provider } }) => ({
	provider,
	membership : provider?.data?.provider.membership,
});

export default withStateLoaded(mapStateToProps, null)(PaymentMethodPage);
