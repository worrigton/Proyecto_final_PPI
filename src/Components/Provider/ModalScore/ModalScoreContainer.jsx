import { useState }  from "react";
import { PropTypes } from "prop-types";
import {
	Dialog,
	DialogTitle,
	Grid,
	Divider,
	DialogContent,
	DialogActions,
} from "@material-ui/core";

// Import Own Components
import {
	Button,
	ButtonWithoutStyles as Clicker } from "~/ToolKit";
import { FaTimes }                   from "~/Resources/icons/fal";
import useStyles                     from "./styles";
import ModalScore                    from "./ModalScore";

const ModalScoreContainer = ({ delegations: {
	orderData,
	showScoreModal,
	handleCloseScoreModal,
	submitQualification,
	customer,
} }) => {
	const classes = useStyles();

	const [rating, setRating] = useState(customer?.rating / 2);

	const handleChangeValue = (event, newValue) => {
		setRating(newValue);
	};

	return (
		<Dialog
			open={showScoreModal.show}
			onClose={handleCloseScoreModal}
			aria-labelledby="form-dialog-title"
			minWidth={360}
		>
			<DialogTitle id="form-dialog-title">
				<Grid
					container
					direction="row"
					justify="space-between"
					alignItems="center"
				>
					Calificar vendedor
					<div className={classes.spacer} />
					<Clicker onClick={handleCloseScoreModal} aria-label="close">
						<FaTimes />
					</Clicker>
				</Grid>
			</DialogTitle>
			<Divider />
			<DialogContent>
				<ModalScore delegations={{ rating, orderData, handleChangeValue, customer }} />
			</DialogContent>
			<Divider />
			<DialogActions className={classes.inputPadding}>
				<Grid container justify="flex-start" direction="row-reverse">
					<Grid item>
						<Button
							className={classes.btnModal}
							color="primary"
							disabled={!rating || rating == 0}
							onClick={()=>submitQualification(rating)}
						>
							Guardar cambios
						</Button>
					</Grid>
					<Grid item>
						<Button
							className={classes.btnModal}
							color="white"
							onClick={handleCloseScoreModal}
						>
							Cancelar
						</Button>
					</Grid>
				</Grid>
			</DialogActions>
		</Dialog>
	);
};

ModalScoreContainer.propTypes = {
	delegations : PropTypes.object.isRequired,
};

export default ModalScoreContainer;
