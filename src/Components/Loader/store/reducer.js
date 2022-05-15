import {
	OPEN_LOADER,
	CLOSE_LOADER,
} from "./actionTypes";

const initialState = {
	open     : false,
	title    : "Cargando",
	subtitle : "",
};

const loaderReducer = (state = initialState, action) => {
	switch (action?.type) {
		case OPEN_LOADER:
			return {
				open     : true,
				title    : action.payload.title,
				subtitle : action.payload.subtitle,
			};
		case CLOSE_LOADER:
			return initialState;
		default:
			return state;
	}
};

export default loaderReducer;
