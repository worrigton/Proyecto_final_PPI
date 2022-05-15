import {
	SET_CATEGORY,
    UPDATE_CATEGORY,
    REMOVE_CATEGORY
} from "./actionTypes";

const initialState = {
	category : null
};

const categoryReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_CATEGORY:
			return {
				category : action.payload,
			};
        case UPDATE_CATEGORY: 
            return {
                category : action.payload,
            }
        case REMOVE_CATEGORY : 
            return {
                category : null,
            }
		default: 
			return state;
	}
};

export default categoryReducer;
