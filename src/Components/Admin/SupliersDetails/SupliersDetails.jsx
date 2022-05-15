/* eslint-disable camelcase */
import PropTypes from "prop-types";
import {
	Paper,
	Divider,
	Grid,
} from "@material-ui/core";
import { useRouter } from "next/router";
import moment from "moment";

// Import Own Compoents
import AdminLayout          from "~/Components/Admin/AdminLayout";
import CardMedia            from "~/Components/CardMedia";
import GridContainer        from "~/Components/GridContainer";
import TitlePage            from "~/Components/TitlePage";
import StarRating           from "~/Components/StarRating";
import ProductsOfProvider   from "~/Components/Products/ProductsOfProvider";
import Simpleloading        from "~/Components/Loading/SimpleLoading";
import { Typography, Span, Input, Button } from "~/ToolKit";
import useStyles            from "./styles";
import { useCallback } from "react";

const SupliersDetails = ({
	delegations : {
		userData : {
			data,
		},
		message,
		registryData,
		addressDetails,
		token,
		deleteProvider,
		addNote,
		handleChange,
		id,
	},
}) => {
	const classes = useStyles();
	const router = useRouter();

	const formatVigencia = useCallback((data)=> {
		const currenDate = moment(data);
		moment.locale("es");
		const vigency = currenDate.add(30, "days");
		return vigency.format("DD [de] MMM YYYY");
	}, []);
	return (
		router.query.providerId ? (
			<AdminLayout>
				<TitlePage
					title={data.legal_name}
					url="/admin/suppliers"
					nameUrl="Proveedor"
				/>
				{!message && (
					<>
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
										body={<>
											<StarRating
												rank={data.rating}
												size={1}
												className={classes.left}
											/>
											<Typography type="body2">
												Miembro desde {registryData(data.user?.created_at)}
											</Typography>
											<Typography type="caption" color="grey">
												{0} productos en oferta
											</Typography><br />
											<Typography type="caption" fontWeight="600">
												Regiones
											</Typography>
											<Grid container>
												{data.regions &&
													data.regions.map((item) => (
														<Grid item key={item.id} className={classes.margin}>
															<Span
																className={classes.spanFont}
																type="sussess"
																text={item.state}
															/>
														</Grid>
													))}
											</Grid>
										</>}
										height={120}
										otherClass
									/>
									<Input
										multiline
										rowsMax={4}
										type=""
										variant="outlined"
										label="Nota del proveedor"
										id="nota_proveedor"
										value={data.notes}
										onChange={handleChange("notes")}
										name = "notes"
									/>
									<Button
										key = "btn-delete-provider"
										color="primary"
										variant="contained"
										className={classes.btnEliminar}
										onClick={addNote}
									>
										{data.notes ? " Actualizar nota del proveedor" : "Guardar nota del proveedor" }
									</Button>
								</Paper>,
							]}
							rightItems={[
								<Paper key={3} className={classes.paper}>
									<Typography type="header4" fontWeight="600">
										Contacto
									</Typography>
									<Typography type="caption">
										{data.user?.email}
									</Typography>
									<br />
									<Typography type="caption">
										{data.address?.telephone}
									</Typography>
									<Divider className={classes.hr} />
									<Typography type="header4" fontWeight="600">
										Detalles del proveedor
									</Typography>
									<Typography type="caption">
										{data.trade_name}
									</Typography> <br />
									<Typography type="caption">
										{data.store_email}
									</Typography><br />
									{ data.address &&
										data.address.length <= 0 ? (
											<Typography type="caption" color="grey" />
										) : ( <>
											{addressDetails(data.address)}
										</>)}
									<Divider className={classes.hr} />
									<Typography type="header4" fontWeight="600">
										Suscripción
									</Typography>
									<Typography type="caption">
										Membresia: {data.membership?.membership}
									</Typography> <br />
									<Typography type="caption">
										{
											data.membership?.subscription_id == 4
												&& `${data?.total_active_products} Productos publicados`

										}
										{
											data.membership?.subscription_id !== 4
												&& `${data?.membership?.quantity_product - data?.total_active_products} 
												Productos disponibles`
										}
									</Typography> <br />
									<Typography type="caption">
										Renovación: { formatVigencia(data.membership?.created_at)  }
									</Typography> <br />
									<Typography type="caption">
										Estatus : {data.membership?.status === "INACTIVE" ? "INACTIVA" : "ACTIVA" }
									</Typography> <br />
								</Paper>,
								<Button
									key = "btn-delete-provider"
									color="warning"
									variant="contained"
									className={classes.btnEliminar}
									onClick={deleteProvider}
								>
									Eliminar Proveedor
								</Button>,
							]}
						/>
						{
							router.query && (
								<Grid container>
									<Grid item xs={12} className={classes.providerProductsTableContainer}>
										<ProductsOfProvider token={token} providerId={id} />
									</Grid>
								</Grid>
							)
						}
					</>
				)}
				{message && (
					<Typography type="header3" color="grey">
						{message}
					</Typography>
				)}
			</AdminLayout>
		) : (
			<Simpleloading />
		)
	);
};

SupliersDetails.propTypes = {
	delegations : PropTypes.object,
};

export default SupliersDetails;
