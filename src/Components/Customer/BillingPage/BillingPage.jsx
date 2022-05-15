import PropTypes  from "prop-types";
import Link       from "next/link";
import {
	Container,
	Grid,
	Paper,
	Divider,
} from "@material-ui/core";

// Import Own Components
import { FaFileInvoiceDollar } from "~/Resources/icons/fal";
import PrivateCustomerRoute    from "~/Components/Customer/PrivateCustomerRoute";
import CustomerLayout          from "~/Components/Customer/CustomerLayout";
import TitlePage               from "~/Components/TitlePage";
import CardDescription         from "~/Components/CardDescription";
import useStyles               from "./styles";

const BillingPage = ({
	delegations : {
		activePage,
		pagination,
		details,
		billingProfiles,
		page,
	},
}) => {
	const classes = useStyles();

	return (
		<PrivateCustomerRoute>
			<CustomerLayout>
				<Container fixed className={classes.container}>
					<TitlePage
						title="Facturación"
						btnTitle="Agregar dirección"
						url="/cliente"
						nameUrl="Mi cuenta"
						btnUrl="/cliente/nuevo-perfil-de-facturacion"
					/>
					<Grid
						container
						direction="row"
						justify="center"
						alignItems="flex-start"
					>
						<Grid
							item
							xs={12}
							md={4}
						>
							<b>Perfiles de facturación</b>
							<p>
								{"Administra tus perfiles donde facturas, "}
								{"puedes elegir el perfil de facturación al momento de pagar tu compra"}
							</p>
						</Grid>
						<Grid
							item
							xs={12}
							md={8}
						>
							<Paper>
								{ billingProfiles &&
									billingProfiles.map((item, i) => (<>
										<Link href={`/customer/billing-profiles/${item.id}`} key={i}>
											<a className={classes.a}>
												<CardDescription
													title={item.name}
													description={details(item)}
													icon={<FaFileInvoiceDollar />}
													predeterminado={item.flags}
												/>
											</a>
										</Link>
										<Divider />
									</>))}
							</Paper>
						</Grid>
					</Grid>
				</Container>
			</CustomerLayout>
		</PrivateCustomerRoute>
	);
};

BillingPage.propTypes = {
	delegations : PropTypes.object,
};

export default BillingPage;
