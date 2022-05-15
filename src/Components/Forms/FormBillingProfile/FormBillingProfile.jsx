import PropTypes from "prop-types";
import {
	Grid,
	FormControl,
	Paper,
	MenuItem,
	Select,
} from "@material-ui/core";

// Import Own Components
import {
	Typography,
	Input,
	Select2,
} from "~/ToolKit";
import FormsContext from "~/Components/Forms/context";
import useStyles    from "~/Components/Forms/styles";

const FormBillingProfile = ({
	delegations : {
		taxReg,
	},
}) => {
	const classes = useStyles();

	return (
		<FormsContext.Consumer>
			{({
				valuesBillingProfile,
				valuesAddress,
				handleChangeAddress,
				handleChangeBillingProfile,
				handleSelect,
				validate,
				validateText,
				intNumber,
				state,
				cities,
			}) => (
				<Grid
					container
					justify="center"
					item
					xs={12}
					md={6}
				>
					<Paper variant="outlined" className={classes.paperPadding}>
						<FormControl className={classes.formControl}>
							<Grid
								container
								direction="row"
								justify="flex-start"
								alignItems="center"
							>
								<Grid
									item
									xs={12}
								>
									<Grid
										item
										xs={12}
									>
										<Typography>
											* Régimen fiscal
										</Typography>
										<Select
											labelId="select-order-by-pagination-products-label"
											id="taxRegimen"
											onChange={handleSelect("taxRegimen")}
											name="taxRegimen"
											variant="outlined"
											className={classes.select}
											fullWidth
											value={valuesBillingProfile.taxRegimen}
											style={{ margin : "0.5rem 0" }}
										>
											<MenuItem value="" disabled>
												Selecciona el régimen fiscal
											</MenuItem>
											<MenuItem value="PHYSICAL">Persona física</MenuItem>
											<MenuItem value="MORAL">Persona moral</MenuItem>
										</Select>
									</Grid>
								</Grid>
								{valuesBillingProfile.taxRegimen === "MORAL" && (
									<Grid
										item
										xs={12}
										md={12}
									>
										<Input
											label={
												<Typography>
													* Razón social
												</Typography>
											}
											id="legalName"
											variant="outlined"
											name="legalName"
											value={valuesBillingProfile.legalName}
											onChange={handleChangeBillingProfile("legalName")}
											error={validate("billing", "legalName")}
											helperText={validateText("billing", "legalName")}
										/>
									</Grid>
								)}
								<Grid
									item
									xs={12}
									md={12}
								>
									<Input
										label={
											<Typography>
												* Nombre comercial
											</Typography>
										}
										id="legalName"
										variant="outlined"
										name="legalName"
										value={valuesBillingProfile.name}
										onChange={handleChangeBillingProfile("name")}
										error={validate("billing", "name")}
										helperText={validateText("billing", "name")}
									/>
								</Grid>
								<Grid
									item
									xs={12}
								>
									<Input
										label={
											<Typography>
												* RFC
											</Typography>
										}
										id="rfc"
										variant="outlined"
										name="rfc"
										value={valuesBillingProfile.rfc}
										onChange={handleChangeBillingProfile("rfc")}
										error={validate("billing", "rfc")}
										helperText={validateText("billing", "rfc")}
									/>
								</Grid>
								<Grid
									item
									xs={12}
								>
									<Input
										label={
											<Typography color="defaulf" style={{ textTransform : "initial" }}>
												* Email <span> (en esta dirección llegarán tus facturas)</span>
											</Typography>
										}
										id="email-id"
										variant="outlined"
										name="email-name"
										value={valuesBillingProfile.email}
										onChange={handleChangeBillingProfile("email")}
										error={validate("billing", "email")}
										helperText={validateText("billing", "email")}
									/>
								</Grid>
								<Grid
									item
									xs={12}
								>
									<Select2
										label={
											<Typography>
												* Estado
											</Typography>
										}
										id="state-id"
										name="state-name"
										options={state}
										onChange={handleSelect("state")}
										valueSelect={valuesAddress.state}
									/>
								</Grid>
								<Grid
									item
									xs={12}
								>
									<Select2
										label={
											<Typography color={valuesAddress.state == null ? "grey" : "defaulf"}>
												* Municipio { valuesAddress.state == null &&
													<span> (Primero elige un estado)</span>}
											</Typography>
										}
										id="city-id"
										name="city-name"
										options={cities}
										disabled={valuesAddress.state == null}
										onChange={handleSelect("city")}
										valueSelect={valuesAddress.city}
									/>
								</Grid>
								<Grid
									item
									xs={12}
								>
									<Input
										autoComplete={false}
										label={
											<Typography>
												* Dirección
											</Typography>
										}
										id="address-id"
										variant="outlined"
										name="address-name"
										value={valuesAddress.address}
										onChange={handleChangeAddress("address")}
										error={validate("address", "address")}
										helperText={validateText("address", "address")}
									/>
								</Grid>
								<Grid
									item
									xs={12}
								>
									<Input
										label={
											<Typography>
												* Número exterior
											</Typography>
										}
										id="extNumber"
										variant="outlined"
										name="extNumber"
										value={valuesAddress.extNumber}
										onChange={handleChangeAddress("extNumber")}
										error={validate("address", "extNumber")}
										helperText={validateText("address", "extNumber")}
									/>
								</Grid>
								<Grid
									item
									xs={12}
								>
									<Input
										label={
											<Typography>
												Número interior
											</Typography>
										}
										id="intNumber"
										variant="outlined"
										name="intNumber"
										value={intNumber}
										onChange={handleChangeAddress("intNumber")}
									/>
								</Grid>
								<Grid
									item
									xs={12}
								>
									<Input
										label={
											<Typography>
												* Colonia
											</Typography>
										}
										id="neighborhood"
										variant="outlined"
										name="neighborhood"
										value={valuesAddress.neighborhood}
										onChange={handleChangeAddress("neighborhood")}
										error={validate("address", "neighborhood")}
										helperText={validateText("address", "neighborhood")}
									/>
								</Grid>
								<Grid
									item
									xs={12}
								>
									<Input
										label={
											<Typography>
												* Código Postal
											</Typography>
										}
										id="zipCode-id"
										variant="outlined"
										name="zipCode-name"
										type="number"
										value={valuesAddress.zipCode}
										onChange={handleChangeAddress("zipCode")}
										error={validate("address", "zipCode")}
										helperText={validateText("address", "zipCode")}
									/>
								</Grid>
								<Grid
									item
									xs={12}
								>
									<Input
										label={
											<Typography>
												* Teléfono
											</Typography>
										}
										id="telephone"
										variant="outlined"
										name="telephone"
										type="number"
										value={valuesAddress.telephone}
										onChange={handleChangeAddress("telephone")}
										error={validate("address", "telephone")}
										helperText={validateText("address", "telephone")}
									/>
									<div className={classes.padding} />
								</Grid>
							</Grid>
						</FormControl>
					</Paper>
				</Grid>
			) }
		</FormsContext.Consumer>
	);
};

FormBillingProfile.propTypes = {
	delegations : PropTypes.shape({
		taxReg : PropTypes.array,
	}).isRequired,
};

export default FormBillingProfile;
