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
import FormsContext          from "~/Components/Forms/context";
import useStyles             from "~/Components/Forms/styles";
import {
	Input,
	Typography,
} from "~/ToolKit";
import TermsAndConditions from "~/Components/Docs/TermsAndConditions";
import NoticeOfPrivacy    from "~/Components/Docs/NoticeOfPrivacy";

const FormAccount = () => {
	const classes = useStyles();
	return (
		<FormsContext.Consumer>
			{ ({
				valuesAccount,
				handleChange,
				validate,
				validateText,
				handleClickShowPassword,
				handleClickShowPassword2,
				handleMouseDownPassword,
				passwordValidate,
				showPassword,
				showPassword2,
				validateEmail,
				validateTextEmail,
			}) => (
				<Grid
					container
					justify="center"
					item
					xs={12}
					md={6}
				>
					<Paper variant="outlined" className={classes.paperPadding}>
						<form action="">
							<FormControl className={classes.formControl} autoComplete="nope">
								<Grid
									container
									direction="row"
									alignItems="center"
								>
									<Grid
										item
										xs={12}
										md={12}
									>
										<Input
											label={
												<Typography type="body2">
													* Nombre
												</Typography>
											}
											id="firstName"
											variant="outlined"
											name="firstName"
											value={valuesAccount.firstName}
											onChange={handleChange("firstName")}
											error={validate("account", "firstName")}
											helperText={validateText("account", "firstName")}
											autoComplete="off"
										/>
									</Grid>
									<Grid
										item
										xs={12}
										md={12}
									>
										<Input
											label={
												<Typography type="body2">
													* Apellido
												</Typography>
											}
											id="lastName"
											variant="outlined"
											value={valuesAccount.lastName}
											onChange={handleChange("lastName")}
											error={validate("account", "lastName")}
											helperText={validateText("account", "lastName")}
											autoComplete="off"
										/>
									</Grid>
									<Grid
										item
										xs={12}
										md={12}
									>
										<Input
											label={
												<Typography type="body2">
													* Nombre de usuario
												</Typography>
											}
											id="username"
											variant="outlined"
											value={valuesAccount.username}
											onChange={handleChange("username")}
											error={validate("account", "username")}
											helperText={validateText("account", "username")}
											autoComplete="off"
										/>
									</Grid>
									<Grid
										item
										xs={12}
										md={12}
									>
										<Input
											label={
												<Typography type="body2">
													* Correo
												</Typography>
											}
											id="email"
											variant="outlined"
											type="email"
											value={valuesAccount.email}
											onChange={handleChange("email")}
											error={validate("account", "email") || validateEmail()}
											helperText={validateText("account", "email") || validateTextEmail()}
											autoComplete="off"
										/>
									</Grid>
									<Grid
										item
										xs={12}
										md={12}
									>
										<Input
											label={
												<Typography type="body2">
													* Contraseña
												</Typography>
											}
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
											error={validate("account", "pwd")}
											helperText={validateText("account", "pwd")}
										/>
									</Grid>
									<Grid
										item
										xs={12}
										md={12}
									>
										<Input
											label={
												<Typography type="body2">
													* Repetir contraseña
												</Typography>
											}
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
											error={validate("account", "pwd2")}
											helperText={validateText("account", "pwd2")}
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
										className={classes.padding}
									>
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
													Me gustaría recibir comunicaciones promocionales
												</Typography>
											}
											labelPlacement="end"
										/>
									</Grid>
								</Grid>
							</FormControl>
						</form>
					</Paper>
					<style global jsx>{`
						.MuiFormHelperText-contained {
							margin-left  : 0px!important;
							margin-right : 0px!important;
							font-size    : 0.75rem;
						}
					`}</style>
				</Grid>
			) }
		</FormsContext.Consumer>
	);
};
export default FormAccount;
