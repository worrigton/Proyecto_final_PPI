import PropTypes  from "prop-types";
import Pagination from "@material-ui/lab/Pagination";
import {
	Container,
	Paper,
	Grid,
} from "@material-ui/core";


// Import Own Components
import EmployeeLayout         from "~/Components/Employee/EmployeeLayout";
import TitlePage              from "~/Components/TitlePage";
import CardMedia              from "~/Components/CardMedia";
import { useRedirectTo }      from "~/Util/Hooks";
import { Typography, Button } from "~/ToolKit";
import useStyles              from "./styles";

const HomeContainer = ({
	delegations : {
		activePage, //se usara este parametro en la sigueinte versión
		registryData,
		pagination, //se usara este parametro en la sigueinte versión
		providers,
		page,
	},
}) => {
	const classes    = useStyles();
	const redirectTo = useRedirectTo();

	return (
		<EmployeeLayout>
			<Container className={classes.root} fixed>
				<TitlePage
					title="Proveedores"
					nameUrl="Inicio"
				/>
				<Grid
					container
					direction="row"
					justify="center"
					alignItems="stretch"
				>
					{ providers && (
						providers.map(item => (
							<Grid
								item
								xs={12}
								sm={6}
								md={4}
								lg={3}
								key={item.id}
								className={classes.padding}
								container
								direction="row"
								justify="flex-start"
							>
								<Paper className={classes.paperHeader}>
									<CardMedia
										image={`api/images/users/md/${item.user_id}`}
										height={180}
										width={"100%"}
									/>
								</Paper>
								<Paper className={classes.paperFooter}>
									<Grid
										container
										direction="row"
										justify="space-between"
										style={{
											height : "100%",
											width  : "100%",
										}}
									>
										<Grid item xs={12}>
											<Typography
												type="header3"
												color="grey"
												style={{
													fontSize   : "1.3rem",
													fontWeight : "bold",
												}}
											>
												{item.trade_name}
											</Typography>
											<br />
											{item.total_active_products == 0 ? (
												<Typography type="caption" color="grey">
													No tiene productos en oferta
												</Typography>
											) : (
												<Typography type="caption" color="grey">
													{item.total_active_products} productos en oferta
												</Typography>
											)}
											<br />
											<Typography type="body2">
												Miembro desde {registryData(item.created_at)}
											</Typography>
										</Grid>
										<Grid item xs={12} style={{ height : "0px" }}>
											<Button
												color="primary"
												className={classes.button}
												onClick={redirectTo(`/employee/products/${item.id || 0}`)}
											>
												Administrar
											</Button>
										</Grid>
									</Grid>
								</Paper>
							</Grid>
						)))}
				</Grid>
				<Grid
					container
					direction="column"
					justify="center"
					alignItems="center"
					alignContent="center"
				>
					<Grid item className={classes.padding} />
					<Grid item className={classes.padding}>
						<Typography>Página {page} de {pagination.pageCount}</Typography>
					</Grid>
					<Grid item className={classes.padding}>
						<Pagination
							className={classes.pagination}
							color="primary"
							count={pagination.pageCount}
							page={page}
							onChange={activePage}
						/>
					</Grid>
				</Grid>
			</Container>
		</EmployeeLayout>
	);
};

HomeContainer.propTypes = {
	delegations : PropTypes.object.isRequired,
};

export default HomeContainer;
