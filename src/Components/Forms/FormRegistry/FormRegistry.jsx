import PropTypes from "prop-types";
import {
	Grid,
	FormControl,
	IconButton,
	FormControlLabel,
	Checkbox,
	Paper,
	Typography as Text,
} from "@material-ui/core";

// Import Own Components
import { FaEyeSlash, FaEye } from "~/Resources/icons/fal";
import useStyles             from "~/Components/Forms/styles";
import {
	Input,
	Typography,
	NavLink,
	Button,
} from "~/ToolKit";
import TermsAndConditions    from "~/Components/Docs/TermsAndConditions";
import NoticeOfPrivacy    from "~/Components/Docs/NoticeOfPrivacy";

const FormAccount = ({
	delegations : {
		valuesAccount,
		showPassword,
		showPassword2,
		passwordValidate,
		handleChange,
		handleClickShowPassword,
		handleClickShowPassword2,
		handleMouseDownPassword,
		formValidate,
		validate,
		validateText,
		submit,
	},
}) => {
	const classes = useStyles();

	return (
		<Grid
			container
			direction="row"
			justify="flex-end"
			alignItems="center"
			alignContent="center"
			item
			xs={12}
		>
			<Paper variant="outlined" className={classes.paperPadding}>
				<FormControl className={classes.formControl}>
					<br />
					<Typography type="header3" fontWeight="600">
						Regístrate ahora
					</Typography>
					<Typography type="body2" color="grey">
						Haz tu registro con nosotros, ¡Es fácil y rápido!
					</Typography>
					<br />
					<Grid
						container
						direction="row"
						alignItems="center"
					>
						<Grid
							item
							xs={12}
							md={12}
							className={classes.paddingInput}
						>
							<Input
								id="email"
								variant="outlined"
								type="email"
								value={valuesAccount.email}
								onChange={handleChange("email")}
								error={validate("email")}
								helperText={validateText("email")}
								placeholder="Correo"
							/>
						</Grid>
						<Grid
							item
							xs={12}
							md={6}
							className={classes.paddingInput}
						>
							<Input
								id="firstName"
								variant="outlined"
								name="firstName"
								value={valuesAccount.firstName}
								onChange={handleChange("firstName")}
								error={validate("firstName")}
								helperText={validateText("firstName")}
								placeholder="Nombre"
							/>
						</Grid>
						<Grid
							item
							xs={12}
							md={6}
							className={classes.paddingInput}
						>
							<Input
								id="lastName"
								variant="outlined"
								value={valuesAccount.lastName}
								onChange={handleChange("lastName")}
								error={validate("lastName")}
								helperText={validateText("lastName")}
								placeholder="Apellido"
							/>
						</Grid>
						<Grid
							item
							xs={12}
							md={12}
							className={classes.paddingInput}
						>
							<Input
								id="username"
								variant="outlined"
								value={valuesAccount.username}
								onChange={handleChange("username")}
								error={validate("username")}
								helperText={validateText("username")}
								placeholder="Nombre de usuario"
							/>
						</Grid>
						<Grid
							item
							xs={12}
							md={12}
							className={classes.paddingInput}
						>
							<Input
								type={showPassword ? "text" : "password"}
								icon={
									<IconButton
										aria-label="Visualizar la contraseña"
										onClick={handleClickShowPassword}
										onMouseDown={handleMouseDownPassword}
									>
										{showPassword ? <FaEyeSlash /> : <FaEye /> }
									</IconButton>
								}
								position="end"
								id="pwd"
								variant="outlined"
								value={valuesAccount.pwd}
								onChange={handleChange("pwd")}
								error={validate("pwd")}
								helperText={validateText("pwd")}
								placeholder="Contraseña"
							/>
						</Grid>
						<Grid
							item
							xs={12}
							md={12}
							className={classes.paddingInput}
						>
							<Input
								type={showPassword2 ? "text" : "password"}
								icon={
									<IconButton
										aria-label="Visualizar la contraseña"
										onClick={handleClickShowPassword2}
										onMouseDown={handleMouseDownPassword}
									>
										{showPassword2 ? <FaEyeSlash /> : <FaEye /> }
									</IconButton>
								}
								position="end"
								id="pwd2"
								variant="outlined"
								value={valuesAccount.pwd2}
								onChange={handleChange("pwd2")}
								error={validate("pwd2")}
								helperText={validateText("pwd2")}
								placeholder="Repite tu contraseña"
							/>
						</Grid>
						<Grid>
							{ passwordValidate &&
							<Text color="error" className="MuiFormHelperText-contained">
								Las contraseñas no coinciden
							</Text>}
						</Grid>
						<Grid
							item
							xs={12}
							md={12}
							className={classes.paddingInput}
						>
							<br />
							<Typography type="body2">
								Al crear una cuenta aceptas que eres mayor de 18 años
								y que has leído y estás de acuerdo con los
								<TermsAndConditions type="body2" color="primary" />
								y el
								<NoticeOfPrivacy color="primary" type="body2" />
							</Typography>
							<br />

							<FormControlLabel
								value="end"
								control={
									<Checkbox
										color="primary"
										size="small"
										id="notification"
										checked={valuesAccount.notification}
										onClick={handleChange("notification")}
									/>
								}
								label={
									<Typography type="body2">
										Me gustaría recibir comunicaciones promocionales por
										 correo electrónico
									</Typography>
								}
								labelPlacement="end"
							/>
							<br />
							<br />

							<Button
								color="primary"
								className={classes.button}
								disabled={formValidate()}
								onClick={submit}
							>
								Siguiente
							</Button>
							<br />
							<br />
							<Typography type="body2">
								¿Ya tienes una cuenta?
								<NavLink
									name="Inicia sesión"
									href="/proveedor/login"
									color="primary"
								/>
							</Typography>
							<br />
						</Grid>
					</Grid>
				</FormControl>
			</Paper>
			<style global jsx>{`
				.MuiFormHelperText-contained {
					margin-left  : 0px!important;
					margin-right : 0px!important;
					font-size    : 0.75rem;
				}
			`}</style>
		</Grid>
	);
};

FormAccount.propTypes = {
	delegations : PropTypes.object.isRequired,
};

export default FormAccount;
