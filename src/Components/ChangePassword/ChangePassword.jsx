import PropTypes            from "prop-types";
import { Grid, IconButton } from "@material-ui/core";

// Import Own Components
import logoColorful from "~/Resources/logo_colorful.png";
import {
	Button,
	Input,
	Typography as Text,
} from "~/ToolKit";
import { FaEyeSlash, FaEye } from "~/Resources/icons/fal";

import useStyles            from "./styles";


const ChangePassword = ({ delegations : {
	valuesAccount,
	showPassword,
	showPassword2,
	passwordValidate,
	handleChange,
	handleClickShowPassword,
	handleClickShowPassword2,
	handleMouseDownPassword,
	validate,
	validateText,
	handleSubmit,
} }) => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<div className={classes.mainSection}>
				<div className={classes.imageContainer}>
					<img src={logoColorful} alt="zoko's logo" />
				</div>

				<Text
					align="center"
					type="header3"
					className={classes.recoveryPassword}>Cambiar Password
				</Text>

				<form noValidate autoComplete="off">
					<Grid container>
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
								name="pwd"
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
								name="pwd2"
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
					</Grid>


					<Button
						type="button"
						color="primary"
						grow
						className={classes.button}
						onClick={handleSubmit}
					>
						Cambiar
					</Button>
				</form>
			</div>
		</div>
	);
};

ChangePassword.propTypes = {
	delegations : PropTypes.object.isRequired,
};

export default ChangePassword;
