import { Reducer } from "redux";

// Import Own Components
import { ReduxAction } from "~/Store/actionTypes";

import {
	UPDATE_USER_DATA,
	LOG_OUT_USER_OF_TYPE,
} from "./actionTypes";

const alertReducer: Reducer<object, ReduxAction<{ type: string }>> = (state = {}, action) => {
	switch (action.type) {
		case UPDATE_USER_DATA:
			return {
				...state,
				...(action.payload || {}),
			};
		case LOG_OUT_USER_OF_TYPE: {
			const type = (() => {
				switch (action.payload.type) {
					case "admin":
					case "provider":
					case "customer":
					case "employee":
						return action.payload.type;
					default:
						return false;
				}
			})();

			const stateCloned = Object.assign({}, state);

			if (type) {
				delete stateCloned[type];
			}

			return stateCloned;
		}
		default:
			return state;
	}
};

export default alertReducer;
