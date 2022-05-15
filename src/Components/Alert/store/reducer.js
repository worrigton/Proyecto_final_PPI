import {
	ALERT_CLEAR,
	ALERT_OPEN,
} from "./actionTypes";

const alertReducer = (state = {}, action) => {
	switch (action?.type) {
		case ALERT_OPEN:
			return {
				incomingAlert : {
					...action?.payload,
				},
			};
		case ALERT_CLEAR:
			return {};
		default:
			return state;
	}
};

export default alertReducer;
