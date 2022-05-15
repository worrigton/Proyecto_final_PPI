import {
	OPEN_DIALOG,
	CLOSE_DIALOG,
	UPDATE_DIALOG,
	DIALOG_RESULT,
} from "./actionTypes";

const initialState = {
	open   : false,
	result : {},
};

const dialogReducer = (state = initialState, action) => {
	switch (action?.type) {
		case OPEN_DIALOG:
			return {
				open : true,
				...action.payload,
			};
		case UPDATE_DIALOG: {
			const updatedState = typeof action?.payload?.updater === "function"
				? action.payload.updater(state)
				: state;

			return Object.assign({}, state, updatedState);
		}
		case CLOSE_DIALOG:
			return initialState;
		default:
			return state;
		case DIALOG_RESULT:
			return {
				... state,
				result : action.payload,
			};
	}
};

export default dialogReducer;
