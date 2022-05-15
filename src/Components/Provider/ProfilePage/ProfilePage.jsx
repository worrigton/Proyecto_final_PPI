import { useMemo } from "react";
import PropTypes   from "prop-types";
import {
	Container,
	Grid,
	FormControl,
	Divider,
	Dialog,
	DialogActions,
	DialogTitle,
	DialogContent,
	DialogContentText,
	IconButton,
} from "@material-ui/core";

// Import Own Components
import {
	Typography,
	Input,
	Button,
	ButtonWithoutStyles as Clicker,
} from "~/ToolKit";
import { FaTimes }           from "~/Resources/icons/far";
import { FaEyeSlash, FaEye } from "~/Resources/icons/fal";
import PrivateProviderRoute  from "~/Components/Provider/PrivateProviderRoute";
import ProviderLayout        from "~/Components/Provider/ProviderLayout";
import TitlePage             from "~/Components/TitlePage";
import ContentLayout         from "~/Components/ContentLayout";
import useStyles             from "./styles";

const ProfilePage = ({
	delegations : {
		handleChange,
		validateText,
		validate,
		handle,
		formValidate,
		submit,
		submitBtn,
		userData,
		uploadFile,
		initial,
		showInput,
		open,
		handleClose,
		handleClickOpen,
		handleClickShowPassword,
		handleClickShowPassword2,
		submitPassword,
		handleMouseDownPassword,
		showPassword,
		showPassword2,
		validateEmail,
		validateTextEmail,
		detaleFile,
		handleOpenDelate,
		handleCloseDelate,
		open2,
		handleDelateAccount,
	},
}) => {
	const classes = useStyles();

	const styles = useMemo(() => ({
		height : "25px",
	}), []);

	return (
		<PrivateProviderRoute>
			<ProviderLayout>
				<Container fixed className={classes.container}>
					<TitlePage
						title="Información de inicio"
						url="/proveedor/cuenta"
						nameUrl="Configuración"
					/>
					<FormControl className={classes.formControl}>
						<ContentLayout
							title="Detalles de inicio"
						>
							<Grid
								container
								direction="row"
								alignItems="center"
								className={classes.gridPadding}
							>
								<Grid item className={classes.alignCenter}>
									<img
										className={classes.img}
										src={userData?.image[0] || userData.images?.xs}
										alt="profile" />
								</Grid>
								<Grid item className={classes.alignCenter}>
									<Button
										color="white"
										variant="outlined"
										size="small"
										onClick={uploadFile}
									>
										Cargar foto
									</Button>
								</Grid>
								<Grid item className={classes.alignCenter}>
									{ userData.image && (
										<Button
											color="white"
											variant="outlined"
											size="small"
											onClick={detaleFile}
										>
											Eliminar foto
										</Button>
									)}
								</Grid>
							</Grid>

							<Divider />
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
									md={6}
									className={classes.inputPadding}
								>
									<Input
										variant="outlined"
										label="* Nombre"
										styles={styles}
										id="name"
										value={userData.first_name}
										onChange={handleChange("first_name")}
										error={validate("first_name")}
										helperText={validateText("first_name")}
									/>
								</Grid>
								<Grid
									item
									xs={12}
									md={6}
									className={classes.inputPadding}
								>
									<Input
										variant="outlined"
										label="* Apellidos"
										styles={styles}
										id="last_name"
										value={userData.last_name}
										onChange={handleChange("last_name")}
										error={validate("last_name")}
										helperText={validateText("last_name")}
									/>
								</Grid>
								<Grid
									item
									xs={12}
									md={6}
									className={classes.inputPadding}
								>
									<Typography type="body2">
										&nbsp; Correo electrónico
									</Typography>
									<Typography type="body2">
										&nbsp; {userData.old_email}
									</Typography>
									<Clicker onClick={handle}>
										{!showInput ? (
											<Typography type="body2" color="secondary">
												Cambiar correo electrónico
											</Typography>
										) : (
											<Typography type="body2" color="secondary">
												Restaurar
											</Typography>
										)}
									</Clicker>
								</Grid>
								<Grid
									item
									xs={12}
									md={6}
									className={classes.inputPadding}
								>
									{showInput && (
										<Input
											variant="outlined"
											label="Nuevo correo"
											styles={styles}
											id="email"
											value={userData.email}
											onChange={handleChange("email")}
											error={validateEmail()}
											helperText={validateTextEmail()}
										/>
									)}
								</Grid>
							</Grid>
						</ContentLayout>
						<Divider className={classes.hr} />
						<ContentLayout
							title="Contraseña"
						>
							<Grid
								item
								xs={12}
								md={6}
								className={classes.inputPadding}
							>
								<Typography type="caption">
									Actualiza la contraseña de tu cuenta.
								</Typography>
								<br /><br />
								<Button
									color="white"
									variant="outlined"
									size="small"
									onClick={handleClickOpen}
								>
									Cambiar contraseña
								</Button>
							</Grid>
							<Dialog
								open={open}
								onClose={handleClose}
								aria-labelledby="form-dialog-title"
								minWidth={360}
							>
								<DialogTitle id="form-dialog-title">
									<Grid container>
										Cambiar contraseña
										<div className={classes.spacer} />
										<Clicker onClick={handleClose} aria-label="close">
											<FaTimes />
										</Clicker>
									</Grid>
								</DialogTitle>
								<Divider />
								<DialogContent>
									<Grid
										className={classes.inputPadding}
									>
										<Input
											label={
												<Typography type="body2">
													Contraseña Actual
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
											id="password"
											variant="outlined"
											value={userData.oldPassword}
											onChange={handleChange("old_password")}
										/>
										<Typography type="caption" color="grey">
											Utiliza la contraseña que usas actualmente para iniciar sesión.
										</Typography>
									</Grid>
									<Grid
										className={classes.inputPadding}
									>
										<Input
											label={
												<Typography type="body2">
													Nueva Contraseña
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
											id="password"
											variant="outlined"
											value={userData.password}
											onChange={handleChange("password")}
										/>
									</Grid>
								</DialogContent>
								<Divider />
								<DialogActions>
									<Button
										onClick={handleClose}
										color="white"
										variant="outlined"
									>
										Cancelar
									</Button>
									<Button onClick={submitPassword} color="primary">
										Cambiar contraseña
									</Button>
								</DialogActions>
							</Dialog>
						</ContentLayout>
						<Divider className={classes.hr} />
						<ContentLayout
							title="Eliminar cuenta"
							description="La eliminación de tu cuenta es definitiva"
						>
							<Grid
								item
								xs={12}
								className={classes.inputPadding}
							>
								<Typography type="caption">
									{"Elimina tu cuenta y tus datos personales. Si pulsas el siguiente botón "}
									{"tu información, preferencias y productos seran borrados."}
								</Typography>
								<br /><br />
								<Button
									color="white"
									variant="outlined"
									size="small"
									onClick={handleOpenDelate}
								>
									Eliminar cuenta
								</Button>
							</Grid>
						</ContentLayout>
						<Divider className={classes.hr} />
						<Grid
							container
							direction="row"
							justify="flex-end"
							alignItems="center"
						>
							<Button
								color="primary"
								onClick={submit}
								disabled={formValidate() || submitBtn}
							>
								Guardar
							</Button>
						</Grid>
					</FormControl>
					<Dialog
						open={open2}
						onClose={handleCloseDelate}
						aria-labelledby="alert-dialog-title"
						aria-describedby="alert-dialog-description"
					>
						<DialogTitle id="alert-dialog-title">
							{"Estas a punto de eliminar tu cuenta"}
						</DialogTitle>
						<DialogContent>
							<DialogContentText id="alert-dialog-description">
								Una vez pulsado el botón de <b>aceptar</b> se borrar permanentemente tu cuenta,
								 toda tu información ingresada se borrar y no podras volver a acceder.
								 <div style={{ margin : "1rem" }} />
								 ¿Estas seguro de que desea eliminar su cuenta?
							</DialogContentText>
						</DialogContent>
						<DialogActions>
							<Button onClick={handleClose} variant="outlined" color="white">
								Cancelar
							</Button>
							<Button onClick={handleDelateAccount} color="primary" autoFocus>
								Aceptar
							</Button>
						</DialogActions>
					</Dialog>
				</Container>
			</ProviderLayout>
		</PrivateProviderRoute>
	);
};

ProfilePage.propTypes = {
	delegations : PropTypes.object,
};


export default ProfilePage;
