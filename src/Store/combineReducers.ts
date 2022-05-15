import { Reducer } from "redux";

// Import Own Components
import {
	STATE_LOADED,
	UNIQUE_ACTION_TYPE,
} from "./actionTypes";

/**
 * Extends functionality of Redux.combineReducers to also save when the state is loaded.
 * We need this behaviour with Nextjs, because redux will not be fully loaded on the server,
 * this implementation helps the developer identify if the redux state is loaded through STATE_LOADED type
 * 
 * @author Yael Mártin A. Alcalá León <yael.alcalla@gmail.com>
 * @param reducers Object containing all reducers to be combined.
 */
const combineReducers = <T> (reducers: T): Reducer => {
	const createObjMapper = obj => callback => Object.entries(obj).reduce((acc, [key, value]) => ({
		...acc,
		...callback(key, value),
	}), {});

	const mapReducers = createObjMapper(reducers);

	// Each reducer returns its initial state if the action type doesn't match with
	// its defined cases, in this way we are constructing all the initial state
	const initialState = mapReducers((reducerName, reducerFn) => ({
		[reducerName] : reducerFn(undefined, { type : UNIQUE_ACTION_TYPE }) || {},
	}));

	return (state = initialState, action) => {
		// Global action that will affect all state
		if (action?.type === STATE_LOADED) {
			return {
				...state,
				...action.payload,
			};
		}

		const newState = mapReducers((reducerName, reducerFn) => ({
			[reducerName] : reducerFn(state[reducerName], action) || state[reducerName] || {},
		}));

		return {
			...state,
			...newState,
		};
	};
};

export default combineReducers;
