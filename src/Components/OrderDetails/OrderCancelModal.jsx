import PropTypes from "prop-types";
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	Divider,
	Grid,
	IconButton,
	Typography,
} from "@material-ui/core";
import Slide 			from "@material-ui/core/Slide";
import React 			from "react";
import CloseIcon 		from "@material-ui/icons/Close";
import MuiDialogTitle 	from "@material-ui/core/DialogTitle";

// Import own components
import { Button, Select2 }  from "~/ToolKit";
import { formatToCurrency } from "~/Util";
import useStyles from "./styles";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const options = [
	{ label : "No es el producto que esperaba" },
	{ label : "No recibí atención del proveedor" },
	{ label : "Información del pago incorrecta" },
	{ label : "Otro" },
];

const OrderCancelModal = ({ delegations : {
	handleCloseModal,
	openModalCancel,
	handleCancel,
	handleSetNote,
	note,
	data,
},
}) => {
	const classes = useStyles();
	return (
		<div>
			<Dialog
				fullWidth
				maxWidth="sm"
				open={openModalCancel}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleCloseModal}
				aria-labelledby="alert-dialog-slide-title"
				aria-describedby="alert-dialog-slide-description"
			>
				<MuiDialogTitle disableTypography className={classes.root}>
					<Typography variant="h6">Cancelar Venta</Typography>
					{handleCloseModal ? (
						<IconButton aria-label="close" className={classes.closeButton} onClick={handleCloseModal}>
							<CloseIcon />
						</IconButton>
					) : null}
				</MuiDialogTitle>
				<DialogContent dividers>
					<DialogContentText id="alert-dialog-slide-description">
						<strong>¡Esta acción no se puede deshacer!</strong>
					</DialogContentText>
					<Grid container className={classes.marginY}>
						<Grid item container direction="column" xs={12} md={4}>
							<Grid item>
								{data.sale_orders[0].products[0].name}
							</Grid>
							<Grid item>
								{data.sale_orders[0].products[0].quantity} Kilos
							</Grid>
						</Grid>
						<Grid item xs={12} md={4}>
							<Grid item>
								Calidad : <strong>{data.sale_orders[0].products[0].quality}</strong>
							</Grid>
							<Grid item>
								Tamaño : <strong>{data.sale_orders[0].products[0].size}</strong>
							</Grid>
						</Grid>
						<Grid item xs={12} md={4}>
							<strong>{formatToCurrency(data.sale_orders[0].products[0].cost)}</strong>
						</Grid>
					</Grid>
					<Divider />
					<Grid className={classes.marginY}>
						<Grid container direction="column">
							<Grid item xs={12}>
								<strong>Sin Pago</strong>
							</Grid>
							<Grid item xs={12}>
								Reembolso manual
							</Grid>
						</Grid>
					</Grid>
					<Divider />
					<Grid className={classes.marginY} container direction="column">
						<Grid item xs={12}>
							<strong>Razón para cancelar este pedido</strong>
						</Grid>
						<Grid item xs={12} className={classes.marginY}>
							<Select2
								disableClearable
								label="Selecciona una opcion"
								id="billings"
								name="billings"
								options = {options}
								onChange={handleSetNote}
								valueSelect={note}
							/>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button color="white" onClick={handleCloseModal}>
						Volver
					</Button>
					<Button color="warning" onClick={handleCancel}>
						Cancelar
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

OrderCancelModal.propTypes = {
	delegations : PropTypes.object.isRequired,
};

export default OrderCancelModal;
