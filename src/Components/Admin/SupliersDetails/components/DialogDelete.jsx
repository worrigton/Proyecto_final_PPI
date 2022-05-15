import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	useMediaQuery,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import PropTypes     from "prop-types";

import { Button }  from "~/ToolKit";

const DialogDelete = ({
	closeDialog,
	deleteProvider,
	open,
}) => {
	const theme      = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<Dialog
			fullScreen={fullScreen}
			open={open}
			onClose={closeDialog}
			aria-labelledby="responsive-dialog-title"
		>
			<DialogTitle id="alert-dialog-slide-title">{"¿Estas seguro de realizar esta acción?"}</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-slide-description">
					Al eliminar un proveedor, se le restringira el acceso a
					la plataforma y se cancelara su subscripción de forma automatica.
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={closeDialog} color="warning">
					Cancelar
				</Button>
				<Button onClick={deleteProvider} color="primary">
					Si, Eliminar
				</Button>
			</DialogActions>
		</Dialog>
	);
};

DialogDelete.propTypes = {
	closeDialog    : PropTypes.func,
	deleteProvider : PropTypes.func,
	open           : PropTypes.bool,
};

export default DialogDelete;
