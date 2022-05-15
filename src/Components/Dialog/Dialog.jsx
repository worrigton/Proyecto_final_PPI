import PropTypes   from "prop-types";
import { connect } from "react-redux";
import {
	DialogTitle,
	Typography,
	IconButton,
	DialogContent,
	useTheme,
	useMediaQuery,
	Dialog as MuiDialog,
	Button as MuiButton,
	DialogActions as MuiDialogActions,
} from "@material-ui/core";

// Import Own Components
import DialogActions from "~/Components/Dialog/store/actions";
import { Button }    from "~/ToolKit";
import { bindAll }   from "~/Util";
import { FaTimes }   from "~/Resources/icons/fal";
import useStyles     from "./styles";

const Dialog = ({
	delegations : {
		actions,
		setActions,
		disable,
		done,
	},
	open,
	title,
	size,
	content : Content,
	optional,
	ok,
	cancel,
	dialogActions,
}) => {
	const classes = useStyles({ optional, cancel, ok });

	const theme      = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<MuiDialog
			fullWidth
			maxWidth={size}
			open={open}
			fullScreen={fullScreen}
			aria-labelledby="zoko-dialog-title"
			onClose={dialogActions.closeDialog}
		>
			{ open && (
				<>
					<DialogTitle disableTypography className={classes.root}>
						<Typography variant="h6">
							{title}
						</Typography>

						<IconButton
							aria-label="close"
							className={classes.closeButton}
							onClick={dialogActions.closeDialog}
						>
							<FaTimes />
						</IconButton>
					</DialogTitle>

					<DialogContent dividers>
						<Content {...{
							actions,
							setActions,
							disable,
							done,
						}} />
					</DialogContent>

					<MuiDialogActions className={classes.actions}>
						{ optional && (
							<MuiButton
								className={classes.optional}
								onClick={actions.optionalClick || dialogActions.closeDialog}
							>
								{optional.text}
							</MuiButton>
						) }

						{ cancel && (
							<Button
								color="white"
								variant="outlined"
								onClick={dialogActions.closeDialog}
							>
								{ typeof cancel === "string" ? cancel : "Cancelar"}
							</Button>
						) }

						{ ok && (
							<Button
								color="primary"
								disabled={actions.disabled}
								className={classes.ok}
								onClick={actions.okClick || dialogActions.closeDialog}
							>
								{ok.text || "Aceptar"}
							</Button>
						) }
					</MuiDialogActions>
				</>
			) }
		</MuiDialog>
	);
};

Dialog.propTypes = {
	open     : PropTypes.bool,
	title    : PropTypes.string,
	size     : PropTypes.string,
	content  : PropTypes.any,
	optional : PropTypes.shape({
		text  : PropTypes.string.isRequired,
		color : PropTypes.string,
	}),
	ok : PropTypes.shape({
		text  : PropTypes.string.isRequired,
		color : PropTypes.string,
	}),
	cancel        : PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
	dialogActions : PropTypes.object.isRequired,
	delegations   : PropTypes.shape({
		actions    : PropTypes.object,
		setActions : PropTypes.func,
		disable    : PropTypes.func,
		done       : PropTypes.func,
	}).isRequired,
};

Dialog.defaultProps = {
	open     : false,
	title    : "",
	size     : "sm",
	// content  : <></>,
	optional : null,
	ok       : null,
	cancel   : null,
};

const mapStateToProps    = ({ dialogReducer }) => ({ ...dialogReducer });
const mapDispatchToProps = bindAll({ DialogActions });

export default connect(mapStateToProps, mapDispatchToProps)(Dialog);
