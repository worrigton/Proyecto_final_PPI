import { useMemo } from "react";
import PropTypes   from "prop-types";
import {
	Container,
	Grid,
	FormControl,
	Checkbox,
	FormControlLabel,
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

const FormBillingProfile = ({
	delegations : {
		handleSelect,
		handleChange,
		valuesAddress,
		validateText,
		formValidate,
		validateEmail,
		validateTextEmail,
		validate,
		intNumber,
		submitBtn,
		submit,
		state,
		cities,
		taxReg,
	},
}) => {
	const classes = useStyles();

	const styles = useMemo(() => ({
		height : "25px",
	}), []);

	return (
		<PrivateCustomerRoute>
			<CustomerLayout>
				<Container fixed className={classes.container}>
					<TitlePage
						title="Agregar perfil de facturación"
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
										id="label"
										variant="outlined"
										name="label"
										value={valuesAddress.label}
										onChange={handleChange("label")}
										error={validate("label")}
										helperText={validateText("label")}
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
												id="check"
												checked={valuesAddress.checked}
												onClick={handleChange("checked")}
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
						<hr className={classes.hrMargin} />
						<ContentLayout
							title="Dirección"
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
									<Select2
										label="* Régimen fiscal"
										id="taxRegimen"
										name="taxRegimen"
										options={taxReg}
										onChange={handleSelect("taxRegimen")}
										valueSelect={valuesAddress.taxRegimen}
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
										styles={styles}
										id="rfc"
										variant="outlined"
										name="rfc"
										value={valuesAddress.rfc}
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
										value={valuesAddress.email}
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
										styles={styles}
										id="address"
										variant="outlined"
										name="address"
										value={valuesAddress.address}
										onChange={handleChange("address")}
										error={validate("address")}
										helperText={validateText("address")}
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
										styles={styles}
										id="ext"
										variant="outlined"
										name="extNumber"
										value={valuesAddress.extNumber}
										onChange={handleChange("extNumber")}
										error={validate("extNumber")}
										helperText={validateText("extNumber")}
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
										styles={styles}
										id="int"
										variant="outlined"
										name="intNumber"
										value={intNumber}
										onChange={handleChange("intNumber")}
									/>
									<br />
								</Grid>
								<Grid
									item
									xs={12}
									md={6}
									className={classes.inputPadding}
								>
									<Select2
										styles={styles}
										label="* Estado"
										id="state"
										name="state"
										options={state}
										onChange={handleSelect("state")}
										valueSelect={valuesAddress.state}
									/>
									<br />
								</Grid>
								<Grid
									item
									xs={12}
									md={6}
									className={classes.inputPadding}
								>
									<Select2
										styles={styles}
										label={(
											<>
												* Municipio
												{!valuesAddress.state && (
													<span> (Primero elige un estado)</span>
												)}
											</>
										)}
										id="city"
										name="city"
										options={cities}
										onChange={handleSelect("city")}
										valueSelect={valuesAddress.city}
										disabled={valuesAddress.state == null}
									/>
									<br />
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
										value={valuesAddress.neighborhood}
										onChange={handleChange("neighborhood")}
										error={validate("neighborhood")}
										helperText={validateText("neighborhood")}
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
										styles={styles}
										id="zipCode"
										type="number"
										variant="outlined"
										value={valuesAddress.zipCode}
										onChange={handleChange("zipCode")}
										error={validate("zipCode")}
										helperText={validateText("zipCode")}
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
										styles={styles}
										id="telephone"
										variant="outlined"
										value={valuesAddress.telephone}
										onChange={handleChange("telephone")}
										error={validate("telephone")}
										helperText={validateText("telephone")}
									/>
								</Grid>
							</Grid>
						</ContentLayout>
						<hr className={classes.hrMargin} />
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
FormBillingProfile.propTypes = {
	delegations : PropTypes.object.isRequired,
};

export default FormBillingProfile;
