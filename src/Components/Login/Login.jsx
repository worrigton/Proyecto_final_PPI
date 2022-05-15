import PropTypes      from "prop-types";
import { useState }   from "react";
import {
	IconButton,
	CircularProgress,
	InputAdornment,
	Grid,
}                     from "@material-ui/core";
import Visibility 	  from "@material-ui/icons/Visibility";
import VisibilityOff  from "@material-ui/icons/VisibilityOff";

// Import Own Components
import logoColorful from "~/Resources/logo_colorful.png";
import simpleLogo   from "~/Resources/img/logo-O.png";
import useStyles    from "./styles";
import {
	FaUser as UserIcon,
	FaLock as LockIcon,
} from "~/Resources/icons/far";

import {
	Button,
	NativeInput,
	ButtonWithoutStyles as Clicker,
	Typography,
} from "~/ToolKit";

const Login = ({
	delegations : {
		formData,
		handleChange,
		handleSubmit,
		loading,
		redirectToRecovery,
		uiType,
	},
}) => {
	const classes = useStyles({ uiType });

	const [showPassword, setShowPassword] = useState(false);

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div className={classes.root}>
			<div className={classes.mainSection}>
				<div className={classes.imageContainer}>
					{(uiType === "popper" || uiType === "modal") ? (
						<img src={simpleLogo} alt="zoko's logo" />
					) : (
						<img src={logoColorful} alt="zoko's logo" />
					)}
				</div>
				<div className="text-center">
					<Typography type="header3" className={classes.title}>
						Iniciar sesión
					</Typography>
				</div>

				<form noValidate autoComplete="off">
					<NativeInput
						startAdornment={UserIcon}
						id="Username"
						label="Nombre de usuario"
						name="username"
						value={formData?.username || ""}
						onChange={handleChange}
						placeholder="Ingresa tu nombre de usuario"
					/>
					<NativeInput
						startAdornment={LockIcon}
						id="Password"
						label="Contraseña"
						type= {showPassword ? "text"  : "password"}
						name="password"
						value={formData?.password || ""}
						onChange={handleChange}
						placeholder="Ingresa tu contraseña"
						endAdornment = {() => (
							<InputAdornment position="center">
								<IconButton
									aria-label="toggle password visibility"
									onClick={handleClickShowPassword}
								>
									{showPassword ? <Visibility /> : <VisibilityOff />}
								</IconButton>
							</InputAdornment>
						)}
					/>
					<Grid container justify="flex-end">
						<Grid item>
							<Clicker
								type = "button"
								className = {classes.clicker}
								onClick = {redirectToRecovery}
							>
								<Typography type="header4">
									¿Olvidaste tu contraseña?
								</Typography>
							</Clicker>
						</Grid>
					</Grid>
					<Button
						type="submit"
						color="primary"
						grow
						className={classes.button}
						onClick={handleSubmit}
					>
						Iniciar sesión
					</Button>
					{ loading && (
						<div className={classes.loading}>
							<CircularProgress />
						</div>
					) }
				</form>
			</div>
		</div>
	);
};

Login.propTypes = {
	delegations : PropTypes.object.isRequired,
};

export default Login;
