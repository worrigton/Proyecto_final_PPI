import PropTypes   from "prop-types";

// Import Own Compoents
import {
	Grid,
	Divider,
	Dialog,
	DialogActions,
	DialogTitle,
	DialogContent,
	IconButton,
	FormControl,
} from "@material-ui/core";
import {
	Typography,
	Input,
	Button,
	ButtonWithoutStyles as Clicker,
} from "~/ToolKit";
import { FaEyeSlash, FaEye }   from "~/Resources/icons/fal";
import { FaTimes, FaUserLock } from "~/Resources/icons/far";

import useStyles from "./styles";

const CreateAdditionalAccounts = ({
	delegations : {
		handleChange,
		validateText,
		validate,
		formValidate,
		submit,
		submitBtn,
		userData,
		uploadFile,
		open,
		handleClose,
		handleClickOpen,
		handleClickShowPassword,
		handleMouseDownPassword,
		showPassword,
		validateEmail,
		validateTextEmail,
		detaleFile,
		handle,
		showInput,
	},
}) => {
	const classes = useStyles();

	return (
		<>
			<Clicker
				className={classes.clicker}
				onClick={handleClickOpen}
			>
				<Typography color="secondary" type="caption">
					Editar
				</Typography>
			</Clicker>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
				minWidth={360}
			>
				<DialogTitle id="form-dialog-title">
					<Grid
						container
						direction="row"
						justify="center"
						alignItems="center"
					>
						<FaUserLock />  &nbsp; Editar cuenta adicional
						<div className={classes.spacer} />
						<Clicker onClick={handleClose} aria-label="close">
							<FaTimes />
						</Clicker>
					</Grid>
				</DialogTitle>
				<Divider />
				<DialogContent>
					<FormControl>
						<Grid
							container
							direction="row"
							alignItems="center"
						>
							{ userData?.image ? (
								<Grid item className={classes.inputPadding}>
									<img
										className={classes.img}
										src={userData?.image[0]}
										alt="profile" />
								</Grid>
							) : (
								<Grid item className={classes.inputPadding}>
									<img
										className={classes.img}
										src={userData.images.md}
										alt="profile" />
								</Grid>
							)}
							<Grid item className={classes.inputPadding}>
								<Button
									color="white"
									variant="outlined"
									size="small"
									onClick={uploadFile}
								>
									Cargar nueva foto
								</Button>
							</Grid>
							<Grid item className={classes.inputPadding}>
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
									label="* Correo electrónico"
									id="email"
									value={userData.email}
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
									variant="outlined"
									label="* Nombre de usuario"
									id="username"
									value={userData.username}
									onChange={handleChange("username")}
									error={validate("username")}
									helperText={validateText("username")}
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
									label="* Nombre"
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
									id="last_name"
									value={userData.last_name}
									onChange={handleChange("last_name")}
									error={validate("last_name")}
									helperText={validateText("last_name")}
								/>
							</Grid>
						</Grid>
						<Divider />
						<Grid
							container
							direction="row"
							justify="center"
							alignItems="center"
							className={classes.gridPadding}
						>
							<Grid
								item
								xs={12}
								md={6}
								className={classes.inputPadding}
							>
								<Clicker onClick={handle}>
									{!showInput ? (
										<Typography type="body2" color="secondary">
											Cambiar contraseña
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
								)}
							</Grid>
						</Grid>
					</FormControl>
				</DialogContent>
				<Divider />
				<DialogActions className={classes.inputPadding}>
					<Button
						onClick={handleClose}
						color="default"
					>
						Cancelar
					</Button>
					<Button
						color="primary"
						disabled={formValidate() || submitBtn}
						onClick={submit}
					>
						Guardar cambios
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

CreateAdditionalAccounts.propTypes = {
	delegations : PropTypes.object,
};

export default CreateAdditionalAccounts;
