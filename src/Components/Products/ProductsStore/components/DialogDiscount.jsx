import { Fragment }  from "react";
import { PropTypes } from "prop-types";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	Grid,
	DialogActions,
	Divider,
} from "@material-ui/core";

import {
	Typography,
	Button,
	ButtonWithoutStyles as Clicker,
} from "~/ToolKit";
import { FaTimes } from "~/Resources/icons/fal";
import useStyles   from "./styles";

const DialogDiscount = ({ handleClose, open, discounts, tradeName }) => {
	const classes = useStyles();

	return (
		<Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
			<DialogTitle className={classes.titleBackground} id="form-dialog-title">
				<Grid container>
					<Typography type="header3" className={classes.modalTitle}>Descuento por volumen</Typography>
					<div className={classes.spacer} />
					<Clicker onClick={handleClose} aria-label="close">
						<FaTimes className={classes.modalTitle} />
					</Clicker>
				</Grid>
			</DialogTitle>
			<DialogContent dividers>
				<Grid direction="column" className={classes.padding} container justify="center">
					<Grid item container justify="center">
						<Typography type="header4" gutterBottom>
							{tradeName}
						</Typography>
					</Grid>
					<Grid item container justify="center">
						<Typography type="header4" fontWeight="bold" gutterBottom>
							Este proveedor ofrece un descuento por volumen
						</Typography>
					</Grid>
					<Grid item container>
						<Grid xs={6} container justify="center">
							<Typography
								className={classes.gridMargin}
								type="header4"
								fontWeight="bold">Volumen</Typography>
						</Grid>
						<Grid item xs={6} container justify="center">
							<Typography
								className={classes.gridMargin}
								type="header4" fontWeight="bold">Descuento</Typography>
						</Grid>
					</Grid>
					{
						discounts?.length > 0 && discounts.map(discount => (
							<Fragment key={discount.id}>
								<Grid item xs={12} container className={classes.gridMargin}>
									<Grid item xs={6} container justify="center">
										{discount.min_weight} Kg - {discount.max_weight} kg
									</Grid>
									<Grid item xs={6} container justify="center">
										{discount.discount}%
									</Grid>
								</Grid>
								<Divider />
							</Fragment>
						))
					}
					<Grid>
						<Typography className={classes.gridMargin} type="subtitle">
							El descuento se aplica directamente sobre el precio del producto,
							es decir el subtotal de pedido correspondiente al producto.
						</Typography>
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions>
				<Button autoFocus onClick={handleClose} color="primary">
					Continuar
				</Button>
			</DialogActions>
		</Dialog>
	);
};

DialogDiscount.propTypes = {
	handleClose : PropTypes.func.isRequired,
	open        : PropTypes.bool.isRequired,
	discounts   : PropTypes.array.isRequired,
	tradeName   : PropTypes.string.isRequired,
};

export default DialogDiscount;
