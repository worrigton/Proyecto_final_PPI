import PropTypes from "prop-types";

// Import Own Components
import logoColorful from "~/Resources/logo_colorful.png";
import {
	FaEnvelope as UserIcon,
} from "~/Resources/icons/far";
import {
	Button,
	NativeInput,
	Typography,
} from "~/ToolKit";

import useStyles  from "./styles";
import MessageBox from "../MessageBox";

const PasswordRecovery = ({ delegations : { handleSubmit, formData, handleChange } }) => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<div className={classes.mainSection}>
				<div className={classes.imageContainer}>
					<img src={logoColorful} alt="zoko's logo" />
				</div>

				<Typography
					align="center"
					type="header3"
					className={classes.recoveryPassword}>Recupera tu contraseña
				</Typography>

				<MessageBox message="Escribe tu nombre de usuario o el email con el que te inscribete y
					te enviaremos instrucciones para reestablecer tu contraseña." />
				<form noValidate autoComplete="off">
					<NativeInput
						startAdornment={UserIcon}
						id="email"
						label="email"
						name="email"
						value={formData?.email || ""}
						onChange={handleChange}
						placeholder="Ingresa tu correo electronico"
					/>

					<Button
						type="button"
						color="primary"
						grow
						className={classes.button}
						onClick={handleSubmit}
					>
						Recuperar Contraseña
					</Button>
				</form>
				<div className={classes.divider}>
					<Typography>¿Tienes problemas? <strong>Contactanos</strong></Typography>
				</div>
			</div>
		</div>
	);
};

PasswordRecovery.propTypes = {
	delegations : PropTypes.object.isRequired,
};

export default PasswordRecovery;
