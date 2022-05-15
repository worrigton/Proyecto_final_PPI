import { useMemo } from "react";
import PropTypes   from "prop-types";
import {
	Grid,
	Checkbox,
	FormControlLabel,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Divider,
} from "@material-ui/core";

// Import Own Components
import {
	Typography,
	Input,
	ButtonWithoutStyles as Clicker,
	Button,
	Select2,
} from "~/ToolKit";

import useStyles from "./styles";

const FormAddress = ({
	delegations : {
		handleSelect,
		handleChange,
		validateText,
		validate,
		formValidate,
		submit,
		validateTextEmail,
		validateEmail,
		valuesAddress,
		intNumber,
		state,
		cities,
		submitBtn,
		taxReg,
		handleClickOpen,
		handleClose,
		open,
	},
}) => {
	const classes = useStyles();

	const styles = useMemo(() => ({
		height : "25px",
	}), []);

	return (
		<>
			<Clicker variant="outlined" color="primary" onClick={handleClickOpen}>
				<Typography color="grey2" type="paragraph">Añadir nuevo perfil</Typography>
			</Clicker>
			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Nuevo perfil de facturación</DialogTitle>
				<Divider />
				<DialogContent>
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
							<Divider className={classes.hrMargin} />
						</Grid>
					</Grid>
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
											<span>(Primero elige un estado)</span>
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
								type="number"
								variant="outlined"
								value={valuesAddress.telephone}
								onChange={handleChange("telephone")}
								error={validate("telephone")}
								helperText={validateText("telephone")}
							/>
						</Grid>
					</Grid>
				</DialogContent>
				<Divider />
				<DialogActions>
					<Button
						onClick={handleClose}
						color="white"
					>
						Cancelar
					</Button>

					<Button
						color="primary"
						onClick={submit}
						disabled={formValidate() || submitBtn}>
						Guardar
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};
FormAddress.propTypes = {
	delegations : PropTypes.object.isRequired,
};

export default FormAddress;
