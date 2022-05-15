/* eslint-disable camelcase */
import { useMemo } from "react";
import PropTypes   from "prop-types";
import {
	Container,
	Grid,
	FormControl,
	Checkbox,
	FormControlLabel,
	Divider,
} from "@material-ui/core";

import {
	Typography,
	Input,
	Button,
	Select2,
} from "~/ToolKit";

// Import Own Components
import PrivateCustomerRoute from "~/Components/Customer/PrivateCustomerRoute";
import TitlePage            from "~/Components/TitlePage";
import ContentLayout        from "~/Components/ContentLayout";
import CustomerLayout       from "~/Components/Customer/CustomerLayout";
import useStyles            from "./styles";

const EditFormBillingProfile = ({
	delegations : {
		handleSelect,
		handleChange,
		handleChangeAddress,
		validateAddressText,
		validateAddress,
		validateEmail,
		validateText,
		validateTextEmail,
		validate,
		formValidate,
		submit,
		actState,
		actCity,
		states,
		cities,
		submitBtn,
		billingProfile,
		initial,
		taxReg,
		checked,
		hadleChecked,
		actRegimen,
	},
}) => {
	const classes = useStyles();
	const styles  = useMemo(() => ({
		height : "25px",
	}), []);

	return (
		<PrivateCustomerRoute>
			<CustomerLayout>
				<Container fixed className={classes.container}>
					<TitlePage
						title="Editar perfil de facturación"
						url="/cliente/perfiles-de-facturacion"
						nameUrl="Facturación"
					/>
					<FormControl className={classes.formControl}>
						<ContentLayout
							title="Detalles"
							description="Dale a este perfil de facturación un nombre corto para identificarla
							fácilmente. Verás este nombre en áreas como pedidos y productos."
						>
							<Grid
								container
								direction="row"
								justify="flex-start"
								alignItems="center"
								className={classes.gridPadding}
							>
								<Grid
									item
									xs={12}
									className={classes.inputPadding}
								>
									<Input
										label="* Nombre"
										styles={styles}
										id="name"
										variant="outlined"
										name="name"
										value={billingProfile.name}
										onChange={handleChange("name")}
										error={validate("name")}
										helperText={validateText("name")}
									/>
								</Grid>
								<Grid
									item
									xs={12}
									className={classes.inputPadding}
								>
									<FormControlLabel
										value="end"
										control={
											<Checkbox
												color="primary"
												size="small"
												id="checked"
												checked={checked}
												onClick={hadleChecked}
											/>
										}
										label={
											<Typography type="body2">
												Dirección predeterminada
											</Typography>
										}
										labelPlacement="end"
									/>
									<br />
									<Typography type="caption">
										Utiliza esta dirección como predeterminada para recibir tus pedidos
									</Typography>
								</Grid>
							</Grid>
						</ContentLayout>
						<Divider className={classes.hrMargin} />
						<ContentLayout
							title="Dirección"
						>
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
									className={classes.inputPadding}
								>
									<Select2
										label="* Régimen fiscal"
										id="tax_regime"
										name="tax_regime"
										options={taxReg}
										onChange={handleSelect("tax_regime")}
										valueSelect={actRegimen}
									/>
								</Grid>
								<Grid
									item
									xs={12}
									md={6}
									className={classes.inputPadding}
								>
									<Input
										label="* RFC"
										id="rfc"
										variant="outlined"
										name="rfc"
										value={billingProfile.rfc}
										onChange={handleChange("rfc")}
										error={validate("rfc")}
										helperText={validateText("rfc")}
									/>
								</Grid>
								<Grid
									item
									xs={12}
									md={6}
									className={classes.inputPadding}
								>
									<Input
										label="* Email"
										styles={styles}
										id="email"
										variant="outlined"
										name="email"
										value={billingProfile.email}
										onChange={handleChange("email")}
										error={validateEmail() || validate("email")}
										helperText={validateTextEmail() || validateText("email")}
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
										value={billingProfile.address?.street}
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
										value={billingProfile.address?.ext_number}
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
										value={billingProfile.address?.int_number}
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
										value={billingProfile.address?.neighborhood}
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
										value={billingProfile.address?.zip_code}
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
										value={billingProfile.address?.telephone}
										onChange={handleChangeAddress("telephone")}
										error={validateAddress("telephone")}
										helperText={validateAddressText("telephone")}
									/>
								</Grid>
							</Grid>
						</ContentLayout>
						<Divider className={classes.hrMargin} />
						<Grid
							container
							direction="row"
							justify="flex-end"
							alignItems="center"
						>
							<Button
								color="primary"
								onClick={submit}
								disabled={formValidate() || submitBtn}>
								Guardar
							</Button>
						</Grid>
					</FormControl>
				</Container>
			</CustomerLayout>
		</PrivateCustomerRoute>
	);
};
EditFormBillingProfile.propTypes = {
	delegations : PropTypes.object.isRequired,
};

export default EditFormBillingProfile;
