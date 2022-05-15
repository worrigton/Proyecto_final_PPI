/* eslint-disable max-len */
/* eslint-disable camelcase */
import PropTypes from "prop-types";
import {
	Grid,
	FormControl,
	Divider,
	Container,
	Typography as Typography2,
} from "@material-ui/core";

// Import Own Components
import PrivateProviderRoute from "~/Components/Provider/PrivateProviderRoute";
import ProviderLayout       from "~/Components/Provider/ProviderLayout";
import TitlePage            from "~/Components/TitlePage";
import ContentLayout        from "~/Components/ContentLayout";
import useStyles            from "./styles";
import {
	Typography,
	Input,
	Button,
	Select2,
	NavLink,
	MultiSelect,
} from "~/ToolKit";
import { FaMapMarkerAlt } from "~/Resources/icons/fal";

const GeneralPage = ({
	delegations : {
		handleSelect,
		handleChange,
		handleChangeAddress,
		validate,
		validateAddress,
		validateText,
		validateAddressText,
		formValidate,
		handleMultiSelect,
		validateEmail,
		validateTextEmail,
		regions,
		submitBtn,
		submit,
		actCity,
		actState,
		states,
		cities,
		userData,
	},
}) => {
	const classes = useStyles();

	return (
		<PrivateProviderRoute>
			<ProviderLayout>
				<Container fixed className={classes.container}>
					<TitlePage
						title="General"
						url="/proveedor/cuenta"
						nameUrl="Configuración"
					/>
					<ContentLayout
						title="Detalles de la tienda"
						description="Zoko y tus clientes usarán esta información para contactarte."
					>
						<FormControl className={classes.formControl}>
							<Grid
								container
								direction="row"
								alignItems="flex-start"
								className={classes.gridPadding}
							>
								<Grid
									item
									xs={12}
									className={classes.inputPadding}
								>
									<Input
										label="Nombre de la tienda"
										id="trade_name"
										variant="outlined"
										name="trade_name"
										value={userData.trade_name}
										onChange={handleChange("trade_name")}
										error={validate("trade_name")}
										helperText={validateText("trade_name")}
									/>
								</Grid>
								<Grid
									item
									xs={12}
									md={6}
									className={classes.inputPadding}
								>
									<Input
										label="Correo electrónico"
										id="email"
										variant="outlined"
										name="email"
										value={userData.user?.email}
										onChange={handleChange("email")}
										disabled
									/>
									<Typography type="caption" color="grey">
										Usaremos este correo para comunicarnos contigo.
										Puedes cambiarlo desde el panel de
										<NavLink
											href="/proveedor/perfil"
											name="Información de inicio."
											color="primary"
										/>
									</Typography>
								</Grid>
								<Grid
									item
									xs={12}
									md={6}
									className={classes.inputPadding}
								>
									<Input
										label="Correo electrónico para clientes"
										id="store_email"
										variant="outlined"
										name="store_email"
										type="email"
										value={userData.store_email}
										onChange={handleChange("store_email") || validate("legal_name")}
										error={validateEmail()}
										helperText={validateText("store_email") || validateTextEmail()}
									/>
									<Typography type="caption" color="grey">
										Tus clientes visualizarán este correo de contacto para que ellos puedan
										 comunicarse contigo.
									</Typography>
								</Grid>
							</Grid>
						</FormControl>
					</ContentLayout>
					<Divider className={classes.hr} />
					<ContentLayout
						title="Dirección de la tienda"
						description="Esta dirección en la dirección de la tienda"
					>
						<FormControl className={classes.formControl}>
							<Grid
								container
								direction="row"
								justify="flex-start"
								alignItems="flex-start"
								className={classes.gridPadding}
							>
								<Grid
									item
									xs={12}
									md={12}
									className={classes.inputPadding}
								>
									<Input
										label="* Nombre de la tienda / Razón social"
										id="legal_name"
										variant="outlined"
										name="legal_name"
										value={userData.legal_name}
										onChange={handleChange("legal_name")}
										error={validate("legal_name")}
										helperText={validateText("legal_name")}
									/>
								</Grid>
								<Grid
									item
									xs={12}
									md={6}
									className={classes.inputPadding}
								>
									<Input
										label="* Dirección"
										id="address"
										variant="outlined"
										name="address"
										value={userData.address?.street}
										onChange={handleChangeAddress("street")}
										error={validateAddress("street")}
										helperText={validateAddressText("street")}
									/>
								</Grid>
								<Grid
									item
									xs={12}
									md={3}
									className={classes.inputPadding}
								>
									<Input
										label="* Número exterior"
										id="ext"
										variant="outlined"
										name="ext_number"
										value={userData.address?.ext_number}
										onChange={handleChangeAddress("ext_number")}
										error={validateAddress("ext_number")}
										helperText={validateAddressText("ext_number")}
									/>
								</Grid>
								<Grid
									item
									xs={12}
									md={3}
									className={classes.inputPadding}
								>
									<Input
										label="Número interior"
										id="int"
										variant="outlined"
										name="int_number"
										value={userData.address?.int_number}
										onChange={handleChangeAddress("int_number")}
									/>
								</Grid>
								<Grid
									item
									xs={12}
									md={6}
									className={classes.inputPadding}
								>
									<Select2
										label="* Estado"
										id="state"
										name="state"
										options={states}
										onChange={handleSelect("state")}
										valueSelect={actState}
									/>
								</Grid>
								<Grid
									item
									xs={12}
									md={6}
									className={classes.inputPadding}
								>
									<Select2
										label={(
											<>
												* Municipio
												{actState == null && (
													<span> (Primero elige un estado)</span>
												)}
											</>
										)}
										id="city"
										name="city"
										options={cities}
										onChange={handleSelect("city")}
										valueSelect={actCity}
										disabled={actState == null}
									/>
								</Grid>
								<Grid
									item
									xs={12}
									md={6}
									className={classes.inputPadding}
								>
									<Input
										label="* Colonia"
										id="neighborhood"
										variant="outlined"
										name="neighborhood"
										value={userData.address?.neighborhood}
										onChange={handleChangeAddress("neighborhood")}
										error={validateAddress("neighborhood")}
										helperText={validateAddressText("neighborhood")}
									/>
								</Grid>
								<Grid
									item
									xs={6}
									md={3}
									className={classes.inputPadding}
								>
									<Input
										label="* Código Postal"
										id="zipCode"
										variant="outlined"
										type="number"
										value={userData.address?.zip_code}
										onChange={handleChangeAddress("zip_code")}
										error={validateAddress("zip_code")}
										helperText={validateAddressText("zip_code")}
									/>
								</Grid>
								<Grid
									item
									xs={6}
									md={3}
									className={classes.inputPadding}
								>
									<Input
										label="* Teléfono"
										id="telephone"
										variant="outlined"
										type="number"
										value={userData.address?.telephone}
										onChange={handleChangeAddress("telephone")}
										error={validateAddress("telephone")}
										helperText={validateAddressText("telephone")}
									/>
								</Grid>
							</Grid>
						</FormControl>
					</ContentLayout>
					<Divider className={classes.hr} />
					<ContentLayout
						title="Presencia de ventas"
						description="Las regiones en las que están disponibles tus productos."
					>
						<FormControl className={classes.formControl}>
							<Grid
								container
								direction="row"
								justify="space-between"
								alignItems="center"
								className={classes.gridPadding}
							>
								<Grid
									item
									className={classes.input}>
									<FaMapMarkerAlt className={classes.icon} />
								</Grid>
								<Grid
									item
									xs={11}
									className={classes.input}
								>
									{ states.length > 0 && (
										<MultiSelect
											label="Región"
											id="Region"
											name="Region"
											options={states}
											valueSelect={regions}
											onChange={handleMultiSelect}
										/>
									)}
									{ (regions.length <= 0 && states.length > 0) && (
										<Typography2 color="error" variant="body2">
											Tienes que tener al menos una región
										</Typography2>
									)}
								</Grid>
							</Grid>
						</FormControl>
					</ContentLayout>
					<Divider className={classes.hr} />
					<ContentLayout
						title="Mi cuenta bancaria"
						description="La información de pago que se mostrará a los compradores. Asegúrese de que su nombre y la información de su cuenta bancaria coincidan con su cuenta bancaria, de lo contario, sus transacciones no se realizarán."
					>
						<FormControl className={classes.formControl}>
							<Grid
								container
								direction="row"
								justify="space-between"
								alignItems="center"
								className={classes.gridPadding}
							>
								<Grid
									item
									xs={12}
									md={12}
									className={classes.inputPadding}
								>
									<Input
										label="* Nombre del títular"
										id="titular_acount"
										variant="outlined"
										name="titular_acount"
										value={userData.titular_acount}
										onChange={handleChange("titular_acount")}
										error={validate("titular_acount")}
										helperText={validateText("titular_acount")}
									/>
								</Grid>
								<Grid
									item
									xs={12}
									md={12}
									className={classes.inputPadding}
								>
									<Input
										label="* Número de cuenta"
										id="number_acount"
										variant="outlined"
										name="number_acount"
										value={userData.number_acount}
										onChange={handleChange("number_acount")}
										error={validate("number_acount")}
										helperText={validateText("number_acount")}
									/>
								</Grid>
								<Grid
									item
									xs={12}
									md={12}
									className={classes.inputPadding}
								>
									<Input
										label="* CLABE"
										id="clabe_acount"
										variant="outlined"
										name="clabe_acount"
										value={userData.clabe_acount}
										onChange={handleChange("clabe_acount")}
										error={validate("clabe_acount")}
										helperText={validateText("clabe_acount")}
									/>
								</Grid>
							</Grid>
						</FormControl>
					</ContentLayout>
					<Divider className={classes.hr} />
					<Grid
						container
						direction="row"
						justify="flex-end"
						alignItems="center"
					>
						<Button
							disabled={formValidate()}
							color="primary"
							onClick={submit || submitBtn}
						>
							Guardar
						</Button>
					</Grid>
				</Container>
			</ProviderLayout>
		</PrivateProviderRoute>
	);
};

GeneralPage.propTypes = {
	delegations : PropTypes.object.isRequired,
};

export default GeneralPage;
