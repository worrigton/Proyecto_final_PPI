import PropTypes  from "prop-types";
import Link       from "next/link";
import {
	Container,
	Grid,
	Paper,
	Divider,
} from "@material-ui/core";

// Import Own Components
import { FaMapMarkerAlt }   from "~/Resources/icons/fal";
import PrivateCustomerRoute from "~/Components/Customer/PrivateCustomerRoute";
import CustomerLayout       from "~/Components/Customer/CustomerLayout";
import TitlePage            from "~/Components/TitlePage";
import CardDescription      from "~/Components/CardDescription";
import { Typography }       from "~/ToolKit";
import useStyles            from "./styles";

const AddressPage = ({
	delegations : {
		pagination,
		details,
		addressProfiles,
		activePage,
		page,
		message,
	},
}) => {
	const classes = useStyles();

	return (
		<PrivateCustomerRoute>
			<CustomerLayout>
				<Container fixed className={classes.container}>
					<TitlePage
						title="Direcciones"
						btnTitle="Agregar dirección"
						url="/cliente"
						nameUrl="Mi cuenta"
						btnUrl="/cliente/agregar-domicilio"
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
							className={classes.gridPadding}
						>
							<b>Direcciones  de entrega</b>
							<p>
								{"Administra las direcciones donde recibes tus pedidos."}
								{"Puede elegir la dirección al momento de realizar tu compra"}
							</p>
						</Grid>
						<Grid
							item
							xs={12}
							md={8}
						>
							{ !message ? (
								<Paper>
									{addressProfiles.map((item, i) => (<>
										<Link href={`/customer/address/${item.id}`} key={i}>
											<a className={classes.a}>
												<CardDescription
													title={item.label}
													description={details(item)}
													icon={<FaMapMarkerAlt />}
													predeterminado={item.flags}
												/>
											</a>
										</Link>
										<Divider />
									</>))}
								</Paper>
							) : (
								<Typography color="grey" type="header3" className={classes.center}>
									{message}
								</Typography>
							)}
						</Grid>
					</Grid>
				</Container>
			</CustomerLayout>
		</PrivateCustomerRoute>
	);
};

AddressPage.propTypes = {
	delegations : PropTypes.object,
};

export default AddressPage;
