import {
	OPEN_DIALOG,
	UPDATE_DIALOG,
	CLOSE_DIALOG,
} from "./actionTypes";

const openDialog = payload => ({ type : OPEN_DIALOG, payload });

const updateDialog = updater => ({
	type    : UPDATE_DIALOG,
	payload : {
		updater,
	},
});

const closeDialog = () => ({ type : CLOSE_DIALOG });

const DialogActions = {
	openDialog,
	updateDialog,
	closeDialog,
};

export default DialogActions;
