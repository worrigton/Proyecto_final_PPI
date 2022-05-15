import {
	Grid,
	FormControl,
	Paper,
	Select,
	MenuItem,
} from "@material-ui/core";

// Import Own Components
import {
	Typography,
	Input,
	Select2,
} from "~/ToolKit";
import FormsContext from "~/Components/Forms/context";
import useStyles    from "~/Components/Forms/styles";

const FormProvider = () => {
	const classes = useStyles();

	return (
		<FormsContext.Consumer>
			{({
				valuesAddress,
				handleChangeAddress,
				handleSelect,
				validate,
				validateText,
				intNumber,
				valuesProvider,
				handleChangeProvider,
				cities,
				state,
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
										value={valuesProvider.taxRegimen}
										style={{ margin : "0.5rem 0" }}
									>
										<MenuItem value="" disabled>
											Selecciona el régimen fiscal
										</MenuItem>
										<MenuItem value="PHYSICAL">Persona física</MenuItem>
										<MenuItem value="MORAL">Persona moral</MenuItem>
									</Select>
								</Grid>
								{valuesProvider.taxRegimen === "MORAL" && (
									<Grid
										item
										xs={12}
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
											value={valuesProvider.legalName}
											onChange={handleChangeProvider("legalName")}
											error={validate("provider", "legalName")}
											helperText={validateText("provider", "legalName")}
										/>
									</Grid>
								)}
								<Grid
									item
									xs={12}
								>
									<Input
										label={
											<Typography>
												* Nombre comercial
											</Typography>
										}
										id="tradeName"
										variant="outlined"
										name="tradeName"
										value={valuesProvider.tradeName}
										onChange={handleChangeProvider("tradeName")}
										error={validate("provider", "tradeName")}
										helperText={validateText("provider", "tradeName")}
									/>
								</Grid>
								<Grid
									item
									xs={12}
								>
									<Input
										label={<>
											<Typography>
												* Email
											</Typography>
											<span className={classes.span}>
												Tus clientes verán este correo para contactarte
											</span>
										</>}
										id="storeEmail"
										variant="outlined"
										name="storeEmail"
										value={valuesProvider.storeEmail}
										onChange={handleChangeProvider("storeEmail")}
										error={validate("provider", "storeEmail")}
										helperText={validateText("provider", "storeEmail")}
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
										inputProps={{ pattern : "[A-ZÑ&]{3,4}d{6}[A-V1-9][A-Z1-9][0-9A]" }}
										id="rfc"
										variant="outlined"
										name="rfc"
										value={valuesProvider.rfc}
										onChange={handleChangeProvider("rfc")}
										error={validate("provider", "rfc")}
										helperText={validateText("provider", "rfc")}
									/>
								</Grid>
								<Grid
									item
									xs={12}
								>
									<Input
										label={
											<Typography>
												* Dirección
											</Typography>
										}
										id="address"
										variant="outlined"
										name="address"
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
									<Select2
										label={
											<Typography>
												* Estado
											</Typography>
										}
										id="state"
										name="state"
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
										id="city"
										name="city"
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
										id="zipCode"
										variant="outlined"
										name="zipCode"
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

export default FormProvider;
