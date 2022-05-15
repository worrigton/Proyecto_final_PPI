import {
	ALERT_CLEAR,
	ALERT_OPEN,
} from "./actionTypes";

const openAlert  = payload => ({ type : ALERT_OPEN, payload });
const clearAlert = () => ({ type : ALERT_CLEAR });

const AlertActions = {
	openAlert,
	clearAlert,
};

export default AlertActions;
